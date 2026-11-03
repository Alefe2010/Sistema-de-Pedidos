import { Produto } from "../entities/produto.js"
import { connection } from "../database/connection.js"
import type { RowDataPacket } from "mysql2";

interface ProdutoRow extends RowDataPacket {
    id: number;
    nome: string;
    preco: number | string;
}

export class ProdutoRepository {
    public async salvar(produto: Produto): Promise<void> {
        await connection.execute(
            `insert into produtos(id, nome, preco) values (?, ?, ?)`, 
            [produto.id, produto.nome, produto.preco]
        )
    }
public async buscarPorId(id: number): Promise<Produto | undefined> {
   const [rows] = await connection.execute<ProdutoRow[]>(
    "select id, nome, preco from produtos where id = ?", [id]
   )
   const row = rows[0]
   return row ? this.criarProduto(row): undefined
}
private criarProduto(row: ProdutoRow): Produto {
    return new Produto(row.id, row.nome, Number(row.preco))
}
public async alterar(produto: Produto): Promise<void> {
    await connection.execute(
        "update produtos set nome = ?, preco = ? where id = ?",
        [produto.nome, produto.preco, produto.id]
    )
}
public async remover(id: number): Promise<void>{
    await connection.execute("delete from produtos where id = ?", [id])
}
public async listaDeProdutos(): Promise<Produto[]> {
    const [rows] = await connection.query<ProdutoRow[]>(
        "select id, nome, preco from produtos"
    )
    
    return rows.map((row) => this.criarProduto(row));
}
}
}
