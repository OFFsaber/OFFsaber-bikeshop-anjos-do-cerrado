// Lista de produtos do catálogo
const produtos = [
  {
    id: 1,
    nome: "Creatina Monohidratada",
    preco: 89.90,
    imagem: "imagens/creatina.jpg"
  },
  {
    id: 2,
    nome: "Glutamina 300g",
    preco: 69.90,
    imagem: "imagens/glutamina.jpg"
  },
  {
    id: 3,
    nome: "Albumina 500g",
    preco: 39.90,
    imagem: "imagens/albumina.jpg"
  }
];

// Renderização dos produtos no grid
function renderizarProdutos() {
  const grid = document.getElementById('produtosGrid');
  grid.innerHTML = produtos.map(produto => `
    <div class="produto-card">
      <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
      <div class="produto-info">
        <h4>${produto.nome}</h4>
        <p><b>R$ ${produto.preco.toFixed(2)}</b></p>
      </div>
      <button class="btn btn-primary" onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderizarProdutos); 