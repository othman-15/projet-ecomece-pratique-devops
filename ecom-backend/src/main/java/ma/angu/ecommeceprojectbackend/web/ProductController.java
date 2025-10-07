package ma.angu.ecommeceprojectbackend.web;

import ma.angu.ecommeceprojectbackend.entities.Product;
import ma.angu.ecommeceprojectbackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:8086")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(path="/api/products")
    public List<Product> getProducts() {
        System.out.println(">>> API getAllProducts appelée !");

        return productService.getAll();
    }
    @GetMapping(path="/api/products/{id}")
    public Product getByid(@PathVariable  Long id) {

        return productService.getbyid(id);
    }

    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.save(product);
    }


}
