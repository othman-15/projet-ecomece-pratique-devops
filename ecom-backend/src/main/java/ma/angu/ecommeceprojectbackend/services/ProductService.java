package ma.angu.ecommeceprojectbackend.services;

import lombok.RequiredArgsConstructor;
import ma.angu.ecommeceprojectbackend.entities.Product;
import ma.angu.ecommeceprojectbackend.entities.StockHistory;
import ma.angu.ecommeceprojectbackend.entities.User;
import ma.angu.ecommeceprojectbackend.repository.ProductRepositor;
import ma.angu.ecommeceprojectbackend.repository.StockHistoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepositor productRepository;
    private final StockHistoryRepository stockHistoryRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getbyid(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // ✅ Nouvelle méthode pour mettre à jour le stock et enregistrer l'historique
    public Product updateProductStock(Long productId, int newQuantity, User adminUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        int oldQuantity = product.getQuantity();
        product.setQuantity(newQuantity);
        Product updated = productRepository.save(product);

        StockHistory history = StockHistory.builder()
                .oldQuantity(oldQuantity)
                .newQuantity(newQuantity)
                .updatedAt(LocalDateTime.now())
                .product(updated)
                .updatedBy(adminUser)
                .build();

        stockHistoryRepository.save(history);

        return updated;
    }

    // Pour consulter l’historique d’un produit (optionnel)
    public List<StockHistory> getStockHistoryForProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        return stockHistoryRepository.findByProduct(product);
    }
}
