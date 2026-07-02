package com.example.prototipo.controller;

import com.example.prototipo.records.response.CustomerDTO;
import com.example.prototipo.records.response.UserDTO;
import com.example.prototipo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class ControllerUser {
    @Autowired
    private UserService service;

    @GetMapping
    public List<UserDTO> getAll(){
        return service.getAll().stream().map(UserDTO::new).toList();
    }

    @GetMapping("/{id}/customers")
    public List<CustomerDTO> getCustomers(@PathVariable("id") Long id){
        return service.getCustomerByUser(id).stream().map(CustomerDTO::new).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(new UserDTO(service.getById(id)));
    }
}