package com.example.prototipo.repository;

import com.example.prototipo.models.Procurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProcurementRepository extends JpaRepository<Procurement, Long> {
    @Query("SELECT p FROM Procurement p WHERE p.customer.id = :id AND p.status <> 'DESCARTADO'")
    List<Procurement> findByCustomer_Id(@Param("id") Long customerId);

    List<Procurement> findByStatus(String status);

    @Query("""
        SELECT p
        FROM Procurement p
        JOIN FETCH p.customer
        WHERE p.status = :status
        """)
    List<Procurement> findDiscardWithCustomer(String status);

    @Query("SELECT p FROM Procurement p WHERE p.customer.id = :id AND p.status = 'DESCARTADO'")
    List<Procurement> findOnlyDiscardByCustomer_Id(@Param("id") Long customerId);

    @Query("SELECT p FROM Procurement p " +
            "WHERE p.updateDate = :date " +
            "AND (:customerId IS NULL OR p.customer.id = :customerId) " +
            "AND (:uf IS NULL OR lower(p.state.uf) = lower(:uf)) " +
            "AND (:pncpId IS NULL OR p.pncpId LIKE CONCAT('%', :pncpId, '%')) " +
            "AND p.status <> 'DESCARTADO'")
    List<Procurement> searchProcurements(
            @Param("date") LocalDate date,
            @Param("customerId") Long customerId,
            @Param("uf") String uf,
            @Param("pncpId") String pncpId
    );

    boolean existsByCustomer_IdAndPncpId(Long customer_id, String pncpid);

    @Modifying
    @Query("DELETE FROM Procurement p WHERE p.status = 'DESCARTADO'")
    void deleteAllDiscard();

    @Modifying
    @Query("DELETE FROM Procurement p WHERE p.status = 'DESCARTADO' AND p.customer.id = :id")
    void deleteAllDiscardByCustomer(@Param("id") Long id);
}