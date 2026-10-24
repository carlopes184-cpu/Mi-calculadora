
// OBTENER LA PANTALLA
const pantalla = document.getElementById("pantalla");

let expresion = "";

// ACTUALIZAR PANTALLA
function actualizar() {
    pantalla.value = expresion || "0";
}

// AGREGAR NUMEROS Y OPERADORES
function agregar(valor) {
    const operadores = ["+", "-", "*", "/"];
    const ultimo = expresion.slice(-1);

    if (operadores.includes(valor)) {
        if (expresion === "") {
            if (valor === "-") expresion = "-";
            actualizar();
            return;
        }

        if (operadores.includes(ultimo)) {
            expresion = expresion.slice(0, -1);
        }
    }

    if (valor === ".") {
        const numero = expresion.split(/[+\-*/]/).pop();

        if (numero.includes(".")) return;
        if (numero === "") expresion += "0";
    }

    expresion += valor;
    actualizar();
}

// LIMPIAR CALCULADORA
function limpiar() {
    expresion = "";
    actualizar();
}

// BORRAR ULTIMO CARACTER
function borrar() {
    expresion = expresion.slice(0, -1);
    actualizar();
}

// REALIZAR OPERACIONES
function calcular() {
    try {
        // Validar que solo haya números y operadores
        if (!/^[0-9+\-*/. ]+$/.test(expresion)) {
            throw new Error("Operación inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + expresion + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        expresion = String(
            Number(resultado.toPrecision(12))
        );

        actualizar();

    } catch (error) {
        expresion = "";
        pantalla.value = "Error";
    }
}

// CALCULAR PORCENTAJE
function porcentaje() {
    if (expresion === "") return;

    calcular();

    if (expresion === "") return;

    expresion = String(Number(expresion) / 100);
    actualizar();
}

// CAMBIAR SIGNO
function cambiarSigno() {
    if (expresion === "") return;

    calcular();

    if (expresion === "") return;

    expresion = String(-Number(expresion));
    actualizar();
}
