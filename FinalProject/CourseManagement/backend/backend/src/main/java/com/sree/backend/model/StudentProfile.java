package com.sree.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfile {
    private Integer id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String phone;
    private String bio;
    private Role role;
    private List<CourseResponse> courses;
}