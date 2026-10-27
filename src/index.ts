import { Cliente } from "./entities/cliente.js";
import { Produto } from "./entities/produto.js";
import { ProdutoRepository } from "./repositories/produtoRepository.js";
import { PedidoService } from "./services/pedidoService.js";
import { PedidoRepository } from "./repositories/pedidoRepository.js";

// =====================================================
// HU01 - Criar pedido e adicionar produtos
// =====================================================
console.log('--- HU01 - Criar pedido e adicionar produtos ---');
try {
    const cliente = new Cliente("Ana");
    const cafe = new Produto(1, "Café", 5);
    const bolo = new Produto(2, "Bolo", 8);
    const suco = new Produto(3, "Suco", 6);

    const pedidoRep = new PedidoRepository();
    const produtoRep = new ProdutoRepository();
    const pedidoService = new PedidoService(produtoRep, pedidoRep);

    pedidoService.salvarProduto(cafe)
    pedidoService.salvarProduto(bolo)
    pedidoService.salvarProduto(suco)
    const pedido = pedidoService.criarPedido(cliente, 1);

    try { pedidoService.adicionarProduto(1, 1, 1); } catch (e) { console.log(`Erro ao adicionar produto 1: ${(e as Error).message}`); }
    try { pedidoService.adicionarProduto(1, 2, 1); } catch (e) { console.log(`Erro ao adicionar produto 2: ${(e as Error).message}`); }
    try { pedidoService.adicionarProduto(1, 3, 1); } catch (e) { console.log(`Erro ao adicionar produto 3: ${(e as Error).message}`); }

    try {
        console.log(`Total do pedido: R$ ${pedido.calcularTotal().toFixed(2)}`);
    } catch (e) {
        console.log(`Erro ao calcular total: ${(e as Error).message}`);
    }

    // =====================================================
    // HU02 - Remover produto do pedido
    // =====================================================
    console.log('\n--- HU02 - Remover produto do pedido ---');
    try {
        pedidoService.removerProduto(1, 2);
    } catch (e) {
        console.log(`Erro ao remover produto: ${(e as Error).message}`);
    }

    try {
        console.log(`Total do pedido: R$ ${pedido.calcularTotal().toFixed(2)}`);
    } catch (e) {
        console.log(`Erro ao calcular total após remoção: ${(e as Error).message}`);
    }

    // =====================================================
    // HU03 - Alterar quantidade de um produto
    // =====================================================
    console.log('\n--- HU03 - Alterar quantidade de um produto ---');
    try {
        
        try { pedidoService.alterarQtd(1, 1, 3); } catch (e) { console.log(`Erro ao alterar quantidade: ${(e as Error).message}`); }
        try { pedidoService.alterarQtd(1, 1, -1); } catch (e) { console.log(`Erro ao alterar quantidade para valor negativo: ${(e as Error).message}`); }
        
        console.log(`Total do pedido: R$ ${pedido.calcularTotal().toFixed(2)}`);
    } catch (e) {
        console.log(`Erro na HU03: ${(e as Error).message}`);
    }

    // =====================================================
    // HU04 - Finalizar pedido
    // =====================================================
    console.log('\n--- HU04 - Finalizar pedido ---');
    try {
        console.log(`O pedido está: ${pedido.status}`);
        pedidoService.finalizarPedido(1);
        console.log(`O pedido está: ${pedido.status}`);

        try { pedidoService.adicionarProduto(1, 3, 2); } catch (e) { console.log(`Erro esperado ao adicionar item em pedido finalizado: ${(e as Error).message}`); }
        try { pedidoService.removerProduto(1, 1); } catch (e) { console.log(`Erro esperado ao remover item de pedido finalizado: ${(e as Error).message}`); }
        try { pedidoService.alterarQtd(1, 3, 5); } catch (e) { console.log(`Erro esperado ao alterar quantidade em pedido finalizado: ${(e as Error).message}`); }
    } catch (e) {
        console.log(`Erro ao finalizar/manipular pedido na HU04: ${(e as Error).message}`);
    }

    // =====================================================
    // HU05 - Cancelar pedido
    // =====================================================
    console.log('\n--- HU05 - Cancelar pedido ---');
    try {
        console.log(`O pedido está: ${pedido.status}`);
        pedidoService.cancelarPedido(2);
        console.log(`O pedido está: ${pedido.status}`);

        try { pedidoService.adicionarProduto(1, 2, 5); } catch (e) { console.log(`Erro esperado ao adicionar item em pedido cancelado: ${(e as Error).message}`); }
        try { pedidoService.removerProduto(1, 1); } catch (e) { console.log(`Erro esperado ao remover item de pedido cancelado: ${(e as Error).message}`); }
        try { pedidoService.alterarQtd(1, 1, 4); } catch (e) { console.log(`Erro esperado ao alterar quantidade em pedido cancelado: ${(e as Error).message}`); }
    } catch (e) {
        console.log(`Erro na HU05: ${(e as Error).message}`);
    }

    // =====================================================
    // HU06 - Cadastrar produtos no cardápio
    // =====================================================
    console.log('\n--- HU06 - Cadastrar produtos no cardápio ---');
    const repoProdutos = new ProdutoRepository();
    const repoPedidos = new PedidoRepository();
    const pedidoService2 = new PedidoService(repoProdutos, repoPedidos);

    const sanduiche = new Produto(4, "Sanduíche", 15);

    try { pedidoService2.salvarProduto(cafe); } catch (e) { console.log(`Erro ao salvar produto: ${(e as Error).message}`); }
    try { pedidoService2.salvarProduto(bolo); } catch (e) { console.log(`Erro ao salvar produto: ${(e as Error).message}`); }
    try { pedidoService2.salvarProduto(suco); } catch (e) { console.log(`Erro ao salvar produto: ${(e as Error).message}`); }
    try { pedidoService2.salvarProduto(sanduiche); } catch (e) { console.log(`Erro ao salvar produto: ${(e as Error).message}`); }

    const torta = new Produto(2, "Torta", 10);
    try { pedidoService2.salvarProduto(torta); } catch (e) { console.log(`Erro esperado ao salvar produto duplicado/existente: ${(e as Error).message}`); }

    try { pedidoService2.obterProduto(2); } catch (e) { console.log(`Erro ao obter produto: ${(e as Error).message}`); }
    try { 
        const cardapio = pedidoService2.listarCardapio() 
        console.log('\n--- Cardápio Cadastrado ---');
        console.table(cardapio);
        ; } catch (e) { 
            console.log(`Erro ao listar cardápio: ${(e as Error).message}`); 
        }

    // =====================================================
    // HU07 - Consultar o cardápio
    // =====================================================
    console.log('\n--- HU07 - Consultar o cardápio ---');
    try { pedidoService2.listarCardapio(); } catch (e) { console.log(`Erro ao listar cardápio: ${(e as Error).message}`); }
    try { pedidoService2.obterProduto(4); } catch (e) { console.log(`Erro ao obter produto: ${(e as Error).message}`); }
    try { pedidoService2.obterProduto(99); } catch (e) { console.log(`Erro esperado ao consultar produto inexistente: ${(e as Error).message}`); }

    // =====================================================
    // HU08 - Registrar pedido usando o cardápio
    // =====================================================
    console.log('\n--- HU08 - Registrar pedido usando o cardápio ---');
    try {
        const ana = new Cliente("Ana");
        pedidoService2.criarPedido(ana, 1);

        try { pedidoService2.adicionarProduto(1, 1, 1); } catch (e) { console.log(`Erro ao adicionar produto: ${(e as Error).message}`); }
        try { pedidoService2.adicionarProduto(1, 2, 1); } catch (e) { console.log(`Erro ao adicionar produto: ${(e as Error).message}`); }
        try { pedidoService2.adicionarProduto(1, 99, 1); } catch (e) { console.log(`Erro esperado ao adicionar produto inexistente: ${(e as Error).message}`); }

        try { pedidoService2.obterPedido(1); } catch (e) { console.log(`Erro ao obter pedido: ${(e as Error).message}`); }
        
        try {
            const ped = repoPedidos.consultarPedido(1);
            console.log(`itens: ${ped?.itens}; total: R$ ${ped?.calcularTotal().toFixed(2)}`);
        } catch (e) {
            console.log(`Erro ao consultar pedido no repositório: ${(e as Error).message}`);
        }

        try { pedidoService2.obterPedido(50); } catch (e) { console.log(`Erro esperado ao obter pedido inexistente: ${(e as Error).message}`); }
        try { pedidoService2.adicionarProduto(50, 2, 1); } catch (e) { console.log(`Erro esperado ao adicionar item em pedido inexistente: ${(e as Error).message}`); }
    } catch (e) {
        console.log(`Erro na HU08: ${(e as Error).message}`);
    }

    // =====================================================
    // HU09 - Acompanhar pedidos por situação
    // =====================================================
    console.log('\n--- HU09 - Acompanhar pedidos por situação ---');
    try {
        const bruno = new Cliente("Bruno");
        const carla = new Cliente("Carla");
        const diego = new Cliente("Diego");

        const pedido2 = pedidoService2.criarPedido(bruno, 2);
        const pedido3 = pedidoService2.criarPedido(carla, 3);
        const pedido4 = pedidoService2.criarPedido(diego, 4);

        try { pedidoService2.adicionarProduto(2, 2, 2); } catch (e) { console.log(`Erro ao adicionar produto: ${(e as Error).message}`); }
        try { pedidoService2.adicionarProduto(3, 4, 1); } catch (e) { console.log(`Erro ao adicionar produto: ${(e as Error).message}`); }
        try { pedidoService2.adicionarProduto(4, 1, 2); } catch (e) { console.log(`Erro ao adicionar produto: ${(e as Error).message}`); }
        try { pedidoService2.adicionarProduto(4, 4, 1); } catch (e) { console.log(`Erro ao adicionar produto: ${(e as Error).message}`); }

        try { pedidoService2.finalizarPedido(1); } catch (e) { console.log(`Erro ao finalizar pedido 1: ${(e as Error).message}`); }
        try { pedidoService2.finalizarPedido(4); } catch (e) { console.log(`Erro ao finalizar pedido 6: ${(e as Error).message}`); }
        try { pedidoService2.cancelarPedido(3); } catch (e) { console.log(`Erro ao cancelar pedido 5: ${(e as Error).message}`); }
    } catch (e) {
        console.log(`Erro na HU09: ${(e as Error).message}`);
    }

    // =====================================================
    // HU10 - Resumo de vendas
    // =====================================================
    console.log('\n--- HU10 - Resumo de vendas ---');
    try {
        const pedRep = new PedidoRepository();
        const prodRep = new ProdutoRepository();
        const pedidoService3 = new PedidoService(prodRep, pedRep);
        
        console.log("\n--- PedidoService 3 ---")
        try { pedidoService3.resumoVendas(); } catch (e) { console.log(`Erro no resumo de vendas (pedidoService3): ${(e as Error).message}`); }

        console.log("\n--- PedidoService 2 ---")
        try { pedidoService2.resumoVendas(); } catch (e) { console.log(`Erro no resumo de vendas (pedidoService2): ${(e as Error).message}`); }
        
        try { pedidoService2.finalizarPedido(2); } catch (e) { console.log(`Erro ao finalizar pedido 2 (pedidoService): ${(e as Error).message}`); }

        console.log("\n--- PedidoService 2 (Após finalizar o pedido de Bruno) ---")
        try { pedidoService2.resumoVendas(); } catch (e) { console.log(`Erro no resumo de vendas (pedidoService2): ${(e as Error).message}`); }
    } catch (e) {
        console.log(`Erro na HU10: ${(e as Error).message}`);
    }

} catch (erroGeral) {
    console.log(`Erro inesperado durante a execução dos testes: ${(erroGeral as Error).message}`);
}