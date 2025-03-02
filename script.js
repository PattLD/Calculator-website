const TELA = document.getElementById("tela");

let resultado = null;

let numAtual = "";
let visorTela = "";
let numAnterior = null;
let operador = "";

function atualizarTela(){
    if(visorTela == ""){
        TELA.textContent = 0;
    } else {
        TELA.textContent = visorTela;
    }
}

function ce(){
    visorTela = "";
    numAtual = "";
    numAnterior = null;
    operador = ""
    resultado = null;
    atualizarTela();
}

function addOperador(op) {

    // === compara o tipo também
    if (numAtual === "" && resultado === null) return;
    if (visorTela.endsWith(".")) return;
    
    if (numAnterior === null && resultado === null) {
        numAnterior = parseFloat(numAtual);
        numAtual = "";
    
    } else if (numAnterior === null && resultado !== null) {
        numAnterior = resultado
        numAtual = "";
    } else  {
        calcular(op);
    }
    

    visorTela += " " + op + " ";
    operador = op

    atualizarTela();

}

function addPonto(){
    if (numAtual === "" && resultado === null) return;
    
    numAtual += "."
    visorTela += ".";
    
    atualizarTela();
}

function addNumero(num) {
    if (visorTela === resultado) {
        visorTela = "";
        resultado = null;
    } 

    numAtual += num;
    visorTela += num;
    
    atualizarTela();
}

function calcularTudo() {
    calcular(operador)
    visorTela = resultado;
    
    numAtual = "";
    numAnterior = null;
    atualizarTela();
}

function calcular(op) {
    let numAtualFloat = parseFloat(numAtual);

    switch (op) {
        case "+": 
            resultado = numAnterior + numAtualFloat;
            break;
        case "-": 
            resultado = numAnterior - numAtualFloat;
            break;
        case "×": 
        resultado = numAnterior * numAtualFloat;
        break;
        case "÷": 
        resultado = numAnterior / numAtualFloat;
        break;
    }

    numAnterior = resultado;
    numAtual = "";
    operador = "";

    console.log("resultado: " + resultado);
    console.log("num atual:" + numAtual)
    console.log("num anterior:" + numAnterior)
}