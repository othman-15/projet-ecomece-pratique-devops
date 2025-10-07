package ma.angu.ecommeceprojectbackend.services;

import lombok.RequiredArgsConstructor;
import ma.angu.ecommeceprojectbackend.auth.SignupRequest;
import ma.angu.ecommeceprojectbackend.entities.Role;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void registerUser(SignupRequest request) {
        if (userRepository.existsByEmail((request.email)) ){
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .firstName(request.firstName)
                .lastName(request.lastName)
                .email(request.email)
                .password(passwordEncoder.encode(request.password))
                .phone(request.phone)
                .dob(request.dob)
                .gender(request.gender)
                .address(request.address)
                .country(request.country)
                .role(Role.ROLE_USER) // Par défaut
                .build();

        userRepository.save(user);
    }
}