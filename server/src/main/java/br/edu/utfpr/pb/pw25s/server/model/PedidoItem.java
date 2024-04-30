package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.dto.ProductDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

// @Entity
// demais campos
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoItem {

    @Id
    private Long id;

    private Integer quantidade;

    private BigDecimal valorPago;

    //@ManyToOne
    private Product produto;

    //@ManyToOne
    //@JoinColumn(name = "pedido_id")
    private  Pedido pedido;
}
