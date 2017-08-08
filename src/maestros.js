export var SALIDA = 0;
export var LLEGADA = 1;
export var IDA = 0;
export var VUELTA = 1;
var REDFLAG = 0;
var CANT_BOTONES = 3;
var CANT_HEADERS = 2;
var CANT_TRENES = 3;
// TODO: ojo con esa REDFLAG bien villera, ver cual seria la manera correcta

var horariosHash = {};
horariosHash["Ida"] = [];
horariosHash["Vuelta"] =[];

var displayNames = {};
displayNames["ADROGUE"] = "ADROGUE";
displayNames["BANFIELD"] = "BANFIELD";
displayNames["BURZACO"] = "BURZACO";
displayNames["CONSTITUCION"] = "PZA. CONSTITUCION";
displayNames["EZEIZA"] = "EZEIZA";
displayNames["GERLI"] = "GERLI";
displayNames["GLEW"] = "GLEW";
displayNames["GUERNICA"] = "GUERNICA";
displayNames["GUILLON"] = "L. GUILLON";
displayNames["JAGUEL"] = "EL JAGUEL";
displayNames["KORN"] = "A. KORN";
displayNames["LANUS"] = "LANUS";
displayNames["LLAVALLOL"] = "LLAVALLOL";
displayNames["LONGCHAMPS"] = "LONGCHAMPS";
displayNames["LOMAS"] = "L. DE ZAMORA";
displayNames["GRANDE"] = "MTE. GRANDE";
displayNames["ESCALADA"] = "R. DE ESCALADA";
displayNames["AVELLANEDA"] = "D. SANTILLAN Y M. KOSTEKI";
displayNames["TEMPERLEY"] = "TEMPERLEY";
displayNames["TURDERA"] = "TURDERA";
displayNames["YRIGOYEN"] = "H. YRIGOYEN";

export var estsEze = ["TURDERA","LLAVALLOL","GUILLON","GRANDE","JAGUEL","EZEIZA"].reverse();
export var estsGlew = ["ADROGUE","BURZACO","LONGCHAMPS","GLEW","GUERNICA","KORN"].reverse();
export var estsConst = ["CONSTITUCION","YRIGOYEN","AVELLANEDA","GERLI","LANUS","ESCALADA","BANFIELD","LOMAS","TEMPERLEY"].reverse();

export var ramalEzeiza = ["CONSTITUCION","YRIGOYEN","AVELLANEDA","GERLI","LANUS","ESCALADA","BANFIELD","LOMAS","TEMPERLEY","TURDERA","LLAVALLOL","GUILLON","GRANDE","JAGUEL","EZEIZA"];
export var ramalGlew = ["CONSTITUCION","YRIGOYEN","AVELLANEDA","GERLI","LANUS","ESCALADA","BANFIELD","LOMAS","TEMPERLEY","ADROGUE","BURZACO","LONGCHAMPS","GLEW","GUERNICA","KORN"];

var dbNames = {};
dbNames["eze"] = ramalEzeiza;
dbNames["glew"] = ramalGlew;

export function getRamales(salida, llegada) {
  var ramales = [];
  if (ramalEzeiza.indexOf(salida) != -1 && ramalEzeiza.indexOf(llegada) != -1) {
    ramales.push("eze");
  }
  if (ramalGlew.indexOf(salida) != -1 && ramalGlew.indexOf(llegada) != -1) {
    ramales.push("glew");
  }
  return ramales;
}

export function getRecorridos(ida,vuelta, dia) {
  var recorridos = [];
  var ramales = getRamales(ida, vuelta);
  for (var i = 0; i < ramales.length; i++) {
    var ramal = ramales[i];
    var dbida;
    var dbvuelta;
    var nombres = [];
    if (dbNames[ramal].indexOf(ida) < dbNames[ramal].indexOf(vuelta)) {
          dbida = "const"+"_"+ramal+"_"+dia;
          dbvuelta = ramal +"_"+"const"+"_"+dia;
          nombres.push(dbida);
          nombres.push(dbvuelta);
    }else {
      dbida = ramal +"_"+"const"+"_"+dia;
      dbvuelta = "const"+"_"+ramal+"_"+dia;
      nombres.push(dbida);
      nombres.push(dbvuelta);
    }
    recorridos.push(nombres);
  }
  return recorridos;
}
