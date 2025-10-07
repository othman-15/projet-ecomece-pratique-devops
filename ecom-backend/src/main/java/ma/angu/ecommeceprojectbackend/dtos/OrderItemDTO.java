package ma.angu.ecommeceprojectbackend.dtos;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long productId;
    private int quantity;
    private String selectedColor;
}
