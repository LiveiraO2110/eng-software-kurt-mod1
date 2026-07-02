package com.example.prototipo.service;

import com.example.prototipo.models.Customer;
import com.example.prototipo.models.User;
import com.example.prototipo.repository.CustomerRepository;
import com.example.prototipo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private CustomerRepository customerRepository;

    public User regiter(String name, String email, String password){
        return repository.save(new User(name, email, password));
    }

    public List<Customer> getCustomerByUser(Long userId){
        return customerRepository.findByUser_Id(userId);
    }

    public List<User> getAll(){
        return repository.findAll();
    }

    public User getById(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
    }
}
