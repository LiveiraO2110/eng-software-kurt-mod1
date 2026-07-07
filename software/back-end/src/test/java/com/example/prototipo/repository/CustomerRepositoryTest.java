package com.example.prototipo.repository;

import com.example.prototipo.models.Customer;
import com.example.prototipo.models.User;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class CustomerRepositoryTest {
    @Autowired
    private EntityManager em;
    @Autowired
    private CustomerRepository repository;

    @Test
    void shouldFindAllDiscardsByCustomer(){
        User user = new User("Usuário teste", "email.com", "senha123");
        em.persist(user);

        Customer customer = new Customer(user, "Cliente teste");
        customer.addPncpId("12345");
        customer.addPncpId("67890");

        Customer customer2 = new Customer(user, "Cliente teste");
        customer2.addPncpId("54321");

        em.persist(customer);
        em.persist(customer2);

        Set<String> result = repository.findDiscardsByCustomerId(customer.getId());

        assertEquals(2, result.size());
        assertTrue(result.contains("12345"));
        assertTrue(result.contains("67890"));
    }
}
