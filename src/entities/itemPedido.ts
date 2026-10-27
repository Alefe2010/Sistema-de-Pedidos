import {Produto} from "./produto.js";

export class ItemPedido {
    private _qtd: number
    private _produto: Produto

    constructor(qtd: number, produto: Produto){
        this._qtd = qtd
        this._produto = produto
    }
    get produto(): Produto{
        return this._produto
    }
    get qtd(): number{
        return this._qtd
    }
    //métodos setters nunca retornam nenhum valor!
    set qtd(valor: number){
        this._qtd = valor
    }
    get subtotal(): number{
        return this._qtd * this._produto.preco 
    }
    toString(): string{
        return (`Foram compradas ${this.qtd} unidades, de ${this.produto.nome}. Resultando em um subtotal de ${(this.subtotal).toFixed(2)} reais.`)
    }
}
