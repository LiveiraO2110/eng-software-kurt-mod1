package com.example.prototipo.repository;

import com.example.prototipo.enums.Status;
import com.example.prototipo.models.Customer;
import com.example.prototipo.models.Procurement;
import com.example.prototipo.models.State;
import com.example.prototipo.records.OpportunitiesPNCP;
import jakarta.persistence.EntityManager;
import org.h2.command.ddl.CreateSchema;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class ProcurementRepositoryTest {
    @Autowired
    private EntityManager em;
    @Autowired
    private ProcurementRepository repository;

    @Test
    void shouldReturnTrueExistsByCustomer_IdAndPncpid(){
        Customer customer = new Customer("Customer Test");
        em.persist(customer);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);
        em.persist(procurement);

        boolean result = repository.existsByCustomer_IdAndPncpId(customer.getId(), procurement.getPncpId());

        assertTrue(result);
    }

    @Test
    void shouldReturnFalseExistsByCustomer_IdAndPncpid(){
        Customer customer = new Customer("Customer Test");
        em.persist(customer);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);
        em.persist(procurement);

        em.flush();

        boolean result = repository.existsByCustomer_IdAndPncpId(customer.getId(), "83024240000153-1-000084/2025");

        assertFalse(result);
    }

    @Test
    void shouldReturAvaiableProcurements(){
        Customer customer = new Customer("Customer Test");
        em.persist(customer);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement1 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        Procurement procurement2 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000085/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);
        procurement2.setStatus(Status.DESCARTADO);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        List<Procurement> result = repository.findOnlyDiscardByCustomer_Id(customer.getId());

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement2);
    }

    @Test
    void shouldDeleteAllDiscardProcurements(){
        Customer customer = new Customer("Customer Test");
        em.persist(customer);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement1 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        Procurement procurement2 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "76966852000108-1-000025/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);
        procurement2.setStatus(Status.DESCARTADO);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        repository.deleteAllDiscard();

        List<Procurement> result = repository.findAll();

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement1);
    }

    @Test
    void shouldReturnProcurements_When_FilteredOnlyByDate(){
        Customer customer = new Customer("Customer Test");
        em.persist(customer);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement1 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        Procurement procurement2 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "76966852000108-1-000025/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);
        procurement2.setUpdateDate(LocalDate.MIN);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        List<Procurement> result = repository.searchProcurements(LocalDate.now(), null, null, null);

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement1);
    }

    @Test
    void shouldFilterCorrectly_When_CustomerIdIsProvided(){
        Customer customer1 = new Customer("Customer Test");
        Customer customer2 = new Customer("Customer 2 Test");

        em.persist(customer1);
        em.persist(customer2);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement1 = new Procurement(customer1, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        Procurement procurement2 = new Procurement(customer2, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "76966852000108-1-000025/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        List<Procurement> result = repository.searchProcurements(LocalDate.now(), customer1.getId(), null, null);

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement1);
    }

    @Test
    void shouldFilterCorrectly_When_UfIsProvided(){
        Customer customer = new Customer("Customer Test");

        em.persist(customer);

        State state1 = new State("RS");
        State state2 = new State("SC");

        em.persist(state1);
        em.persist(state2);

        Procurement procurement1 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "RS",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state1);

        Procurement procurement2 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "76966852000108-1-000025/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "SC",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state2);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        List<Procurement> result = repository.searchProcurements(LocalDate.now(), null, "rs", null);

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement1);
    }

    @Test
    void shouldFilterCorrectly_When_PncpIdIsProvided(){
        Customer customer = new Customer("Customer Test");
        em.persist(customer);

        State state = new State("UF");
        em.persist(state);

        Procurement procurement1 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        Procurement procurement2 = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "76966852000108-1-000025/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);
        procurement2.setUpdateDate(LocalDate.MIN);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        List<Procurement> result = repository.searchProcurements(LocalDate.now(), null, null, "830");

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement1);
    }

    @Test
    void shouldFilterCorrectly_When_AllFiltersAreProvided(){
        Customer customer1 = new Customer("Customer Test");
        Customer customer2 = new Customer("Customer 1 Test");

        em.persist(customer1);
        em.persist(customer2);

        State state1 = new State("RS");
        State state2 = new State("SC");

        em.persist(state1);
        em.persist(state2);

        Procurement procurement1 = new Procurement(customer1, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "83024240000153-1-000084/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state1);

        Procurement procurement2 = new Procurement(customer2, new OpportunitiesPNCP(
                "Titulo",
                "desc",
                "76966852000108-1-000025/2026",
                "Orgao",
                "Nome",
                "Municipio",
                "Uf",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state1);
        procurement2.setUpdateDate(LocalDate.MIN);

        em.persist(procurement1);
        em.persist(procurement2);

        em.flush();

        List<Procurement> result = repository.searchProcurements(LocalDate.now(), customer1.getId(), "rs", "830");

        assertEquals(1, result.size());
        assertEquals(result.get(0), procurement1);
    }
}