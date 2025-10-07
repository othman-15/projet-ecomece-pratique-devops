package ma.angu.ecommeceprojectbackend.web;

import lombok.RequiredArgsConstructor;
import ma.angu.ecommeceprojectbackend.dtos.OrderRequestDTO;
import ma.angu.ecommeceprojectbackend.entities.Order;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.UserRepository;
import ma.angu.ecommeceprojectbackend.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequestDTO dto, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        Order order = orderService.createOrder(dto, user);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        return ResponseEntity.ok(orderService.getUserOrders(user));
    }
}
