const TELA = document.getElementById("tela");

let resultado = null;
let resultados = [];

let numAtual = "";
let visorTela = "";
let numAnteriores = [];
let operadores = [];

let tamResultados;
let resultadoFinal;

function atualizarTela(){
    if(visorTela == ""){
        TELA.textContent = 0;
    } else {
        TELA.textContent = visorTela;
    }
}

function porcentagem() {
    if (visorTela === "" || numAtual === "0" || visorTela.endsWith(" ") || numAnteriores.length === 0) return;

    //apaga o numero do visor
    let tamNumAtual = numAtual.length;
    visorTela = visorTela.slice(0, -tamNumAtual)

    //calcular porcentagem
    let j = numAnteriores.length - 1;

    let numAtualFloat = parseFloat(numAtual);
    let calculoPorcentagem = (numAnteriores[j]*numAtualFloat)/100;
    
    //atribuir numAtual
    numAtual = calculoPorcentagem.toString();
    visorTela += numAtual;
    atualizarTela();
}

function del(){
    if (visorTela === "") return;

    let i = resultados.length - 1;
    let j = numAnteriores.length - 1;
    let o = operadores.length - 1;

    if (visorTela.endsWith(" ")) {
        numAtual = numAnteriores[j].toString();
        numAnteriores.splice(j,1);
        resultados.splice(i,1);
        operadores.splice(o,1);

        visorTela = visorTela.slice(0, -3);

        //if(resultado === null) {
        //    numAtual = numAnteriores;
        //    numAnteriores = null;
        //}

    } else {
        visorTela = visorTela.slice(0, -1);
        numAtual = numAtual.slice(0, - 1) || "";
    }

    if (numAtual === "" && numAnteriores.length === 0) ce();

    

    console.log("--- função deletar ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual);
    console.log("num anterior:" + numAnteriores);
    console.log("operadores:" + operadores);
    atualizarTela()
}

function positivoOuNegativo() { 
    if (visorTela.endsWith(" ")) return;

    let tamNumAtual = numAtual.length;

    numAtual = numAtual.startsWith("-")? numAtual.slice(1) : "-" + numAtual;

    visorTela = visorTela.slice(0, -tamNumAtual) //remove o num atual
    visorTela += numAtual;
    atualizarTela();
    
}

function ce(){
    visorTela = "";
    resultado = null;
    resultados = [];

    numAtual = "";
    visorTela = "";
    numAnteriores = [];
    operadores = [];

    tamResultados = null;
    resultadoFinal = null;

    atualizarTela();
}

function addOperador(op) {

    // === compara o tipo também
    if (numAtual === "" && resultado === null) return;
    if (visorTela.endsWith(".")) return;
    
    numAnteriores.push(parseFloat(numAtual));

    operadores.push(op);

    if (numAnteriores.length > 1) {
        calcular(op);
    } 

    visorTela += " " + op + " ";
    
    numAtual = "";
    resultadoFinal = null;

    console.log("--- função operadores ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual);
    console.log("num anterior:" + numAnteriores);
    console.log("operadores:" + operadores);

    atualizarTela();

}

function addPonto(){
    if (numAtual === "" && resultado === null) return;
    
    numAtual += "."
    visorTela += ".";
    
    atualizarTela();
}

function addNumero(num) {

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
    console.log("num anterior:" + numAnteriores);
    console.log("operadores:" + operadores);
    
    atualizarTela();
}

function calcularTudo() {
    if (visorTela === "") return;
    
    let o = operadores.length - 1;
    calcular(operadores[o])

    console.log("--- função calculartudo ---");
    console.log("resultados: " + resultados);
    console.log("num atual:" + numAtual)
    console.log("num anterior:" + numAnteriores)

    tamResultados = resultados.length;
    let i = tamResultados - 1;
    resultadoFinal = resultados[i];

    console.log("resultadoFinal:" + resultadoFinal)

    visorTela = resultadoFinal.toString();
    
    numAtual = resultadoFinal.toString();
    resultados = [];
    numAnteriores = [];
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
                resultado = numAnteriores[0] + numAtualFloat;
                break;
            case "-": 
                resultado = numAnteriores[0] - numAtualFloat;
                break;
            case "×": 
                resultado = numAnteriores[0] * numAtualFloat;
                break;
            case "÷": 
                resultado = numAnteriores[0] / numAtualFloat;
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
    console.log("num anterior:" + numAnteriores);
    console.log("operadores:" + operadores);

    numAtual = "";

    
}