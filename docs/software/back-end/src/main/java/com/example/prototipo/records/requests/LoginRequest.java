package com.example.prototipo.records.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @Email(message = "Email inválido") String email,
        @NotBlank(message = "Senha não pode ser nula ou vazia") String password
) {
}
