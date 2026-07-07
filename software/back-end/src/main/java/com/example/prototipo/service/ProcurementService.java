package com.example.prototipo.service;

import com.example.prototipo.enums.Status;
import com.example.prototipo.exception.BusinessException;
import com.example.prototipo.models.Customer;
import com.example.prototipo.models.Docs;
import com.example.prototipo.models.Procurement;
import com.example.prototipo.records.DailyResponse;
import com.example.prototipo.records.File;
import com.example.prototipo.records.OpportunitiesPNCP;
import com.example.prototipo.repository.DocsRepository;
import com.example.prototipo.repository.ProcurementRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ContentDisposition;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Set;

@Service
public class ProcurementService {
    @Autowired
    private ProcurementRepository repository;
    @Autowired
    private RestClient restClient;
    @Autowired
    private DocsRepository docsRepository;

    public List<Procurement> getAll(){
        return repository.findAll();
    }

    public Procurement getById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Edital não encotrado"));
    }

    @Transactional
    public void deleteAllDiscard(){
        List<Procurement> discard = repository.findDiscardWithCustomer(Status.DESCARTADO.toString());

        discard.forEach(d -> d.getCustomer().addPncpId(d.getPncpId()));

        repository.deleteAll(discard);
    }

    public void changeStatus(Long procurementId, Status status){
        Procurement procurement = repository.findById(procurementId)
                .orElseThrow(() -> new EntityNotFoundException("Edital não encontrado"));

        procurement.setStatus(status);
        repository.save(procurement);
    }

    public List<Procurement> searchProcurements(LocalDate date, Long customerId, String uf, String pncpId){
        if(date == null){
            throw new BusinessException("A data não pode ser nula");
        }

        return repository.searchProcurements(date, customerId, uf, pncpId);
    }

    @Transactional
    public void save(Procurement procurement){
        try{
            if(procurement.getCustomer() != null){
                Set<String> discards = procurement.getCustomer().getDiscardsPncpId();

                if (discards == null || !discards.contains(procurement.getPncpId())){
                    repository.save(procurement);
                }
            }
        } catch (Exception exception){
            return;
        }
    }

    public List<OpportunitiesPNCP> searchByPage(String q, String ufs, int page){
        System.out.println("Fazendo requisição: "+q);
        System.out.println(q);
        System.out.println(ufs);

        try{
            DailyResponse response = restClient
                    .get()
                    .uri(uriBuilder -> {
                        var builder = uriBuilder
                                .path("/api/search/")
                                .queryParam("q", q)
                                .queryParam("tipos_documento", "edital")
                                .queryParam("ordenacao", "-data")
                                .queryParam("pagina", page)
                                .queryParam("tam_pagina", 50)
                                .queryParam("status", "recebendo_proposta");

                        if (ufs != null) {
                            builder.queryParam("ufs", ufs);
                        }

                        return builder.build();
                    })
                    .retrieve()
                    .body(DailyResponse.class);

            assert response != null;
            return response.items().isEmpty() ? List.of() : response.items();
        } catch (RestClientResponseException ex) {
            System.err.println("Erro na requisição: Status " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString());
            return List.of();
        } catch (ResourceAccessException ex) {
            System.err.println("Timeout ou erro de rede ao conectar à API do PNCP: " + ex.getMessage());
            return List.of();
        } catch (Exception ex) {
            return List.of();
        }
    }

    public boolean getLink(Procurement procurement){
        String path = "/api/pncp/v1/orgaos/"+procurement.getCnpj()+"/compras/2026/"+procurement.getNumeroSequencial()+"/arquivos";

        ParameterizedTypeReference<List<File>> typeReference =
                new ParameterizedTypeReference<List<File>>() {};

        try{
            List<File> response = restClient
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .path(path)
                            .queryParam("pagina", 1)
                            .queryParam("tamanhoPagina", 10)
                            .build())
                    .retrieve()
                    .body(typeReference);

            assert response != null;

             List<File> file =  response.stream()
                    .filter((f) -> f.tipoDocumentoNome().equalsIgnoreCase("edital"))
                     .filter((f) -> isLinkPdf(f.url()))
                     .toList();

             if(!file.isEmpty()){
                 file.forEach((f) -> {
                     if(!f.url().isBlank()){
                         Docs docs = new Docs(f.url());
                         procurement.addDoc(docs);
                         docsRepository.save(docs);
                     }
                 });
                 return true;
             }

             return false;
        } catch (RestClientResponseException ex) {
            System.err.println("Erro na requisição: Status " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString());
            return false;
        }catch (ResourceAccessException ex) {
            System.err.println("Timeout ou erro de rede ao conectar à API do PNCP: " + ex.getMessage());
            return false;
        } catch (Exception ex) {
            System.err.println("Error: " + ex.getMessage());
            return false;
        }
    }

    public boolean isLinkPdf(String url) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout((int) Duration.ofSeconds(30).toMillis());
        factory.setReadTimeout((int) Duration.ofSeconds(60).toMillis());

        System.out.println(url);

        try {
            RestClient checkerClient = RestClient
                    .builder()
                    .baseUrl("https://pncp.gov.br")
                    .requestFactory(factory)
                    .defaultHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .build();

            var headers = checkerClient.get()
                    .uri(url)
                    .retrieve()
                    .toBodilessEntity()
                    .getHeaders();

            ContentDisposition contentDisposition = headers.getContentDisposition();

            String filename = contentDisposition.getFilename();

            if (filename != null && !filename.isBlank()) {
                return filename.toLowerCase().endsWith(".pdf");
            }

            return url.toLowerCase().contains(".pdf");

        } catch (Exception e) {
            System.err.println("Não foi possível verificar o tipo do link: " + e.getMessage());
            return false;
        }
    }
}