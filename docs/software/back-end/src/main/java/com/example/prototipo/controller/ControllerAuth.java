package com.example.prototipo.controller;

import com.example.prototipo.configurations.TokenConfig;
import com.example.prototipo.models.User;
import com.example.prototipo.records.requests.LoginRequest;
import com.example.prototipo.records.requests.UserRequest;
import com.example.prototipo.records.response.LoginResponse;
import com.example.prototipo.records.response.UserDTO;
import com.example.prototipo.repository.UserRepository;
import com.example.prototipo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class ControllerAuth {
    private final UserService service;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;
    private final UserRepository userRepository;

    public ControllerAuth(
            UserService service,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            TokenConfig tokenConfig,
            UserRepository userRepository
    ){
        this.service = service;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest login){

        UsernamePasswordAuthenticationToken usernameAndPassword = new UsernamePasswordAuthenticationToken(login.email(), login.password());
        Authentication authentication = authenticationManager.authenticate(usernameAndPassword);

        User user = (User) authentication.getPrincipal();
        String token = tokenConfig.generateToken(user);

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody UserRequest request){
        List<User> users = userRepository.findAll();

        if(!users.isEmpty()) throw new RuntimeException("Já possui um usuário");

        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(service.regiter(request.name(), request.email(), passwordEncoder.encode(request.password()))));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me (Authentication authentication){
        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return ResponseEntity.ok(new UserDTO(user));
    }
}