package ma.angu.ecommeceprojectbackend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import ma.angu.ecommeceprojectbackend.entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "ecomm3rce-app-secret-key-jwt-256bits!";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(UserDetails userDetails) {
        User user = (User) userDetails;
        return Jwts.builder()
                .setSubject(user.getUsername()) // généralement l'email
                .claim("id", user.getId()) // utile côté frontend
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("role", user.getRole().name())
                .claim("email", user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()));
    }

    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }
}
