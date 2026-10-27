import { Cliente } from "../entities/cliente.js";
import { Produto } from "../entities/produto.js";
import { Pedido } from "../entities/pedido.js"
import { ItemPedido } from "../entities/itemPedido.js";
import type { ProdutoRepository } from "../repositories/produtoRepository.js";
import type { PedidoRepository } from "../repositories/pedidoRepository.js";

export class PedidoService {
    constructor(
        private produtoRepository: ProdutoRepository,
        private pedidoRepository: PedidoRepository
    ) {}
    public criarPedido(cliente: Cliente, numero: number): Pedido {
       const pedido = new Pedido(cliente, numero);
       this.pedidoRepository.registrarPedido(pedido);
       return pedido;
    }
    public adicionarProduto(
        numeroPedido: number,
        idProduto: number,
        quantidade: number
    ): void {
        const pedido = this.pedidoRepository.consultarPedido(numeroPedido);
        if(!pedido){ 
            throw new Error(`Pedido ${numeroPedido} não encontrado!`);
        }
        if (pedido.status !== "ABERTO") {
            throw new Error("Não é possível alterar um pedido que já foi finalizado ou cancelado.");
        }
        const produto = this.produtoRepository.buscarPorId(idProduto);
        if (!produto){
            throw new Error(`Produto ${idProduto} não encontrado!`);
        }
        const item = new ItemPedido(quantidade, produto);
        pedido.adicionarItem(item);

    }
    public salvarProduto(produto: Produto): void{
        this.produtoRepository.salvar(produto);
    }
    public obterProduto(id: number): Produto {
        const produto = this.produtoRepository.buscarPorId(id);

        if(!produto){
            throw new Error("Produto não encontrado!");
        }
        return produto
    }
    public obterPedido(numero: number): Pedido | undefined {
        return this.pedidoRepository.consultarPedido(numero)
    }
    public listarCardapio(): Produto[] {
        return this.produtoRepository.listaDeProdutos;
    }
    public removerProduto(numero: number, idProduto: number): void {
        const pedido = this.pedidoRepository.consultarPedido(numero);
        pedido?.removerItem(idProduto);
    }
    public alterarQtd(numero: number, idProduto: number, novaQtd: number): void{
        const pedido = this.pedidoRepository.consultarPedido(numero);
        pedido?.alterarQtd(idProduto, novaQtd);
    }
    public finalizarPedido(numero: number): void{
        const pedido = this.pedidoRepository.consultarPedido(numero);
        pedido?.finalizarPedido();
    }
    public cancelarPedido(numero: number): void{
        const pedido = this.pedidoRepository.consultarPedido(numero);
        pedido?.cancelarPedido();

    }
    public resumoVendas(): void {
        const finalizados = this.pedidoRepository.pedidosFinalizados()
        const totalVendido = finalizados.reduce((t, pedido) => t + pedido.calcularTotal(), 0) 
        let ticketMedio = 0
        const quantidadeVendas = finalizados.length
        
        if (quantidadeVendas > 0) {
            ticketMedio = totalVendido / quantidadeVendas;
        }

        console.log(`Pedidos vendidos: ${finalizados.length}`)
        console.log(`Total vendido: R$ ${totalVendido.toFixed(2)}`)
        console.log(`Ticket médio: R$ ${ticketMedio}`)
    }
}