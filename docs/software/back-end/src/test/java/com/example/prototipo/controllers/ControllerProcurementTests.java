package com.example.prototipo.controllers;

import com.example.prototipo.configurations.SecurityFilter;
import com.example.prototipo.configurations.TokenConfig;
import com.example.prototipo.controller.ControllerProcurement;
import com.example.prototipo.exception.GlobalExceptionHandler;
import com.example.prototipo.models.Customer;
import com.example.prototipo.models.Procurement;
import com.example.prototipo.models.State;
import com.example.prototipo.records.OpportunitiesPNCP;
import com.example.prototipo.service.ProcurementService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.time.LocalDateTime;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({ControllerProcurement.class, GlobalExceptionHandler.class})
@AutoConfigureMockMvc(addFilters = false)
@Import(TokenConfig.class)
public class ControllerProcurementTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SecurityFilter securityFilter;
    @MockBean
    private TokenConfig tokenConfig;
    @MockBean
    private ProcurementService service;

    @Test
    void shouldReturnProcurementById() throws Exception {
        Customer customer = new Customer("Cliente Teste");
        State state = new State("UF");
        Procurement procurement = new Procurement(customer, new OpportunitiesPNCP(
                "Titulo",
                "Descrição",
                "13213131",
                "314131/312321-41231",
                "ORGAO",
                "Municipio",
                "UF",
                "Modalidade",
                "1",
                LocalDateTime.now(),
                LocalDateTime.now(),
                LocalDateTime.now()
        ), state);

        when(service.getById(1L)).thenReturn(procurement);

        mockMvc.perform(get("/procurements/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.modalidade").value(procurement.getModalidade()))
                .andExpect(jsonPath("$.id").value(procurement.getId()));
    }

    @Test
    void shouldReturnStatus204() throws Exception {
        mockMvc.perform(put("/procurements/1/status/DESCARTADO"))
                .andExpect(status().isNoContent());
    }
}
