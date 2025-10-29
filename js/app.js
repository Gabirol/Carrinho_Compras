// Lista que vai receber o produto, a quantidade e o valor selecionado pelo usuário
let carItems = [];

// Essa função vai separar o valor selecionado em duas variaveis com a ajuda do .split, nomeProduto e precoUnit
function produtos() {
    const select = document.getElementById('produto');
    const produtoSelecionado = select.value;

    // Com o "split" eu indiquei que o simbolo " - " seria retirado e os valores entre eles virariam as variaveis em questão
    const [nomeProduto, precoProduto] = produtoSelecionado.split(' - ');
    // Com o "replace", eu substitui os R$ da variavel precoUnit por um espaço em branco e transformei a variavel em numerica com "Number"
    const precoUnit = Number(precoProduto.replace('R$', '').trim());
    return [nomeProduto, precoUnit];
}

// Foi criada apenas para pegar o valor colocado no input de quantidade
function obterQuantidade() {
    const quantidade = document.getElementById('quantidade').value;
    return Number(quantidade);
}

// Nesta função, fiz uma variavel que ira validar se o nome é igual, se for igual, ele vai apenas somar a quantidade e preço a lista
function adicionarOuAtualizar(nome, preco, quantidade) {
    const existente = carItems.find(item => item.nome === nome);

    // Se o nome for igual, adiciona a quantidade e o preço a lista, caso não, apenas adicione na lista todos os valores.
    if (existente) {
        existente.qtd += quantidade;
        existente.preco += preco * quantidade;
    } else {
        carItems.push({  nome, preco: preco * quantidade, qtd: quantidade });
    }
}

// Ele ira atualizar a lista de produtos, adicionando um novo DOM dentro da lista de produtos.
function atualizarCarrinho() {
    const lista = document.getElementById('lista-produtos');
    lista.innerHTML = '';

    carItems.forEach(item => {
        const produtoEl = document.createElement('section');
        produtoEl.classList.add("carrinho__produtos__produto");
        produtoEl.innerHTML = `<br><span class="texto-azul">${item.qtd}x</span> ${item.nome} <span class="texto-azul">R$${item.preco}</span>`;
        lista.appendChild(produtoEl);
    });
}

// Nesta função ele vai somar o valor total do preço dentro da lista, para trazer o valor total da compra.
function calcularTotal() {
    const total = carItems.reduce((acc, p) => acc + p.preco, 0);
    document.getElementById('valor-total').textContent = `R$${total}`;
    return total;

}

// Essa função vai receber todas as demais funções pois ela esta configurada no botão dentro do html.
function adicionar() {
    //Coloquei os valores retornados nas funções de produto e obterQuantidade para poder usar em adicionarOuAtualizar
    const [nomeProduto, precoUnit] = produtos();
    const quantidade = obterQuantidade();

    adicionarOuAtualizar(nomeProduto, precoUnit, quantidade);
    atualizarCarrinho();
    calcularTotal();

}

// Limpa os intes na lista e dentro do carrinho de produtos que fica na tela para o usuario.
function limpar() {
    document.getElementById('lista-produtos').innerHTML = '';
    carItems = [];
    atualizarCarrinho();
    calcularTotal();
}
