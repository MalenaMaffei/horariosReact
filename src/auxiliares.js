export var SALIDA = 0;
export var LLEGADA = 1;
var REDFLAG = 0;
var CANT_BOTONES = 3;
export var CANT_HEADERS = 2;
export var CANT_TRENES = 4;

export function getTimeRemaining(ahora,salida){
    var minAhora = parseInt(ahora.slice(0,ahora.indexOf(":")))*60 + parseInt(ahora.slice(ahora.indexOf(":")+1));
    var minSalida = parseInt(salida.slice(0,salida.indexOf(":")))*60 + parseInt(salida.slice(salida.indexOf(":")+1));
    var resultado;
    if (minSalida > minAhora) {
        resultado = minSalida - minAhora;
    } else {
        resultado = 24*60 - (minAhora - minSalida);
    }
    if (resultado > 59) {
        var horas = Math.floor(resultado/60);
        var minutos = (24*60 - (minAhora - minSalida))%60;
        resultado = horas + ((horas == 1)?(" hora "):(" horas ")) + minutos + (( minutos == 1)?( " minuto"):(" minutos"));
        REDFLAG = 1;
    } else {
        var minutos = resultado;
        resultado = minutos + ((minutos == 1)?(" minuto"):(" minutos"));
        resultado = resultado + ((minutos < 10)?("! &#127939;"):(""));
    }
    return resultado;
}

function esHoraMayor(hora1, hora2) {
    return Date.parse('01/01/2011 ' + hora1) > Date.parse('01/01/2011 ' + hora2);
}

function esHoraMenor(hora1, hora2) {
    return Date.parse('01/01/2011 ' + hora1) < Date.parse('01/01/2011 ' + hora2);
}

function buscarIndices(horaDesde, horaHasta, horarios) {
    var desde;
    var hasta;
    for (var i = 0; i < horarios.length; i++) {
        var actual = horarios[i][SALIDA];
        if (desde == undefined && (esHoraMayor(actual,horaDesde) || actual == horaDesde)) {
            desde = i;
        } else if (esHoraMenor(actual,horaHasta)) {
            hasta = i;
        }
    }
    hasta = ((hasta == undefined)?(i-1):(hasta))
    return [desde, hasta];
}


export function getNext(horarios, currentTime) {
    for (var i = 0; i < horarios.length; i++) {
        if (esHoraMayor(horarios[i][SALIDA], currentTime)){
            let salida = horarios[i][SALIDA];
            let llegada = horarios[i][LLEGADA];
            return horarios[i];
        }
    }
    for (var i = 0; i < horarios.length; i++) {
        if (esHoraMenor(horarios[i][SALIDA], currentTime)) {
            let salida = horarios[i][SALIDA];
            let llegada = horarios[i][LLEGADA];
            return horarios[i];
        }
    }
}

export function ordenarArraysDeHorarios(a, b) {
  var a0 = a[0];
  var b0 = b[0];

  var aMayorQueb = esHoraMayor(a0, b0);
  var aMenorQueb = esHoraMenor(a0, b0);

  return aMenorQueb ? -1 : aMayorQueb ? 1 : 0;
}
