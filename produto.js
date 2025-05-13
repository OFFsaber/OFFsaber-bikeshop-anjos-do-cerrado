// Array de ofertas: id do produto e % de desconto
const ofertas = [
  { id: 1, desconto: 5 }
];

const svgCarrinho = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2b80ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M5 6h2l1.68 9.39a2 2 0 0 0 2 1.61h6.72a2 2 0 0 0 2-1.61L21 8H7.42"/></svg>`;

window.produtos = [
    {
      id: 1,
      nome: "Bike aro 29 South",
      descricao: "Bike em perfeito estado,aro 29, quadro de alumino,freios hidraulicos,suspenção dianteira com trava no guidao,12v passador gts.",
      preco: 2000.00,
      imagens: ["imagens/bikesamuel.jpg", "imagens/bikesamuel1.jpg", "imagens/bikesamuel2.jpg"],
      video: "https://www.youtube.com/embed/McXWc4ZUjK0",
      detalhes: "Bike em perfeito estado,aro 29, quadro de alumino,freios hidraulicos,suspenção dianteira com trava no guidao,12v passador gts. aceito pix dinheiro e parcelo no cartão com acrescimo da maquina.",
      telefone: "62993013054"
    }
  ];
  
  // Renderizar Ofertas em Destaque
  const ofertasDiv = document.querySelector('.oferta-cards');
  ofertasDiv.innerHTML = ofertas.map(oferta => {
    const prod = produtos.find(p => p.id === oferta.id);
    const precoDesconto = (prod.preco * (1 - oferta.desconto / 100)).toFixed(2);
    return `
      <div class="oferta-card">
        <span class="oferta-label">-${oferta.desconto}%</span>
        <img src="${prod.imagens[0]}" alt="${prod.nome}" loading="lazy">
        <p style="margin:8px 0 2px 0;">
          <span style='color:#ff3c3c;text-decoration:line-through;font-size:1em;margin-right:8px;'>R$ ${prod.preco.toFixed(2)}</span>
          <span style='color:#222;font-size:1.18em;font-weight:700;'>R$ ${precoDesconto}</span>
        </p>
        <div style="font-size:1.05em;margin-bottom:4px;">${prod.nome}</div>
        <button class="btn-whatsapp" style="background:#25d366;color:#fff;font-weight:500;display:flex;align-items:center;gap:6px;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-size:1em;transition:background .2s;margin-top:8px;" onclick="abrirModalCompra(${prod.id}, ${precoDesconto})">
          <span style="font-size:1.2em;">💬</span> Comprar agora
        </button>
      </div>
    `;
  }).join('');
  
  // Renderizar Catálogo de Produtos
  const produtosGrid = document.getElementById('produtosGrid');
  produtos.forEach(prod => {
    const card = document.createElement('div');
    card.className = "produto-card";
    card.innerHTML = `
      <img src="${prod.imagens[0]}" alt="${prod.nome}" loading="lazy">
      <div class="produto-info">
        <h4>${prod.nome}</h4>
        <p>${prod.descricao}</p>
        <strong>R$ ${prod.preco.toFixed(2)}</strong>
      </div>
      <div style="margin-top:8px;">
        <button class="btn-whatsapp" style="background:#25d366;color:#fff;font-weight:500;display:flex;align-items:center;gap:6px;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-size:1em;transition:background .2s;width:100%;" onclick="event.stopPropagation(); abrirModalProduto(${prod.id})">
          <span style="font-size:1.2em;">💬</span> Mais informações
        </button>
      </div>
    `;
    card.style.cursor = 'pointer';
    card.onclick = () => abrirDetalhes(prod.id);
    produtosGrid.appendChild(card);
  });
  
  // Função abrir detalhes
  function abrirDetalhes(id) {
    const url = new URL('detalhe.html', window.location.href);
    url.searchParams.set('id', id);
    window.open(url, '_blank');
  }

  window.abrirDetalhes = abrirDetalhes;

  // Modal de compra: recebe preço promocional opcional
  function abrirModalCompra(id, precoPromocional) {
    const prod = produtos.find(p=>p.id === id);
    const preco = precoPromocional ? Number(precoPromocional) : prod.preco;
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
    modal.innerHTML = `
      <div style="background:#fff;padding:36px 28px 28px 28px;border-radius:18px;max-width:420px;width:100%;box-shadow:0 8px 32px #0002, 0 1.5px 8px #bbb;position:relative;animation:modalShow .3s;">
        <button onclick="document.getElementById('modalCompra').remove()" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:2em;cursor:pointer;color:#bbb;transition:color .2s;">&times;</button>
        <h2 style='margin-bottom:18px;text-align:center;font-size:1.5em;color:#2b80ff;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:8px;'><span style='font-size:1.2em;'>🛍️</span> Finalizar compra</h2>
        <div style='margin-bottom:18px;border-bottom:1.5px solid #f0f0f0;padding-bottom:10px;display:flex;align-items:center;gap:12px;'>
          <img src="${prod.imagens[0]}" alt="${prod.nome}" style="width:38px;height:38px;object-fit:cover;border-radius:8px;border:1.5px solid #eee;">
          <div style='flex:1;'>${prod.nome}</div>
          <div style='font-weight:500;color:#2b80ff;'>R$ ${preco.toFixed(2)}</div>
        </div>
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
    modal.querySelector('#formCompra').onsubmit = function(e) {
      e.preventDefault();
      const pagamento = this.pagamento.value;
      const entrega = this.entrega.value;
      const endereco = this.endereco ? this.endereco.value : '';
      let mensagem = `Olá, tudo bem? Quero comprar o produto ${prod.nome}, preço R$ ${preco.toFixed(2)}. A forma de pagamento será ${pagamento}.`;
      if (entrega === 'Retirar na loja') {
        mensagem += ' Eu irei retirar na loja.';
      } else {
        mensagem += ` Por gentileza, entregue neste local: ${endereco}`;
      }
      const url = `https://wa.me/5562993567625?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      document.getElementById('modalCompra').remove();
    };
  }

  window.abrirModalCompra = abrirModalCompra;

  function abrirModalProduto(id) {
    const prod = produtos.find(p => p.id === id);
    if (!prod) return;

    let modal = document.getElementById('modalProduto');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalProduto';
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

    const mensagem = `Olá! Gostaria de mais informações sobre o produto: ${prod.nome}`;
    const whatsappUrl = `https://wa.me/${prod.telefone}?text=${encodeURIComponent(mensagem)}`;

    modal.innerHTML = `
      <div style="background:#fff;padding:36px 28px 28px 28px;border-radius:18px;max-width:420px;width:100%;box-shadow:0 8px 32px #0002, 0 1.5px 8px #bbb;position:relative;animation:modalShow .3s;">
        <button onclick="document.getElementById('modalProduto').remove()" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:2em;cursor:pointer;color:#bbb;transition:color .2s;">&times;</button>
        <h2 style='margin-bottom:18px;text-align:center;font-size:1.5em;color:#2b80ff;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:8px;'><span style='font-size:1.2em;'>ℹ️</span> Informações do Produto</h2>
        <div style='margin-bottom:18px;border-bottom:1.5px solid #f0f0f0;padding-bottom:10px;display:flex;align-items:center;gap:12px;'>
          <img src="${prod.imagens[0]}" alt="${prod.nome}" style="width:38px;height:38px;object-fit:cover;border-radius:8px;border:1.5px solid #eee;">
          <div style='flex:1;'>${prod.nome}</div>
          <div style='font-weight:500;color:#2b80ff;'>R$ ${prod.preco.toFixed(2)}</div>
        </div>
        <p style="margin-bottom:20px;color:#666;">${prod.detalhes}</p>
        <a href="${whatsappUrl}" target="_blank" style="text-decoration:none;">
          <button style="background:#25d366;color:#fff;font-weight:500;display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border:none;border-radius:8px;cursor:pointer;font-size:1.1em;width:100%;transition:background .2s;">
            <span style="font-size:1.2em;">💬</span> Falar no WhatsApp
          </button>
        </a>
      </div>
      <style>@keyframes modalShow{from{transform:scale(0.95) translateY(40px);opacity:0;}to{transform:scale(1) translateY(0);opacity:1;}}</style>
    `;
  }