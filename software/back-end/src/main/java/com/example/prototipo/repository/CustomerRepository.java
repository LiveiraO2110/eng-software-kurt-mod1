package com.example.prototipo.repository;

import com.example.prototipo.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByUser_Id(Long userId);

    @Query("SELECT c.discardsPncpId FROM Customer c " +
            "WHERE c.id = :id")
    Set<String> findDiscardsByCustomerId(@Param("id") Long id);
}
