package com.example.prototipo.records.response;

import com.example.prototipo.models.Procurement;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ProcurementDTO(
    Long id,
    String pncpId,
    Long customerId,
    String customer,
    String description,
    String city,
    String uf,
    LocalDate insertDate,
    LocalDateTime openDate,
    LocalDateTime closeDate,
    String cnpj,
    String name,
    String modalidade,
    String link
) {
    public ProcurementDTO(Procurement procurement){
        this(
                procurement.getId(),
                procurement.getPncpId(),
                procurement.getCustomer().getId(),
                procurement.getCustomer().getName(),
                procurement.getDescription(),
                procurement.getCity(),
                procurement.getState().getUf(),
                procurement.getUpdateDate(),
                procurement.getOpenDate(),
                procurement.getCloseDate(),
                procurement.getCnpj(),
                procurement.getName(),
                procurement.getModalidade(),
                procurement.getLink()
        );
    }
}
