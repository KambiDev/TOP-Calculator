const suma = (a, b) => {
    return a + b;
};

const resta = (a, b) => {
    return a - b;
};

const multiplicar = (a, b) => {
    return a * b;
};

const division = (a, b) => {
    if (b === 0) return 'No se puede dividir por 0';
    return a / b;
};

const operate = (operador, num1, num2) => {

    num1 = Number(num1);
    num2 = Number(num2);

    if (operador === '+') return suma(num1, num2);
    if (operador === '-') return resta(num1, num2);
    if (operador === '*') return multiplicar(num1, num2);
    if (operador === '/') return division(num1, num2);

    return null;
};


const display = document.querySelector('.display');
const botonesNumeros = document.querySelectorAll('.numero');
const botonLimpiar = document.querySelector('#limpiar');
const botonesOperadores = document.querySelectorAll('.operador');
const botonIgual = document.querySelector('#igual');

let valorPantalla = '0';
let primerNumero = null;
let reiniciarPantalla = false;
let operadorActual = null;

const actualizarPantalla = () => {
    display.textContent = valorPantalla;
};

botonesNumeros.forEach((boton) =>{

    boton.addEventListener('click', () => {

        const numeroPresionado = boton.getAttribute('data-valor');

        if (reiniciarPantalla){
            valorPantalla = numeroPresionado;
            reiniciarPantalla = false;
        }else{
            if (valorPantalla === '0'){
                valorPantalla = numeroPresionado;
            }else{
                valorPantalla += numeroPresionado;
            }
        }

        actualizarPantalla();
    });
});

botonLimpiar.addEventListener('click', () => {
    valorPantalla = '0';
    actualizarPantalla();
});

botonesOperadores.forEach((boton) => {
    boton.addEventListener('click', () => {

        if (operadorActual !== null) {
            const resultadoParcial = operate(operadorActual, primerNumero, valorPantalla);
            valorPantalla = resultadoParcial;
            actualizarPantalla();

            primerNumero = valorPantalla; 
        } else {

            primerNumero = valorPantalla;
        }

        operadorActual = boton.getAttribute('data-valor');
        
        reiniciarPantalla = true;
    });
});

botonIgual.addEventListener('click', () => {
    if (operadorActual === null || primerNumero === '') return;

    const resultado = operate(operadorActual, primerNumero, valorPantalla);

    valorPantalla = resultado;
    actualizarPantalla();

    operadorActual = null;
});