package com.example.prototipo.records.requests;

import jakarta.validation.constraints.NotBlank;

public record UserRequest(
        @NotBlank(message = "Nome de usuário não pode ser nulo ou vazio") String name,
        @NotBlank(message = "Email não pode ser nulo ou vazio") String email,
        @NotBlank(message = "Senha não pode ser nulo ou vazio") String password
) {
}
