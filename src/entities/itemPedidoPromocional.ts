import {ItemPedido} from "./itemPedido.js";
import {Produto} from "./produto.js";

export class itemPedidoPromocional extends ItemPedido{
    private _desconto: number
    constructor(qtd: number, produto: Produto, desconto: number = 0.1){
        super(qtd, produto)
        this._desconto = desconto
    }
    override get subtotal(): number{
        return super.subtotal * (1 - this._desconto)
    }
    toString(): string{
        const porcentagem = (this._desconto * 100).toFixed(0);
        return `${super.toString()} [Com ${porcentagem}% de desconto aplicado, o produto partiu do subtotal de R$ ${this.subtotal.toFixed(2)} para -> Subtotal Promocional: R$ ${this.subtotal.toFixed(2)}]`;
    }
}

