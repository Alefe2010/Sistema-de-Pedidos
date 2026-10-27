import { PedidoRepository } from "../repositories/pedidoRepository.js";
import { Cliente } from "./cliente.js";
import { ItemPedido } from "./itemPedido.js";
import { Produto } from "./produto.js"
export class Pedido {
    private _itens: ItemPedido[] = [];
    private _status: string 
    constructor( public readonly cliente: Cliente, private numero: number ) {this._status = "ABERTO"}
    public adicionarItem(item: ItemPedido): void {
        this.validarStatus()
        this._itens.push(item);
    }
    public removerItem(idProduto: number): void {
        this.validarStatus()
        
        const indice = this._itens.findIndex(i => i.produto.id === idProduto);
        if (indice === -1) {
            throw new Error(`Produto de código ${idProduto} não foi encontrado no pedido.`);
        }

        this._itens.splice(indice, 1);
    }
    public calcularTotal(): number {
        return this._itens.reduce(
        (total, item) => total + item.subtotal,
        0
        );
    }
    public alterarQtd(idProduto: number, novaQtd: number): void{
        this.validarStatus()
        const item = this._itens.find(i => i.produto.id === idProduto)
        if(!item){
            throw new Error("Produto não encontrado!")
        }
        else if(novaQtd <= 0){
            throw new Error("Quantidade inválida! A quantidade deve ser positiva.")
        }
        item.qtd = novaQtd
    }
    public finalizarPedido(): void{
        if(this._status === "ABERTO"){
            this._status = "FINALIZADO"
        }
        else{
            throw new Error("Apenas pedidos que estiverem com status 'ABERTO' podem ser finalizados")
        }
    }
    public cancelarPedido(): void{
        if(this._status == "ABERTO"){
            this._status = "CANCELADO"
        }
        else{
            throw new Error("Você não pode cancelar um pedido finalizado ou um pedido que já esteja cancelado!")
        }
    }
    get status(): string{
        return this._status
    }
    get itens(): ItemPedido[] {
        return this._itens
    }
    get numeroPedido(): number {
        return this.numero
    }
    private validarStatus(): void{
        if(this._status !== 'ABERTO'){
            throw new Error("Não é possível alterar um pedido que já foi finalizado ou cancelado.");
        }
    }
};
