package ma.angu.ecommeceprojectbackend.services;

import lombok.RequiredArgsConstructor;
import ma.angu.ecommeceprojectbackend.dtos.OrderItemDTO;
import ma.angu.ecommeceprojectbackend.dtos.OrderRequestDTO;
import ma.angu.ecommeceprojectbackend.entities.Order;
import ma.angu.ecommeceprojectbackend.entities.OrderItem;
import ma.angu.ecommeceprojectbackend.entities.Product;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.OrderRepository;
import ma.angu.ecommeceprojectbackend.repository.ProductRepositor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final ProductRepositor productRepository;
    private final OrderRepository orderRepository;

    @Override
    public Order createOrder(OrderRequestDTO dto, User user) {
        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderItemDTO itemDTO : dto.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

            double itemTotal = product.getProductPrice() * itemDTO.getQuantity();
            total += itemTotal;

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(itemDTO.getQuantity())
                    .selectedColor(itemDTO.getSelectedColor())
                    .build();

            items.add(item);
        }

        Order order = Order.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .shipping(dto.getShipping())
                .totalPrice(total)
                .items(new ArrayList<>())
                .build();

        for (OrderItem item : items) {
            item.setOrder(order);
            order.getItems().add(item);
        }

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }
}
