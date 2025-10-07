package ma.angu.ecommeceprojectbackend.repository;

import ma.angu.ecommeceprojectbackend.entities.Order;
import ma.angu.ecommeceprojectbackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}