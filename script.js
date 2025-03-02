const TELA = document.getElementById("tela");

let resultado = null;
let resultados = [];

let numAtual = "";
let visorTela = "";
let numAnterior = [];
let operador = "";

let tamResultados;
let resultadoFinal;

function atualizarTela(){
    if(visorTela == ""){
        TELA.textContent = 0;
    } else {
        TELA.textContent = visorTela;
    }
}

function del(){
    if (visorTela === "") return;

    tamResultados = resultados.length;
    let i = tamResultados - 1;

    let tamNumAnterior = numAnterior.length;
    let j = tamNumAnterior - 1;

    if (visorTela.endsWith(" ")) {
        numAtual = numAnterior[j].toString();
        numAnterior.splice(j,1);
        resultados.splice(i,1);

        visorTela = visorTela.substring(0, visorTela.length - 3);
        operador = "";

        //if(resultado === null) {
        //    numAtual = numAnterior;
        //    numAnterior = null;
        //}

    } else {
        visorTela = visorTela.substring(0, visorTela.length - 1);
        numAtual = numAtual.substring(0, numAtual.length - 1) || "";
    }

    

    console.log("--- função deletar ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual);
    console.log("num anterior:" + numAnterior);
    console.log("operador:" + operador);
    atualizarTela()
}

function ce(){
    visorTela = "";
    resultado = null;
    resultados = [];

    numAtual = "";
    visorTela = "";
    numAnterior = [];
    operador = "";

    tamResultados = null;
    resultadoFinal = null;

    atualizarTela();
}

function addOperador(op) {

    // === compara o tipo também
    if (numAtual === "" && resultado === null) return;
    if (visorTela.endsWith(".")) return;
    
    numAnterior.push(parseFloat(numAtual));

    if (numAnterior.length > 1) {
        calcular(op);
    } 

    visorTela += " " + op + " ";
    operador = op

    numAtual = "";
    resultadoFinal = null;

    console.log("--- função operador ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual);
    console.log("num anterior:" + numAnterior);
    console.log("operador:" + operador);

    atualizarTela();

}

function addPonto(){
    if (numAtual === "" && resultado === null) return;
    
    numAtual += "."
    visorTela += ".";
    
    atualizarTela();
}

function addNumero(num) {
    //if (visorTela === resultado) {
    //    visorTela = "";
    //    resultado = null;
    //} 

    if (resultadoFinal !== null) {
        ce();
        numAtual += num;
        visorTela += num;
    } else {
        numAtual += num;
        visorTela += num;
    }

    console.log("--- função addnumero ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual);
    console.log("num anterior:" + numAnterior);
    console.log("operador:" + operador);
    
    atualizarTela();
}

function calcularTudo() {
    calcular(operador)

    console.log("--- função calculartudo ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual)
    console.log("num anterior:" + numAnterior)

    tamResultados = resultados.length;
    let i = tamResultados - 1;
    resultadoFinal = resultados[i];

    console.log("resultadoFinal:" + resultadoFinal)

    visorTela = resultadoFinal.toString();
    
    numAtual = resultadoFinal;
    resultados = [];
    numAnterior = [];
    // mantem o resultado final
    atualizarTela();
}

function calcular(op) {
    let numAtualFloat = parseFloat(numAtual);
    tamResultados = resultados.length
    let i = tamResultados - 1;

    if (tamResultados === 0){
        switch (op) {
            case "+": 
                resultado = numAnterior[0] + numAtualFloat;
                break;
            case "-": 
                resultado = numAnterior[0] - numAtualFloat;
                break;
            case "×": 
                resultado = numAnterior[0] * numAtualFloat;
                break;
            case "÷": 
                resultado = numAnterior[0] / numAtualFloat;
                break;
            default:
                break;
        }
    } else {
        switch (op) {
            case "+": 
                resultado = resultados[i] + numAtualFloat;
                break;
            case "-": 
                resultado = resultados[i] - numAtualFloat;
                break;
            case "×": 
                resultado = resultados[i] * numAtualFloat;
                break;
            case "÷": 
                resultado = resultados[i] / numAtualFloat;
                break;
            default:
                break;
        }
    }

    resultados.push(resultado);
    resultado = null;

    console.log("--- função calcular ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual);
    console.log("num anterior:" + numAnterior);
    console.log("operador:" + operador);

    numAtual = "";
    operador = "";

    
}