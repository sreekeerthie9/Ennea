package com.sree.backend.service;

import com.sree.backend.model.User;
import com.sree.backend.model.UserPrincipal;
import com.sree.backend.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private final UserRepo repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User student = repo.findByUsername(username);

        if (student == null) {
            throw new UsernameNotFoundException(username);
        }

        return new UserPrincipal(student);
    }
}
