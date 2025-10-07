package ma.angu.ecommeceprojectbackend;

import ma.angu.ecommeceprojectbackend.entities.Product;
import ma.angu.ecommeceprojectbackend.entities.Role;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.ProductRepositor;
import ma.angu.ecommeceprojectbackend.repository.UserRepository;
import ma.angu.ecommeceprojectbackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class EcommeceProjectBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommeceProjectBackendApplication.class, args);
    }
    @Autowired
    private ProductService productService;
    @Bean
    public CommandLineRunner commandLineRunner(ProductRepositor productRepositor, UserRepository userRepository, PasswordEncoder passwordEncoder) {

        return args -> {
            if (userRepository.findByEmail("admin@ecom.com").isEmpty()) {
                User admin = User.builder()
                        .firstName("Admin")
                        .lastName("User")
                        .email("admin@ecom.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ROLE_ADMIN)
                        .build();
                userRepository.save(admin);
            }
            productRepositor.save(Product.builder()
                    .productTitle("HP Pavilion 15")
                    .productPrice(9500.0)
                    .category("laptop")
                    .quantity(5)
                    .image("assets/images/Hp-pavilon.png")
                    .favorite(false)
                    .colors(List.of("white", "red", "gray", "black"))
                    .build());

            productRepositor.save(Product.builder()
                    .productTitle("MacBook Air M2")
                    .productPrice(14000.0)
                    .category("laptop")
                    .quantity(2)
                    .image("assets/images/m2-macbook-air.png")
                    .favorite(false)
                    .colors(List.of("white", "red", "gray", "black"))
                    .build());

            productRepositor.save(Product.builder()
                    .productTitle("HP Mouse")
                    .productPrice(360.0)
                    .category("accessory")
                    .quantity(30)
                    .image("assets/images/mouse-hp.png")
                    .favorite(false)
                    .colors(List.of("white", "red", "gray", "black"))
                    .build());

            productRepositor.save(Product.builder()
                    .productTitle("Imprimante HP")
                    .productPrice(1200.0)
                    .category("printer")
                    .quantity(15)
                    .image("assets/images/imprim-hp.png")
                    .favorite(false)
                    .colors(List.of("white", "red", "gray", "black"))
                    .build());

            productRepositor.save(Product.builder()
                    .productTitle("Toshiba")
                    .productPrice(9999.0)
                    .category("laptop")
                    .quantity(18)
                    .image("assets/images/toushiba.png")
                    .favorite(false)
                    .colors(List.of("white", "red", "gray", "black"))
                    .build());

        };


    }
}
