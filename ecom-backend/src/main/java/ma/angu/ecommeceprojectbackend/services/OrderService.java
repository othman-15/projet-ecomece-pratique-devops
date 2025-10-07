package ma.angu.ecommeceprojectbackend.services;

import ma.angu.ecommeceprojectbackend.dtos.OrderRequestDTO;
import ma.angu.ecommeceprojectbackend.entities.Order;
import ma.angu.ecommeceprojectbackend.entities.User;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequestDTO orderDTO, User user);
    List<Order> getUserOrders(User user);
}
