package ma.angu.ecommeceprojectbackend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {
    private List<OrderItemDTO> items;
    private double shipping;
    private String promoCode;
}