package ma.angu.ecommeceprojectbackend.repository;

import ma.angu.ecommeceprojectbackend.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {}
