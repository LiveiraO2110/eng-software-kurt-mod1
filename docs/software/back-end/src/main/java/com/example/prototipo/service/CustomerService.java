package com.example.prototipo.service;

import com.example.prototipo.models.Customer;
import com.example.prototipo.models.Procurement;
import com.example.prototipo.models.SearchTerms;
import com.example.prototipo.models.User;
import com.example.prototipo.repository.CustomerRepository;
import com.example.prototipo.repository.ProcurementRepository;
import com.example.prototipo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository repository;
    @Autowired
    private ProcurementRepository procurementRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Customer> getAll(){
        return repository.findAll();
    }

    public List<Procurement> getProcurement(Long customerId){
        if(!repository.existsById(customerId)){
            throw new EntityNotFoundException("Cliente com id "+customerId+" não encontrado");
        }

        return procurementRepository.findByCustomer_Id(customerId);
    }

    public void deleteAllDiscardByCustomer(Long customerId){
        if(!repository.existsById(customerId)){
            throw new EntityNotFoundException("Cliente com id "+customerId+" não encontrado");
        }

        procurementRepository.deleteAllDiscardByCustomer(customerId);
    }

    public List<Procurement> getOnlyProcurementDiscard(Long customerId){
        if(!repository.existsById(customerId)){
            throw new EntityNotFoundException("Cliente com id "+customerId+" não encontrado");
        }

        return procurementRepository.findOnlyDiscardByCustomer_Id(customerId);
    }

    public Customer createCustomer(Long userId, String name ){
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        Customer customer = new Customer(user, name);
        user.addCustomer(customer);

        return repository.save(customer);
    }

    public Set<SearchTerms> getSearchTerms(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"))
                .getSearchTerms();
    }
}
