package com.example.prototipo.controllers;

import com.example.prototipo.configurations.SecurityFilter;
import com.example.prototipo.configurations.TokenConfig;
import com.example.prototipo.controller.ControllerCustomer;
import com.example.prototipo.enums.Status;
import com.example.prototipo.exception.GlobalExceptionHandler;
import com.example.prototipo.models.Customer;
import com.example.prototipo.models.Procurement;
import com.example.prototipo.models.State;
import com.example.prototipo.service.CustomerService;
import com.example.prototipo.service.SearchTermsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cglib.core.Local;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({ControllerCustomer.class, GlobalExceptionHandler.class})
@AutoConfigureMockMvc(addFilters = false)
@Import(TokenConfig.class)
public class ControllerCustomerTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SecurityFilter securityFilter;
    @MockBean
    private TokenConfig tokenConfig;
    @MockBean
    private SearchTermsService searchTermsService;
    @MockBean
    private CustomerService service;

    @Test
    void shouldReturnCreatedCustomer() throws Exception{
        Customer customer = new Customer("Cliente");
        String json = """
                {
                    "userId": 1,
                    "name": "Cliente"
                }""";

        when(service.createCustomer(anyLong(), anyString())).thenReturn(customer);

        mockMvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(customer.getName()));
    }

    @Test
    void shouldReturnBadRequestWhenNameIsEmpty() throws Exception{
        String json = """
                {
                    "userId": 1,
                    "name": ""
                }""";

        mockMvc.perform(post("/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Nome do cliente não pode ser nulo ou vazio"));
    }

    @Test
    void shouldReturnOnlyDiscardProcurements() throws Exception {
        Customer customer = new Customer("Cliente teste");
        Procurement procurement = new Procurement();
        procurement.setCustomer(customer);
        procurement.setState(new State("RS"));
        procurement.setLink("LinkTest.com");
        procurement.setCity("Santa Cruz do Sul");
        procurement.setId(1L);
        procurement.setCloseDate(LocalDateTime.MAX);
        procurement.setOpenDate(LocalDateTime.MIN);
        procurement.setCnpj("13313213131");
        procurement.setDescription("Descrição teste");
        procurement.setName("Nome teste");
        procurement.setPncpId("12345");
        procurement.setStatus(Status.DESCARTADO);

        when(service.getOnlyProcurementDiscard(1L)).thenReturn(List.of(procurement));

        mockMvc.perform(get("/customers/1/procurements?discard=true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].pncpId").value(procurement.getPncpId()));
    }
}
