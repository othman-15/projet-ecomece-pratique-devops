package ma.angu.ecommeceprojectbackend.repository;

import ma.angu.ecommeceprojectbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
