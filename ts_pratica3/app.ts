interface Produto {
  modelo: string;
  fabricante: string;
  valor: number;
}

interface TV extends Produto {
  resolucao: string;
  tamanhoPolegadas: number;
}

interface Celular extends Produto {
  memoria: string;
}

interface Bicicleta extends Produto {
  tamanhoAro: string;
}

type ProdutoCompleto = TV | Celular | Bicicleta;

const carrinho: ProdutoCompleto[] = [];

const form = document.getElementById('form-produto') as HTMLFormElement;
const tipoSelect = document.getElementById('tipo') as HTMLSelectElement;

tipoSelect.addEventListener('change', atualizarCamposExtras);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const tipo = tipoSelect.value;
  const modelo = (document.getElementById('modelo') as HTMLInputElement).value.trim();
  const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value.trim();
  const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value.trim().replace(',', '.'));

  let novoProduto: ProdutoCompleto;

  switch (tipo) {
    case 'tv':
      const resolucao = (document.getElementById('resolucao') as HTMLInputElement).value.trim();
      const polegadas = parseInt((document.getElementById('polegadas') as HTMLInputElement).value.trim());
      if (!resolucao || isNaN(polegadas)) {
        alert('Preencha resolução e tamanho em polegadas da TV.');
        return;
      }
      novoProduto = { modelo, fabricante, valor, resolucao, tamanhoPolegadas: polegadas };
      break;

    case 'celular':
      const memoria = (document.getElementById('memoria') as HTMLInputElement).value.trim();
      if (!memoria) {
        alert('Preencha a memória do celular.');
        return;
      }
      novoProduto = { modelo, fabricante, valor, memoria };
      break;

    case 'bicicleta':
      const aro = (document.getElementById('aro') as HTMLInputElement).value.trim();
      if (!aro) {
        alert('Preencha o tamanho do aro da bicicleta.');
        return;
      }
      novoProduto = { modelo, fabricante, valor, tamanhoAro: aro };
      break;

    default:
      return;
  }

  carrinho.push(novoProduto);
  atualizarTela();
  form.reset();
  atualizarCamposExtras(); // limpa os campos visíveis
});

function atualizarTela() {
  const lista = document.getElementById('lista-produtos')!;
  const total = document.getElementById('total')!;

  lista.innerHTML = '';
  let soma = 0;

  carrinho.forEach((p) => {
    const li = document.createElement('li');
    let texto = `${p.modelo} - ${p.fabricante} - R$ ${p.valor.toFixed(2)}`;

    if ('resolucao' in p && 'tamanhoPolegadas' in p) {
      texto += ` - Resolução: ${p.resolucao} - ${p.tamanhoPolegadas}"`;
    } else if ('memoria' in p) {
      texto += ` - Memória: ${p.memoria}`;
    } else if ('tamanhoAro' in p) {
      texto += ` - Aro: ${p.tamanhoAro}`;
    }

    li.textContent = texto;
    lista.appendChild(li);
    soma += p.valor;
  });

  total.textContent = soma.toFixed(2);
}

function atualizarCamposExtras() {
  const tipo = tipoSelect.value;

  const grupoTV = document.getElementById('campos-tv')!;
  const grupoCelular = document.getElementById('campos-celular')!;
  const grupoBicicleta = document.getElementById('campos-bicicleta')!;

  grupoTV.style.display = 'none';
  grupoCelular.style.display = 'none';
  grupoBicicleta.style.display = 'none';

  if (tipo === 'tv') grupoTV.style.display = 'block';
  else if (tipo === 'celular') grupoCelular.style.display = 'block';
  else if (tipo === 'bicicleta') grupoBicicleta.style.display = 'block';
}
