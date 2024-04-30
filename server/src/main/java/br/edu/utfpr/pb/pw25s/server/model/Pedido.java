package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.dto.PedidoItemDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

// @Entity
//...
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Pedido {

    @Id
    private long id;

    private String formaPagamento;

    private LocalDateTime data;
    //@ManyToOne
    private User usuario;

}
