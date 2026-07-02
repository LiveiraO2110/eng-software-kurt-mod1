package com.example.prototipo.records.response;

import com.example.prototipo.models.User;

import java.util.Set;
import java.util.stream.Collectors;

public record UserDTO (
        Long id,
        String name
){
    public UserDTO(User user){
        this(
                user.getId(),
                user.getName()
        );
    }
}
