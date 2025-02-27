let number1 = "";
let number2 = "";
let operador = "";
let listaHistorico = [];

const resultado = document.querySelector('.resultado');
const contaAtual = document.querySelector('.contaAtual');

function adicionar(numeroAtual) {
  if (operador == "") {
    if (number1 == "") {
      number1 = numeroAtual;
    } else {
      number1 = number1.toString() + numeroAtual.toString();
    }
    resultado.innerHTML = number1;
  } else {
    if (number2 == "") {
      number2 = numeroAtual;
    } else {
      number2 = number2.toString() + numeroAtual.toString();
    }
    resultado.innerHTML = number2;
  }
}

function apagarUltimo() {

  if (operador == "") {

    // Converte number1 para string antes de usar slice

    number1 = String(number1); // ou number1.toString();

    number1 = number1.slice(0, -1); // Remove o último caractere

    resultado.innerHTML = number1 || '0'; // Se number1 ficar vazio, exibe '0'

  } else {

    // Converte number2 para string antes de usar slice

    number2 = String(number2); // ou number2.toString();

    number2 = number2.slice(0, -1); // Remove o último caractere

    resultado.innerHTML = number2 || '0'; // Se number2 ficar vazio, exibe '0'

  }

}

function calcular() {
  if (number1 != '' && operador != '' && number2 != '') {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    let resultadoCalculo;
    switch (operador) {
      case '-': resultadoCalculo = number1 - number2; break;
      case '*': resultadoCalculo = number1 * number2; break;
      case '+': resultadoCalculo = number1 + number2; break;
      case '/': resultadoCalculo = number1 / number2; break;
    }
    atualizarResultado(resultadoCalculo);
    salvarHistorico(`${number1} ${operador} ${number2} = ${resultadoCalculo}`);
    contaAtual.innerHTML = number1 + " " + operador + " " + number2 + " = ";
    number1 = resultadoCalculo;
    operador = '';
    number2 = '';
    
  }
}

function calcularOperador(op) {
  if(number1 != '' && operador != '' && number2 != '') {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    let resultadoCalculo;
    switch (operador) {
      case '-': resultadoCalculo = number1 - number2; break;
      case '*': resultadoCalculo = number1 * number2; break;
      case '+': resultadoCalculo = number1 + number2; break;
      case '/': resultadoCalculo = number1 / number2; break;
    }
    atualizarResultado(resultadoCalculo);
    salvarHistorico(`${number1} ${operador} ${number2} = ${resultadoCalculo}`);
    number1 = resultadoCalculo;
    number2 = "";
    operador = op;
    contaAtual.innerHTML = number1 + " " + operador;
  } else {
    if(number1 != "") {
      operador = op;
    contaAtual.innerHTML = number1 + " " + operador;
    }
  }
}

function raiz() {
  if(number1 != "" && operador == "" && number2 == "") {
    let resultadoRaiz = Math.sqrt(number1);
    contaAtual.innerHTML = "√" + number1;
    number1 = resultadoRaiz;
    atualizarResultado(number1);
  } else if(number1 != '' && operador != '' && number2 != '') {
    let resultadoRaiz = Math.sqrt(number2);
    contaAtual.innerHTML = number1 + " " + operador + " " + "√" + number2;
    number2 = resultadoRaiz;
    atualizarResultado(number2);
    
  }
}

function porcentagem() {
  if(number1 != "" && operador == "" && number2 == "") {
    let resultadoPorcentagem = number1 / 100;
    number1 = resultadoPorcentagem;
    atualizarResultado(number1);
    contaAtual.innerHTML = number1;
  } else if(number1 != '' && operador != '' && number2 != '') {
    let resultadoPorcentagem = number2 / 100;
    number2 = resultadoPorcentagem;
    atualizarResultado(number2);
    contaAtual.innerHTML = number1 + " " + operador + " " + number2;
  }
}

function maismenos() {
  if(number1 != "" && operador == "" && number2 == "") {
    let resultadoMaisMenos = number1 * -1;
    number1 = resultadoMaisMenos;
    atualizarResultado(number1);
    contaAtual.innerHTML = number1;
  } else if(number1 != '' && operador != '' && number2 != '') {
    let resultadoMaisMenos = number2 * -1;
    number2 = resultadoMaisMenos;
    atualizarResultado(number2);
    contaAtual.innerHTML = number1 + " " + operador + " " + number2;
  }
}

function fracao() {
  if(number1 != "" && operador == "" && number2 == "") {
    let resultadoFracao = 1 / number1;
    contaAtual.innerHTML = "1/("+number1+")";
    number1 = resultadoFracao;
    atualizarResultado(number1);
    
  } else if(number1 != '' && operador != '' && number2 != '') {
    let resultadoFracao = 1 / number2;
    contaAtual.innerHTML = number1 + " " + operador + " " + "1/("+number2+")";
    number2 = resultadoFracao;
    atualizarResultado(number2);
    
  }
}

function exponencial() {
  if(number1 != "" && operador == "" && number2 == "") {
    let resultadoExpo = number1 * number1;
    number1 = resultadoExpo;
    atualizarResultado(number1);
    contaAtual.innerHTML = number1;
  } else if(number1 != '' && operador != '' && number2 != '') {
    let resultadoExpo = number2 * number2;
    number2 = resultadoExpo;
    atualizarResultado(number2);
    contaAtual.innerHTML = number1 + " " + operador + " " + number2;
  }
}

function atualizarResultado(number) {
  resultado.innerHTML = number;
}

function limpar() {
  number1 = '';
  number2 = '';
  operador = '';
  resultado.innerHTML = 0;
  contaAtual.innerHTML = "Sem histórico";
}

function salvarHistorico(calculo) {
  if (calculo) {
    listaHistorico.push(calculo);
    localStorage.setItem('historico', JSON.stringify(listaHistorico));
    exibirHistorico();
  }
}

function exibirHistorico() {
  const lista = document.getElementById('historico');
  lista.innerHTML = '';

  const historico = JSON.parse(localStorage.getItem('historico'));
  historico.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = item;
    lista.appendChild(li);
  });
}

function recuperarLista() {
  const listaStr = localStorage.getItem('historico');
  if (listaStr) {
    listaHistorico = JSON.parse(listaStr);
  }
  exibirHistorico();
}

window.onload = () => {
  recuperarLista();
};

const modal = document.querySelector('.modal-container');

function openModal() {
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

const historicoList = document.querySelector('.calculadora-historico');
const calculadora = document.querySelector('.calculadora');
const bodyCalculadora = document.querySelector('#bodyCalculadora');
const body = document.querySelector('#body');
let ativo = "0";

$('#histBtn').on('click', (e) => {
  e.stopPropagation();
  if (ativo === "0") {
    historicoList.classList.add('opacity');
    calculadora.classList.add('blur');
    $('#overlay').show();
    ativo = "1";
  }
});

$('.calculadora').on('click', (e) => {
  if (ativo === "1" && !$(e.target).is('#histBtn')) {
    historicoList.classList.remove('opacity');
    calculadora.classList.remove('blur');
    $('#overlay').hide();
    ativo = "0";
  }
});

$('#limparHistorico').on('click', () => {
  limparHistorico();
});

function limparHistorico() {
  localStorage.clear();
  listaHistorico = [];
  exibirHistorico();
}

