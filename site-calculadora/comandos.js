onload = () => {
  document.querySelector('#tecla0').onclick = () => digito(0);
  document.querySelector('#tecla1').onclick = () => digito(1);
  document.querySelector('#tecla2').onclick = () => digito(2);
  document.querySelector('#tecla3').onclick = () => digito(3);
  document.querySelector('#tecla4').onclick = () => digito(4);
  document.querySelector('#tecla5').onclick = () => digito(5);
  document.querySelector('#tecla6').onclick = () => digito(6);
  document.querySelector('#tecla7').onclick = () => digito(7);
  document.querySelector('#tecla8').onclick = () => digito(8);
  document.querySelector('#tecla9').onclick = () => digito(9);
  document.querySelector('#decimal').onclick = () => virgula();
  document.querySelector('#clear').onclick = () => limpa();
  document.querySelector('#div').onclick = () => operador('/');
  document.querySelector('#mult').onclick = () => operador('*');
  document.querySelector('#menos').onclick = () => operador('-');
  document.querySelector('#mais').onclick = () => operador('+');
  document.querySelector('#igual').onclick = () => calcula('=');
}

// Variáveis para armazenar valor, operador e o estado da calculadora.
let sValor = '0'; // valor que será apresentado no display
let novoNumero = true; // vai ver se terá um novo número
let valorAnterior = '0'; // valor acumulado para uma operação
let operacaoPendente = null; // operação acumulada

// Atualiza o visor
const atualizaVisor = () => {
  let [parteInteira, parteDecimal] = sValor.split(',');
  if (parteInteira.length > 10) {
    document.querySelector('#result').innerText = ''
    return limpa();
  }
  let v = '';
  c = 0;
  for (let i=parteInteira.length -1; i>=0; i--) {
    if (++c > 3) {
      v = '.' + v;
      c= 1;
    }
    v = parteInteira[i] + v;
  }

  v = v + (parteDecimal ?  ',' + parteDecimal.substr(0, 10 - v.length) : '');
  document.querySelector('#result').innerText = v;
};

// Click no botão de dígito
const digito = (n) => {
  if (novoNumero) {
    sValor = '' + n; // concatena e vira uma string
    novoNumero = false;
  } else sValor += n; // será concatenada com n
  atualizaVisor();
};

// Vírgula
const virgula = () => {
  if(novoNumero) {
    sValor = '0,';
    novoNumero = false;
  } else if (sValor.indexOf(',') == - 1)
    sValor += ',';
    atualizaVisor();
};

// Botão Clear
const limpa = () => {
  novoNumero = true;
  valorAnterior = 0; // = valorAnterior.length == -1; resultado.substring(0, resultado.length -1);
  operacaoPendente = null;
  sValor = ''
  atualizaVisor();
}; 

// Converte a string do valor para um número real
const valorAtual = () => parseFloat(sValor.replace(',' , '.')); // recebe uma string para substituir outra string. Depois da substituição retorna o número.

// Botões dos operadores
const operador = (op) => {
  calcula();
  valorAnterior = valorAtual();
  //acumula nova operação
  operacaoPendente = op;
  novoNumero = true;
}

const calcula = () => {
 if (operacaoPendente != null) {
   let resultado;
  switch(operacaoPendente) {
    case '+': resultado = valorAnterior + valorAtual();
    break;
      case '-': resultado = valorAnterior - valorAtual();
      break;
        case '*': resultado = valorAnterior * valorAtual();
        break;
        case '/': resultado = valorAnterior / valorAtual();
        break;
  }
    sValor = resultado.toString().replace('.',','); // Converte variável para string
 }  
 novoNumero = true;
 operacaoPendente = null;
 valorAnterior = 0;
 atualizaVisor();
};

// Dígitos do teclado
const mapaTeclado = {
  '0' : 'tecla0',
  '1' : 'tecla1',
  '2' : 'tecla2',
  '3' : 'tecla3',
  '4' : 'tecla4',
  '5' : 'tecla5',
  '6' : 'tecla6',
  '7' : 'tecla7',
  '8' : 'tecla8',
  '9' : 'tecla9',
  ',' : 'decimal',
  '=' : 'igual',
  'Enter' : 'igual',
  '+' : "mais",
  '-' : 'menos',
  'c' : 'clear',
  '*' : 'mult',
  '/' : 'div'
}

const mapearTeclado = (evento) => {
  const tecla = evento.key;

  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
  if (teclaPermitida())  document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);
