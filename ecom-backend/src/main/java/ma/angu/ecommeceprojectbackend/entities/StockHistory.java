package ma.angu.ecommeceprojectbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int oldQuantity;
    private int newQuantity;

    private LocalDateTime updatedAt;

    @ManyToOne
    private Product product;

    @ManyToOne
    private User updatedBy; // admin
}