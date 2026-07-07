package com.example.prototipo.service;

import com.example.prototipo.exception.BusinessException;
import com.example.prototipo.models.Procurement;
import com.example.prototipo.models.SearchTerms;
import com.example.prototipo.models.State;
import com.example.prototipo.records.OpportunitiesPNCP;
import com.example.prototipo.repository.CustomerRepository;
import com.example.prototipo.repository.ProcurementRepository;
import com.example.prototipo.repository.SearchTermsRepository;
import com.example.prototipo.repository.StateRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class SchedulerWorker {
    private final SearchTermsRepository searchTermsRepository;
    private final ProcurementRepository repository;
    private final StateRepository stateRepository;
    private final ProcurementService procurementService;
    private final CustomerRepository customerRepository;
    private final ReentrantLock lock = new ReentrantLock();

    public SchedulerWorker(
            SearchTermsRepository searchTermsRepository,
            ProcurementRepository repository,
            StateRepository stateRepository,
            ProcurementService procurementService,
            CustomerRepository customerRepository
    ) {
        this.searchTermsRepository = searchTermsRepository;
        this.repository = repository;
        this.stateRepository = stateRepository;
        this.procurementService = procurementService;
        this.customerRepository = customerRepository;
    }

    @Scheduled(cron = "0 0 8 * * *")
    @Async
    public void customersSearch(){
        if(!lock.tryLock()){
            throw new BusinessException("A busca já esta sendo realizada");
        }

        try{
            List<SearchTerms> terms = searchTermsRepository.findAllWithState();

            for (SearchTerms term : terms) {
                Set<String> discards = customerRepository.findDiscardsByCustomerId(term.getCustomer().getId());

                List<OpportunitiesPNCP> procurements = dailySearch(term).stream()
                        .filter(p -> !discards.contains(p.numero_controle_pncp()))
                        .toList();

                System.out.println(procurements);

                for (OpportunitiesPNCP procurement : procurements) {

                    if(repository.existsByCustomer_IdAndPncpId(term.getCustomer().getId(), procurement.numero_controle_pncp())){
                        continue;
                    }

                    Optional<State> state = stateRepository.findByUf(procurement.uf());

                    if(state.isEmpty()){
                        continue;
                    }

                    Procurement newProcurement = new Procurement(term.getCustomer(), procurement, state.get());

                    if(procurementService.getLink(newProcurement)){
                        procurementService.save(newProcurement);
                    }
                }
            }
        } finally {
            lock.unlock();
        }
    }

    public boolean isLocked(){
        return lock.isLocked();
    }

    private List<OpportunitiesPNCP> dailySearch(SearchTerms term){
        List<OpportunitiesPNCP> opportunities = new ArrayList<>();
        String ufs = null;

        if(!term.getStates().isEmpty()){
            StringBuilder stringBuilder = new StringBuilder();

            for (State state : term.getStates()) {
                if(stringBuilder.toString().isEmpty()){
                    stringBuilder.append(state.getUf());
                } else{
                    stringBuilder.append("|").append(state.getUf());
                }
            }

            ufs = stringBuilder.toString();
        }

        int page = 1;

        while(true){
            List<OpportunitiesPNCP> response = procurementService.searchByPage(term.getTerm(), ufs, page)
                    .stream().filter(Objects::nonNull).toList();

            if (response.isEmpty()) {
                break;
            }

            List<OpportunitiesPNCP> filtered = response.stream()
                    .filter(r -> r.data_atualizacao_pncp().toLocalDate().isAfter(LocalDate.now().minusDays(3)))
                    .filter(r -> r.modalidade_licitacao_nome().equalsIgnoreCase("Pregão - Eletrônico"))
                    .toList();

            if(filtered.isEmpty()) break;

            opportunities.addAll(filtered);
            page++;
        }

        return opportunities.stream()
                .filter(op -> op.data_fim_vigencia().toLocalDate().isAfter(LocalDate.now()))
                .toList();
    }
}