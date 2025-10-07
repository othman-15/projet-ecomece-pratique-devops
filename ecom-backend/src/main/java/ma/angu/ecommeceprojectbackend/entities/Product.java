package ma.angu.ecommeceprojectbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    private String productTitle;
    private Double productPrice;
    private String category;
    private int quantity;
    private String image;
    private boolean favorite;
    private int stockAlertThreshold = 5;
    @ElementCollection
    private List<String> colors;
    @Transient
    private String selectedColor;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<StockHistory> stockHistories;
}