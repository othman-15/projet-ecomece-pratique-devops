package ma.angu.ecommeceprojectbackend.services;

import lombok.RequiredArgsConstructor;
import ma.angu.ecommeceprojectbackend.auth.AuthRequest;
import ma.angu.ecommeceprojectbackend.auth.AuthResponse;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.UserRepository;
import ma.angu.ecommeceprojectbackend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse authenticate(AuthRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt);
    }
}
