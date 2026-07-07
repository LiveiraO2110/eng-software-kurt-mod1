package com.example.prototipo.controller;

import com.example.prototipo.records.response.SearchResponse;
import com.example.prototipo.service.SchedulerWorker;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
public class ControllerWorker {
    private final SchedulerWorker schedulerWorker;

    public ControllerWorker(
            SchedulerWorker schedulerWorker
    ){
        this.schedulerWorker = schedulerWorker;
    }

    @GetMapping
    public ResponseEntity<SearchResponse> search(){
        if(schedulerWorker.isLocked()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new SearchResponse("BUSCANDO...", "A busca já está sendo realizada"));
        }

        schedulerWorker.customersSearch();
        return ResponseEntity.ok(new SearchResponse("BUSCA INICIADA", "A busca foi iniciada"));
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> getStatus(){
        return ResponseEntity.ok(schedulerWorker.isLocked());
    }
}
