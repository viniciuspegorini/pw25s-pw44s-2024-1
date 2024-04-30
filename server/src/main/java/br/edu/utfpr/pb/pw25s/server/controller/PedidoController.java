package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.PedidoDto;
import br.edu.utfpr.pb.pw25s.server.dto.PedidoItemDto;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.model.PedidoItem;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class PedidoController {
//    pedido:
//    {
//        "formaPagamento" : "PIX",
//            "itensPedido" : [
//        {
//            "produto" : { "id": 1},
//            "quantidade": 5
//        },
//        {
//            "produto" : { "id": 3},
//            "quantidade": 7
//        },
//	]
//    }
    @PostMapping
    public ResponseEntity salvarPedido(@RequestBody PedidoDto pedidoDto) {
        // isso retorna o username
        SecurityContextHolder.getContext().getAuthentication().getName();

        Pedido pedido = new Pedido();
        // pedido.setUsuario(); // vai vir do contextHolder
        // pedido.setData(); // pega a data do sistema
        pedido.setFormaPagamento( pedidoDto.getFormaPagamento() ); // ENUM

        //serviceDePedido.salvar(pedido);

        for(PedidoItemDto pedidoItemDto : pedidoDto.getItensPedido()) {
            PedidoItem pedidoItem = new PedidoItem();
            pedidoItem.setPedido( pedido );
//            pedidoItem.setProduto( buscarOIdDoProdutoEMontarOObjeto );
//            pedidoItem.setValorPago( buscarOValorNoProduto);
//            pedidoItem.setQuantidade( pedidoItemDto.getQuantidade() );
//
//            pedidoItemService.salvar(pedidoItem);
        }
        return null;

    }


    @GetMapping
    public ResponseEntity listarPedidosDoUsuarioAutenticado() {
        //SecurityContextHolder.getContext().getAuthentication().getName();
        //serviceDePedido.findByUsuarioQueEstaAutenticado
        //return ListaDosPedidosDoUsuario
        return null;
    }
}
