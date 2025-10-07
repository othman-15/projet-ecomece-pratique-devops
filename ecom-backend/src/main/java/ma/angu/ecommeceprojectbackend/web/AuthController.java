package ma.angu.ecommeceprojectbackend.web;

import lombok.RequiredArgsConstructor;
import ma.angu.ecommeceprojectbackend.auth.AuthRequest;
import ma.angu.ecommeceprojectbackend.auth.AuthResponse;
import ma.angu.ecommeceprojectbackend.auth.RegisterRequest;
import ma.angu.ecommeceprojectbackend.auth.SignupRequest;

import ma.angu.ecommeceprojectbackend.services.AuthenticationService;
import ma.angu.ecommeceprojectbackend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        userService.registerUser(request);
        return ResponseEntity.ok("User registered successfully!");
    }
}
