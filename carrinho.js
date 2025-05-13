class Carrinho {
  constructor() {
    this.items = [];
    this.total = 0;
    this.init();
  }

  init() {
    this.carrinhoBtn = document.getElementById('carrinhoBtn');
    this.carrinhoModal = document.getElementById('carrinhoModal');
    this.listaCarrinho = document.getElementById('listaCarrinho');
    this.carrinhoQtd = document.getElementById('carrinhoQtd');
    this.whatsappBtn = document.getElementById('whatsappBtn');
    this.fecharCarrinho = document.getElementById('fecharCarrinho');
    this.finalizarBtn = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.carrinhoBtn.addEventListener('click', () => this.abrirCarrinho());
    this.fecharCarrinho.addEventListener('click', () => this.fecharModal());
    // Remover evento antigo do WhatsApp
    this.whatsappBtn.style.display = 'none';
    // Adiciona botão finalizar compra
    if (!document.getElementById('finalizarCompraBtn')) {
      this.finalizarBtn = document.createElement('button');
      this.finalizarBtn.id = 'finalizarCompraBtn';
      this.finalizarBtn.className = 'btn-finalizar';
      this.finalizarBtn.innerHTML = '<span style="font-size:1.2em;">💳</span> Finalizar compra';
      this.finalizarBtn.style = 'background:#2b80ff;color:#fff;padding:10px 18px;border:none;border-radius:6px;font-weight:500;width:100%;font-size:1.1em;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px;cursor:pointer;transition:background .2s;';
      this.finalizarBtn.onclick = () => this.finalizarCompra();
      this.carrinhoModal.querySelector('.modal-actions').appendChild(this.finalizarBtn);
    }
  }

  adicionarItem(produto) {
    const itemExistente = this.items.find(item => item.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.items.push({
        ...produto,
        quantidade: 1
      });
    }
    this.atualizarCarrinho();
    this.mostrarNotificacao('Produto adicionado ao carrinho!');
  }

  removerItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.atualizarCarrinho();
  }

  alterarQuantidade(id, delta) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantidade += delta;
      if (item.quantidade <= 0) {
        this.removerItem(id);
      } else {
        this.atualizarCarrinho();
      }
    }
  }

  atualizarCarrinho() {
    this.total = this.items.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    this.carrinhoQtd.textContent = this.items.reduce((acc, item) => acc + item.quantidade, 0);
    this.atualizarLista();
  }

  atualizarLista() {
    this.listaCarrinho.innerHTML = this.items.map(item => `
      <li class="carrinho-item" style="display:flex;align-items:center;gap:10px;">
        <img src="${item.imagem}" alt="${item.nome}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;">
        <span style="flex:1;">${item.nome}<br><small>R$ ${(item.preco * item.quantidade).toFixed(2)}</small></span>
        <button onclick="carrinho.alterarQuantidade(${item.id},-1)" style="background:#eee;border:none;border-radius:50%;width:28px;height:28px;font-size:1.2em;cursor:pointer;">-</button>
        <span>${item.quantidade}</span>
        <button onclick="carrinho.alterarQuantidade(${item.id},1)" style="background:#eee;border:none;border-radius:50%;width:28px;height:28px;font-size:1.2em;cursor:pointer;">+</button>
        <button onclick="carrinho.removerItem(${item.id})" style="background:#ff3c3c;border:none;border-radius:50%;width:28px;height:28px;font-size:1.2em;color:#fff;cursor:pointer;">×</button>
      </li>
    `).join('');
    if (this.items.length === 0) {
      this.listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio</li>';
      if (this.finalizarBtn) this.finalizarBtn.style.display = 'none';
    } else {
      if (this.finalizarBtn) this.finalizarBtn.style.display = 'block';
    }
  }

  abrirCarrinho() {
    this.carrinhoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.atualizarCarrinho();
  }

  fecharModal() {
    this.carrinhoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  finalizarCompra() {
    if (this.items.length === 0) return;
    // Montar modal igual ao de produto, mas com todos os itens
    let modal = document.getElementById('modalCompra');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalCompra';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.45)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '9999';
      document.body.appendChild(modal);
    }
    const listaProdutos = this.items.map(item => `
      <div style='display:flex;align-items:center;gap:12px;margin-bottom:8px;'>
        <img src="${item.imagem}" alt="${item.nome}" style="width:38px;height:38px;object-fit:cover;border-radius:8px;border:1.5px solid #eee;">
        <div style='flex:1;'>${item.nome} <span style='color:#888;font-size:0.95em;'>(x${item.quantidade})</span></div>
        <div style='font-weight:500;color:#2b80ff;'>R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
      </div>
    `).join('');
    modal.innerHTML = `
      <div style="background:#fff;padding:36px 28px 28px 28px;border-radius:18px;max-width:420px;width:100%;box-shadow:0 8px 32px #0002, 0 1.5px 8px #bbb;position:relative;animation:modalShow .3s;">
        <button onclick="document.getElementById('modalCompra').remove()" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:2em;cursor:pointer;color:#bbb;transition:color .2s;">&times;</button>
        <h2 style='margin-bottom:18px;text-align:center;font-size:1.5em;color:#2b80ff;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:8px;'><span style='font-size:1.2em;'>🛍️</span> Finalizar compra</h2>
        <div style='margin-bottom:18px;border-bottom:1.5px solid #f0f0f0;padding-bottom:10px;'>${listaProdutos}<div style='text-align:right;font-size:1.1em;margin-top:8px;'><b>Total: R$ ${this.total.toFixed(2)}</b></div></div>
        <form id="formCompra">
          <div style='margin-bottom:14px;'>
            <label style='font-weight:500;color:#333;'>Forma de pagamento:</label><br>
            <select name="pagamento" required style="width:100%;margin-top:4px;padding:12px 10px;border-radius:16px;border:2px solid #2b80ff;background:#f4faff;font-size:1.08em;box-shadow:0 2px 8px #e0eaff;outline:none;transition:border .2s;">
              <option value="Cartão de crédito">💳 Cartão de crédito</option>
              <option value="Cartão de débito">🏧 Cartão de débito</option>
              <option value="Dinheiro">💵 Dinheiro</option>
              <option value="Pix">🔑 Pix</option>
            </select>
          </div>
          <div style='margin-bottom:14px;'>
            <label style='font-weight:500;color:#333;'>Entrega:</label><br>
            <label style='margin-right:12px;'><input type="radio" name="entrega" value="Retirar na loja" checked> Retirar na loja</label>
            <label><input type="radio" name="entrega" value="Entregar"> Entregar</label>
          </div>
          <div id="campoEndereco" style="display:none;margin-bottom:14px;">
            <input type="text" name="endereco" placeholder="Digite o endereço completo" style="width:100%;padding:10px 8px;border-radius:7px;border:1.5px solid #e0e0e0;font-size:1em;">
          </div>
          <button type="submit" style="margin-top:10px;background:#25d366;color:#fff;padding:14px 0;border:none;border-radius:8px;font-weight:600;width:100%;font-size:1.15em;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 2px 8px #e0ffe0;transition:background .2s;">
            <span style="font-size:1.3em;">💬</span> Enviar pedido pelo WhatsApp
          </button>
        </form>
      </div>
      <style>@keyframes modalShow{from{transform:scale(0.95) translateY(40px);opacity:0;}to{transform:scale(1) translateY(0);opacity:1;}}</style>
    `;
    document.body.appendChild(modal);
    // Mostrar campo endereço se for entrega
    const entregaRadios = modal.querySelectorAll('input[name="entrega"]');
    entregaRadios.forEach(radio => {
      radio.onchange = function() {
        modal.querySelector('#campoEndereco').style.display = this.value === 'Entregar' ? 'block' : 'none';
      };
    });
    // Envio do formulário
    modal.querySelector('#formCompra').onsubmit = (e) => {
      e.preventDefault();
      const pagamento = modal.querySelector('select[name="pagamento"]').value;
      const entrega = modal.querySelector('input[name="entrega"]:checked').value;
      const endereco = modal.querySelector('input[name="endereco"]') ? modal.querySelector('input[name="endereco"]').value : '';
      let mensagem = `Olá, tudo bem? Quero comprar:\n`;
      this.items.forEach(item => {
        mensagem += `- ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
      });
      mensagem += `Total: R$ ${this.total.toFixed(2)}.\nForma de pagamento: ${pagamento}.`;
      if (entrega === 'Retirar na loja') {
        mensagem += ' Irei retirar na loja.';
      } else {
        mensagem += ` Por gentileza, entregue neste local: ${endereco}`;
      }
      const url = `https://wa.me/5562993567625?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      document.getElementById('modalCompra').remove();
      this.fecharModal();
    };
  }

  mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    setTimeout(() => {
      notificacao.remove();
    }, 3000);
  }
}

// Inicializar carrinho
const carrinho = new Carrinho();

// Função global para adicionar ao carrinho
function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (produto) {
    carrinho.adicionarItem(produto);
  }
}

window.carrinho = carrinho;