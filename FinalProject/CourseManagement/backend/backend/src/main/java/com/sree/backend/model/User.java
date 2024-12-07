package com.sree.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;

    @Column(unique = true, nullable = false)
    @NotEmpty(message = "Username is required")
    private String username;

    @Column(nullable = false)
    //@Size(min = 8, message = "Password must be at least 8 character long")
    private String password;

    //@Email(message= "Email should be valid")
    private String email;

    //@Pattern(regexp = "^\\d{10}$", message = "phone number should be 10 digits")
    private String phone;

    @JsonIgnore
    @ManyToMany(mappedBy = "students", fetch = FetchType.EAGER)
    private List<Course> courses;

    @Enumerated(EnumType.STRING)
    private Role role;


}
