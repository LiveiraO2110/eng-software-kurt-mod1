package com.example.prototipo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    @Column(name = "nome", nullable = false)
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Customer> customers =  new ArrayList<>();

    public User(){}

    public User(
            String name
    ){
        this.name = name;
    }

    public User(
            String name,
            String email,
            String password
    ){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {return true;}

    @Override
    public boolean isAccountNonLocked() {return true;}

    @Override
    public boolean isCredentialsNonExpired() {return true;}

    @Override
    public boolean isEnabled() {return true;}

    public void addCustomer(Customer customer){
        if(this.customers == null){
            this.customers = new ArrayList<>();
        }

        if(!this.customers.contains(customer)) {
            this.customers.add(customer);
            customer.setUser(this);
        }
    }
}
