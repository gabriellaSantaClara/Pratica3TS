interface Produto {
  modelo: string;
  fabricante: string;
  valor: number;
}

class TV implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public resolucao: string
  ) {}
}

class Celular implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public memoria: string
  ) {}
}

class Bicicleta implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public tamanhoAro: string
  ) {}
}

class Carrinho<T extends Produto> {
  private itens: T[] = [];

  adicionar(item: T) {
    this.itens.push(item);
  }

  getTotal(): number {
    return this.itens.reduce((soma, item) => soma + item.valor, 0);
  }

  getItens(): T[] {
    return this.itens;
  }
}

const carrinho = new Carrinho<Produto>();

const form = document.getElementById('form-produto') as HTMLFormElement;
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
  const modelo = (document.getElementById('modelo') as HTMLInputElement).value;
  const extra = (document.getElementById('extra') as HTMLInputElement).value;
  const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value;
  const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);

  let produto: Produto;

  switch (tipo) {
    case 'tv':
      produto = new TV(modelo, fabricante, valor, extra);
      break;
    case 'celular':
      produto = new Celular(modelo, fabricante, valor, extra);
      break;
    case 'bicicleta':
      produto = new Bicicleta(modelo, fabricante, valor, extra);
      break;
    default:
      return;
  }

  carrinho.adicionar(produto);
  atualizarTela();
  form.reset();
});

function atualizarTela() {
  const lista = document.getElementById('lista-produtos')!;
  const total = document.getElementById('total')!;

  lista.innerHTML = '';
  carrinho.getItens().forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.modelo} - ${p.fabricante} - R$ ${p.valor}`;
    lista.appendChild(li);
  });

  total.textContent = carrinho.getTotal().toFixed(2);
}
