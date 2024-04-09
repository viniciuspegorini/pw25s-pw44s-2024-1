package br.edu.utfpr.pb.pw25s.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {

    private int id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    private String description;

    private BigDecimal price;

    private CategoryDto category;

}
