package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoDto {

    private String formaPagamento;

    private List<PedidoItemDto> itensPedido;
}

//pedido:
//        {
//        "formaPagamento" : "PIX",
//        "itensPedido" : [
//        {
//        "produto" : { "id": 1},
//        "quantidade": 5
//        },
//        ]
//        }