package com.example.prototipo.controller;

import com.example.prototipo.enums.Status;
import com.example.prototipo.records.response.ProcurementDTO;
import com.example.prototipo.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/procurements")
public class ControllerProcurement {
    @Autowired
    private ProcurementService service;

    @GetMapping
    public List<ProcurementDTO> getAll(){
        return service.getAll().stream().map(ProcurementDTO::new).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcurementDTO> getById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity.ok(new ProcurementDTO(service.getById(id)));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProcurementDTO>> search(
            @RequestParam(value = "c", required = false) Long customerId,
            @RequestParam(value = "date") LocalDate date,
            @RequestParam(value = "uf", required = false) String uf,
            @RequestParam(value = "pncp", required = false) String pncpId
    ){
        return ResponseEntity.ok(service.searchProcurements(date, customerId, uf, pncpId).stream().map(ProcurementDTO::new).toList());
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Void> changeStatus(
            @PathVariable("id") Long id,
            @PathVariable("status") Status status
    ){
        service.changeStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/discards")
    public ResponseEntity<Void> deleteAllDiscard(){
        service.deleteAllDiscard();
        return ResponseEntity.noContent().build();
    }
}