import { Pedido } from "../entities/pedido.js"

export class PedidoRepository {
    private pedidos: Pedido[] = []

    public registrarPedido(pedido: Pedido): void {
        this.pedidos.push(pedido)
    }

    public consultarPedido(numero: number): Pedido | undefined{
        const pedido = this.pedidos.find(p => p.numeroPedido === numero)
        if(!pedido){
            throw new Error("Este pedido não foi cadastrado!")
        }
        return pedido
    }
    public pedidosFinalizados(): Pedido[]{
        const pedidosF = this.pedidos.filter((pedido) => pedido.status === "FINALIZADO")
        return pedidosF
    }
}