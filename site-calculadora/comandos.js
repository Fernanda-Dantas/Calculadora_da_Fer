function insert(num) {
  var numero = document.getElementById('result').innerHTML;
  document.getElementById('result').innerHTML = numero + num;
}

function empty() {
  document.getElementById('result').innerHTML = '';
}

function back() {
  var resultado = document.getElementById('result').innerHTML;
  document.getElementById('result').innerHTML = resultado.substring(0, resultado.length -1);
}

function calc() {
  var resultado = document.getElementById('result').innerHTML;
  if(resultado) {
    document.getElementById('result').innerHTML = eval(resultado);
  } else {
    document.getElementById('result').innerHTML = "NaN";
  }
}


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
  '.' : 'decimal',
  '=' : 'igual',
  'Enter' : 'igual',
  '+' : "mais",
  '-' : 'menos',
  'c' : 'clear',
  '<' : 'backspace',
  'Backspace' : 'backspace',
  '*' : 'mult',
  '/' : 'div'
}

const mapearTeclado = (evento) => {
  const tecla = evento.key;

  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
  if (teclaPermitida())  document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);