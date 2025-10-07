package ma.angu.ecommeceprojectbackend.repository;

import ma.angu.ecommeceprojectbackend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepositor extends JpaRepository<Product, Long> {
    List<Product> findByQuantityGreaterThan(int quantity);
    List<Product> findByQuantityLessThan(int quantity);
    @Query("SELECT p FROM Product p WHERE p.quantity < p.stockAlertThreshold")
    List<Product> findAllBelowThreshold();
}
