package ma.angu.ecommeceprojectbackend.web;

import ma.angu.ecommeceprojectbackend.entities.Product;
import ma.angu.ecommeceprojectbackend.entities.StockHistory;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.ProductRepositor;
import ma.angu.ecommeceprojectbackend.repository.UserRepository;
import ma.angu.ecommeceprojectbackend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductService productService;
    private final UserRepository userRepository;

    private final ProductRepositor productRepositor;


    public AdminController(ProductService productService, UserRepository userRepository, ProductRepositor productRepositor) {
        this.productService = productService;
        this.userRepository = userRepository;
        this.productRepositor = productRepositor;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productRepositor.save(product));
    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/stock-alert")
    public List<Product> getLowStockProducts(@RequestParam(defaultValue = "5") int threshold) {
        return productRepositor.findByQuantityLessThan(threshold);
    }
    @PutMapping("/products/{id}/stock")
    public ResponseEntity<?> updateStock(@PathVariable Long id,
                                         @RequestParam int newQuantity,
                                         @AuthenticationPrincipal User adminUser) {
        Product updated = productService.updateProductStock(id, newQuantity, adminUser);
        return ResponseEntity.ok(updated);
    }
    @GetMapping("/products/{id}/stock-history")
    public ResponseEntity<List<StockHistory>> getStockHistory(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getStockHistoryForProduct(id));
    }
}
