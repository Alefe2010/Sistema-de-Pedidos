import { Produto } from "../entities/produto.js"
import { connection } from "../database/connection.js"

export class ProdutoRepository {
    public async salvar(produto: Produto): Promise<void> {
        await connection.execute(
            `insert into produtos(id, nome, preco) values (?, ?, ?)`, 
            [produto.id, produto.nome, produto.preco]
        )
    }
    public buscarPorId(id: number): Produto | undefined {
        return this.produtos.find(produto => produto.id === id)
    }
    get listaDeProdutos(): Produto[] {
        return this.produtos
    }
}