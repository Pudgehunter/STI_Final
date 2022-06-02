const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
const csvFile2 = document.getElementById("csvFile2");
const sel1 = document.getElementById("Name1");
const selProtoVideo = document.getElementById("Name2");
const kInput = document.getElementById("KNN");
const compareBtn = document.getElementById("compare");
const resultTxt = document.getElementById("result");

const KNN_prototype = document.getElementById("KNN_prototype");
const createPrototype = document.getElementById("createPrototype");
const createPrototype2 = document.getElementById("createPrototype2");
const clickme = document.getElementById("clickme");

const myForm2 = document.getElementById("myForm2");
const sel2 = document.getElementById("NameMusica");
const kInput2 = document.getElementById("KNNMusica");
const compare2 = document.getElementById("compare2");
const resultMusica = document.getElementById("resultMusica");

const compare3 = document.getElementById("compare3");
const resultProtoJuegos = document.getElementById("resultProtoJuegos");
const KNN2 = document.getElementById("KNN2");
//let datosPrueba = [10, 20, 30, 40, 50];


let isAsc = false;
let datos;
//let datos2;
let currName;
let infoTabla;
let videojuegosTabla;
var clicks = 0;

//Tener los bases de datos música y videojuegos adentro.

$(document).ready(function() {
    $.ajax({
        url: "./CSV/STI final Musica (respuestas) - Respuestas de formulario 1.csv",
        dataType: "text"
    }).done((data) => {
        infoTabla = crearTabla(data);
        fillSelects(infoTabla);
    })
});

$(document).ready(function() {
    $.ajax({
        url: "./CSV/STI final Videojuegos (respuestas) - Respuestas de formulario 1.csv",
        dataType: "text",
    }).done((data) => {
            videojuegosTabla = crearTabla2(data);
     })
});

function fillSelects(datos2) {
    for (var i = 0; i < datos2.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = datos2[i].Nombre;
        opt.value = datos2[i].Nombre;

        sel2.appendChild(opt);
    }
}

function crearTabla(data) {
    var datosFila = data.split("\n" && "\r");
    var info = [];
    for (let index = 1; index < datosFila.length; index++) {
        let dataLinea = datosFila[index];
        arregloLista = dataLinea.split(",");
        info.push({
            Nombre: arregloLista[3], //Nombre de la canción
            rock: arregloLista[5], //1
            urbano: arregloLista[6], //2
            latino: arregloLista[7], //3
            ryb: arregloLista[8], //4
            pop: arregloLista[9], //5
            instrumental: arregloLista[10], //6
            electronico: arregloLista[11], //7
            duracion: arregloLista[12], //8
            animada: arregloLista[13], //9
            alegre: arregloLista[14], //10
            letra: arregloLista[15], //11
            conocidas: arregloLista[16], //12
        });
    }
    return info;
}

function crearTabla2(data) {
    var datosFila = data.split("\n" && "\r");
    var info = [];
    for (let index = 1; index < datosFila.length; index++) {
        let dataLinea = datosFila[index];
        arregloLista = dataLinea.split(",");
        info.push({
            Nombre: arregloLista[3], //Nombre de la canción
            rock: arregloLista[9], //Terror
            urbano: arregloLista[7], //Deportes
            latino: arregloLista[5], //Arcade
            ryb: arregloLista[6], //Simulacion
            pop: arregloLista[10], //Exploracion
            instrumental: arregloLista[11], //Pensar
            electronico: arregloLista[8], //E-sport
            duracion: arregloLista[16], //8
            animada: arregloLista[12], //9
            alegre: arregloLista[13], //10
            letra: arregloLista[14], //11
            conocidas: arregloLista[15], //12
        });
    }
    return info;
}


//Función Manual
function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\r\n");

    var info = [];

    //24 columnas en total.
    //Teniendo en cuenta que 12 son de música y las otras 12 son de videojuegos
    for (let index = 0; index < rows.length; index++) {
        let dataLinea = rows[index];
        arregloLista = dataLinea.split(",");
        info.push({
            Nombre: arregloLista[2],
            rock: arregloLista[4], //1
            urbano: arregloLista[5], //2
            latino: arregloLista[6], //3
            ryb: arregloLista[7], //4
            pop: arregloLista[8], //5
            instrumental: arregloLista[9], //6
            electronico: arregloLista[10], //7
            duracion: arregloLista[11], //8
            animada: arregloLista[12], //9
            alegre: arregloLista[13], //10
            letra: arregloLista[14], //11
            conocidas: arregloLista[15], //12
        });
    }
    // return the array
    return info;
}

createPrototype.addEventListener("click", function () {
    clicks += 1;
    let k = KNN_prototype.value;
    escogerPersonajesRandom(k, clicks);
});

function escogerPersonajesRandom(k, clicks) {
    let Obj1 = [];
    for (let i = 0; i < k; i++) {
        Obj1[i] = datos[getRandomArbitrary(0, datos.length)];
    }
    console.log(Obj1);

    let pruebaAverageArrayRock = [];
    let pruebaAverageArrayUrbano = [];
    let pruebaAverageArrayLatino = [];
    let pruebaAverageArrayRyB = [];
    let pruebaAverageArrayPop = [];
    let pruebaAverageArrayInstrumental = [];
    let pruebaAverageArrayElectronico = [];
    let pruebaAverageArrayDuracion = [];
    let pruebaAverageArrayAnimada = [];
    let pruebaAverageArrayAlegre = [];
    let pruebaAverageArrayletra = [];
    let pruebaAverageArrayConocidas = [];

    for (let index = 0; index < Obj1.length; index++) {
        pruebaAverageArrayRock[index] = Obj1[index].rock;
        pruebaAverageArrayUrbano[index] = Obj1[index].urbano;
        pruebaAverageArrayLatino[index] = Obj1[index].latino;
        pruebaAverageArrayRyB[index] = Obj1[index].ryb;
        pruebaAverageArrayPop[index] = Obj1[index].pop;
        pruebaAverageArrayInstrumental[index] = Obj1[index].instrumental;
        pruebaAverageArrayElectronico[index] = Obj1[index].electronico;
        pruebaAverageArrayDuracion[index] = Obj1[index].duracion;
        pruebaAverageArrayAnimada[index] = Obj1[index].animada;
        pruebaAverageArrayAlegre[index] = Obj1[index].alegre;
        pruebaAverageArrayletra[index] = Obj1[index].letra;
        pruebaAverageArrayConocidas[index] = Obj1[index].conocidas;
    }

    //No supe como hacerlo más profesional, entonces lo hice 1 por 1
    let promedioDesviacion = validacionStandarDeviation(pruebaAverageArrayRock,
        pruebaAverageArrayUrbano,
        pruebaAverageArrayLatino,
        pruebaAverageArrayRyB,
        pruebaAverageArrayPop,
        pruebaAverageArrayInstrumental,
        pruebaAverageArrayElectronico,
        pruebaAverageArrayDuracion,
        pruebaAverageArrayAnimada,
        pruebaAverageArrayAlegre,
        pruebaAverageArrayletra,
        pruebaAverageArrayConocidas
    );
    //Validar si entra o no, esta es la función del Mean Deviation
    let ArrayDeviation = [];
    ArrayDeviation[0] = standardDeviation(pruebaAverageArrayRock);
    ArrayDeviation[1] = standardDeviation(pruebaAverageArrayUrbano);
    ArrayDeviation[2] = standardDeviation(pruebaAverageArrayLatino);
    ArrayDeviation[3] = standardDeviation(pruebaAverageArrayRyB);
    ArrayDeviation[4] = standardDeviation(pruebaAverageArrayPop);
    ArrayDeviation[5] = standardDeviation(pruebaAverageArrayInstrumental);
    ArrayDeviation[6] = standardDeviation(pruebaAverageArrayElectronico);
    ArrayDeviation[7] = standardDeviation(pruebaAverageArrayDuracion);
    ArrayDeviation[8] = standardDeviation(pruebaAverageArrayAnimada);
    ArrayDeviation[9] = standardDeviation(pruebaAverageArrayAlegre);
    ArrayDeviation[10] = standardDeviation(pruebaAverageArrayletra);
    ArrayDeviation[11] = standardDeviation(pruebaAverageArrayConocidas);

    let values = [];
    //Entra o no Rock
    if (ArrayDeviation[0] <= promedioDesviacion + 0.1) {
        values[0] = promedio(pruebaAverageArrayRock);
    } else {
        values[0] = 1;
    }
    //Entra o no Urbano
    if (ArrayDeviation[1] <= promedioDesviacion + 0.1) {
        values[1] = promedio(pruebaAverageArrayUrbano);
    } else {
        values[1] = 1;
    }
    //Entra o no Latino
    if (ArrayDeviation[2] <= promedioDesviacion + 0.1) {
        values[2] = promedio(pruebaAverageArrayLatino);
    } else {
        values[2] = 1;
    }
    //Entra o no Ryb
    if (ArrayDeviation[3] <= promedioDesviacion + 0.1) {
        values[3] = promedio(pruebaAverageArrayRyB);
    } else {
        values[3] = 1;
    }
    //Entra o no Pop
    if (ArrayDeviation[4] <= promedioDesviacion + 0.1) {
        values[4] = promedio(pruebaAverageArrayPop);
    } else {
        values[4] = 1;
    }
    //Entra o no Instrumental
    if (ArrayDeviation[5] <= promedioDesviacion + 0.1) {
        values[5] = promedio(pruebaAverageArrayPop);
    } else {
        values[5] = 1;
    }
    //Entra o no Electronico
    if (ArrayDeviation[6] <= promedioDesviacion + 0.1) {
        values[6] = promedio(pruebaAverageArrayPop);
    } else {
        values[6] = 1;
    }
    //Entra o no duracion
    if (ArrayDeviation[7] <= promedioDesviacion + 0.1) {
        values[7] = promedio(pruebaAverageArrayDuracion);
    } else {
        values[7] = 1;
    }
    //Entra o no animada
    if (ArrayDeviation[8] <= promedioDesviacion + 0.1) {
        values[8] = promedio(pruebaAverageArrayAnimada);
    } else {
        values[8] = 1;
    }
    //Entra o no alegre
    if (ArrayDeviation[9] <= promedioDesviacion + 0.1) {
        values[9] = promedio(pruebaAverageArrayAlegre);
    } else {
        values[9] = 1;
    }
    //Entra o no letra
    if (ArrayDeviation[10] <= promedioDesviacion + 0.1) {
        values[10] = promedio(pruebaAverageArrayletra);
    } else {
        values[10] = 1;
    }
    //Entra o no conocido
    if (ArrayDeviation[11] <= promedioDesviacion + 0.1) {
        values[11] = promedio(pruebaAverageArrayConocidas);
    } else {
        values[11] = 1;
    }

    datos.push({
        Nombre: "Prototipo " + clicks + " (Deviation)",
        rock: values[0], //1
        urbano: values[1], //2
        latino: values[2], //3
        ryb: values[3], //4
        pop: values[4], //5
        instrumental: values[5], //6
        electronico: values[6], //7
        duracion: values[7], //8
        animada: values[8], //9
        alegre: values[9], //10
        letra: values[10], //11
        conocidas: values[11], //12
    });
    let a = [];
    for (let index = 0; index < datos.length; index++) {
        a = datos[index];
        
    }
    console.log(a);
    //console.log(a.Nombre);
    /*console.log(ArrayDeviation);
    console.log(promedioDesviacion + 0.1);
    console.log(a);
    console.log(values);*/

    //Para agregar los prototipos que son (Básicamente para actualizarlos)
    for (let i = 0; i < 1; i++) {
        var opt = document.createElement('option');
        /*opt.innerHTML = datos[i].Nombre;
        opt.value = datos[i].Nombre;*/
        opt.innerHTML = a.Nombre;
        opt.value = a.Nombre;
        sel1.appendChild(opt);
    }
    for (let i = 0; i < 1; i++) {
        var opt = document.createElement('option');
        /*opt.innerHTML = datos[i].Nombre;
        opt.value = datos[i].Nombre;*/
        opt.innerHTML = a.Nombre;
        opt.value = a.Nombre;
        selProtoVideo.appendChild(opt);
    }
    alert("Se creo el prototipo " + clicks + " (Deviation)");
}

createPrototype2.addEventListener("click", function () {
    clicks += 1;
    let k = KNN_prototype.value;
    escogerPersonajesRandom2(k, clicks);
});

function escogerPersonajesRandom2(k, clicks) {
    let Obj1 = [];
    for (let i = 0; i < k; i++) {
        Obj1[i] = datos[getRandomArbitrary(0, datos.length)];
    }
    console.log(Obj1);
    let pruebaAverageArrayRock = [];
    let pruebaAverageArrayUrbano = [];
    let pruebaAverageArrayLatino = [];
    let pruebaAverageArrayRyB = [];
    let pruebaAverageArrayPop = [];
    let pruebaAverageArrayInstrumental = [];
    let pruebaAverageArrayElectronico = [];
    let pruebaAverageArrayDuracion = [];
    let pruebaAverageArrayAnimada = [];
    let pruebaAverageArrayAlegre = [];
    let pruebaAverageArrayletra = [];
    let pruebaAverageArrayConocidas = [];

    for (let index = 0; index < Obj1.length; index++) {
        pruebaAverageArrayRock[index] = Obj1[index].rock;
        pruebaAverageArrayUrbano[index] = Obj1[index].urbano;
        pruebaAverageArrayLatino[index] = Obj1[index].latino;
        pruebaAverageArrayRyB[index] = Obj1[index].ryb;
        pruebaAverageArrayPop[index] = Obj1[index].pop;
        pruebaAverageArrayInstrumental[index] = Obj1[index].instrumental;
        pruebaAverageArrayElectronico[index] = Obj1[index].electronico;
        pruebaAverageArrayDuracion[index] = Obj1[index].duracion;
        pruebaAverageArrayAnimada[index] = Obj1[index].animada;
        pruebaAverageArrayAlegre[index] = Obj1[index].alegre;
        pruebaAverageArrayletra[index] = Obj1[index].letra;
        pruebaAverageArrayConocidas[index] = Obj1[index].conocidas;
    }

    let values = [];
    values[0] = promedio(pruebaAverageArrayRock);
    values[1] = promedio(pruebaAverageArrayUrbano);
    values[2] = promedio(pruebaAverageArrayLatino);
    values[3] = promedio(pruebaAverageArrayRyB);
    values[4] = promedio(pruebaAverageArrayPop);
    values[5] = promedio(pruebaAverageArrayInstrumental);
    values[6] = promedio(pruebaAverageArrayElectronico);
    values[7] = promedio(pruebaAverageArrayDuracion);
    values[8] = promedio(pruebaAverageArrayAnimada);
    values[9] = promedio(pruebaAverageArrayAlegre);
    values[10] = promedio(pruebaAverageArrayletra);
    values[11] = promedio(pruebaAverageArrayConocidas);

    datos.push({
        Nombre: "Prototipo " + clicks + " (Average)",
        rock: values[0], //1
        urbano: values[1], //2
        latino: values[2], //3
        ryb: values[3], //4
        pop: values[4], //5
        instrumental: values[5], //6
        electronico: values[6], //7
        duracion: values[7], //8
        animada: values[8], //9
        alegre: values[9], //10
        letra: values[10], //11
        conocidas: values[11], //12
    });
    let a = [];
    for (let index = 0; index < datos.length; index++) {
        a = datos[index];
        
    }
    //console.log(a);
    //console.log(a.Nombre);
    /*console.log(ArrayDeviation);
    console.log(promedioDesviacion + 0.1);
    console.log(a);
    console.log(values);*/

    //Para agregar los prototipos que son (Básicamente para actualizarlos)
    for (let i = 0; i < 1; i++) {
        var opt = document.createElement('option');
        /*opt.innerHTML = datos[i].Nombre;
        opt.value = datos[i].Nombre;*/
        opt.innerHTML = a.Nombre;
        opt.value = a.Nombre;
        sel1.appendChild(opt);
    }
    for (let i = 0; i < 1; i++) {
        var opt = document.createElement('option');
        /*opt.innerHTML = datos[i].Nombre;
        opt.value = datos[i].Nombre;*/
        opt.innerHTML = a.Nombre;
        opt.value = a.Nombre;
        selProtoVideo.appendChild(opt);
    }
    alert("Se creo el prototipo" + clicks + " (Average)");
}

compareBtn.addEventListener("click", function () {
    let name1 = sel1.options[sel1.selectedIndex].text;
    let k = kInput.value;
    let Obj1 = [];
    for (var i = 0; i < datos.length; i++) {
        if (name1 === datos[i].Nombre) {
            Obj1 = datos[i];
        }
    }
    let Arr1 = Object.values(Obj1);
    let Arr1s = Arr1.splice(1);
    currName = 0;
    let cosineArr = [];
    while (currName < infoTabla.length) {
        let Obj2 = [];

        for (var i = 0; i < infoTabla.length; i++) {
            if (i === currName) {
                Obj2 = infoTabla[i];
            }
        }

        let Arr2 = Object.values(Obj2);
        let Arr2s = Arr2.splice(1);
        let result = [Arr2[0], cosineSimil(Arr1s, Arr2s)];
        cosineArr.push(result);
        currName++;
    }


    //QUITARLE LA SIMILITUD COSENO PROPIA
    for (let i = 0; i < cosineArr.length; i++) {
        if (cosineArr[i][1] >= 0.99) {
            cosineArr.splice(i, 1);
        }
    }

    let orderedCosineArr = cosineArr.sort((a, b) => b[1] - a[1])
    let KNNArr = orderedCosineArr.splice(0, k);
    let names = "";
    index = 1;
    KNNArr.forEach(element => {
        let name = `<br>${index}.${element[0]}, con una distancia de ${1 - element[1]}`;
        index++;
        names += name;
    });
    resultTxt.innerHTML = `Los ${k} vecinos más cercanos de ${name1}, por orden de cercanía, son:${names}`
});

function cosineSimil(Arr1, Arr2) {
    let d = dotProduct(Arr1, Arr2);
    let m1 = magnitude(Arr1);
    let m2 = magnitude(Arr2);
    let result = d / (m1 * m2);

    return result;
}

function dotProduct(a, b) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        if(i >= 6){
            if(i >= 10){
                sum += (a[i]*2/3) * (b[i]*2/3);
            } else {
                sum += a[i] * b[i];
            }
        } else {
            sum += (a[i]/3) * (b[i]/3);
        }
    }
    return sum;
}
function magnitude(a) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        if(i >= 6){
            if(i >= 10){
                sum += Math.pow((a[i]*2/3), 2);
            } else {
                sum += Math.pow(a[i], 2);
            }
        } else {
            sum += Math.pow((a[i]/3), 2);
        }
    }
    let result = Math.sqrt(sum);
    return result;
}
/*clickme.addEventListener("click", function () {
    let desArr = [];
    for (let index = 0; index < 10; index++) {
        //desArr[index] = standardDeviation(arr + [index]);
        console.log("arr" + [index]);
    }
});*/

function validacionStandarDeviation(arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12) {
    let desArr = [];
    desArr[0] = standardDeviation(arr1);
    desArr[1] = standardDeviation(arr2);
    desArr[2] = standardDeviation(arr3);
    desArr[3] = standardDeviation(arr4);
    desArr[4] = standardDeviation(arr5);
    desArr[5] = standardDeviation(arr6);
    desArr[6] = standardDeviation(arr7);
    desArr[7] = standardDeviation(arr8);
    desArr[8] = standardDeviation(arr9);
    desArr[9] = standardDeviation(arr10);
    desArr[10] = standardDeviation(arr11);
    desArr[11] = standardDeviation(arr12);
    let promedioDesArr = average(desArr);
    return promedioDesArr;
}

function standardDeviation(arr) {
    /*let mean = arr.reduce((acc, curr) => {
        return parseInt(acc + curr)
    }, 0) / arr.length;*/

    let mean = average(arr);

    arr = arr.map((el) => {
        return (el - mean) ** 2
    })

    let total = parseInt(arr.reduce((acc, curr) => acc + curr, 0));

    return Math.sqrt(total / arr.length);
}

function promedio(a) { //Para tener enteros
    let pruebaAverage = 0;
    for (let i = 0; i < a.length; i++) {
        pruebaAverage += parseInt(a[i]);
    }
    var total = pruebaAverage / a.length;
    return Math.round(total);
}

function average(a) { //Average for prototype
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += parseFloat(a[i]);
    }
    var total = sum / a.length;
    return parseFloat(total);
}

function getRandomArbitrary(min, max) {//El profe quiere personajes aleatorios
    return parseInt(Math.random() * (max - min) + min);
}

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        datos = data;
        fillSelects(data);

    };
    function fillSelects(datos) {
        for (var i = 0; i < datos.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = datos[i].Nombre;
            opt.value = datos[i].Nombre;

            sel1.appendChild(opt);
        }
        /*for (var i = 0; i < datos.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = datos[i].Nombre;
            opt.value = datos[i].Nombre;

            selProtoVideo.appendChild(opt);
        } */
    }
    reader.readAsText(input);
    alert("Subido");
});

compare2.addEventListener("click", function () {
    let name1 = sel2.options[sel2.selectedIndex].text;
    let k = kInput2.value;
    let Obj1 = [];
    for (var i = 0; i < infoTabla.length; i++) {
        if (name1 === infoTabla[i].Nombre) {
            Obj1 = infoTabla[i];
        }
    }
    let Arr1 = Object.values(Obj1);
    let Arr1s = Arr1.splice(1);
    currName = 0;
    let cosineArr = [];
    while (currName < videojuegosTabla.length) {
        let Obj2 = [];

        for (var i = 0; i < videojuegosTabla.length; i++) {
            if (i === currName) {
                Obj2 = videojuegosTabla[i];
            }
        }
        console.log(Obj2);
        let Arr2 = Object.values(Obj2);
        let Arr2s = Arr2.splice(1);
        let result = [Arr2[0], cosineSimil(Arr1s, Arr2s)];
        cosineArr.push(result);
        currName++;
    }


    //QUITARLE LA SIMILITUD COSENO PROPIA
    for (let i = 0; i < cosineArr.length; i++) {
        if (cosineArr[i][1] >= 0.99) {
            cosineArr.splice(i, 1);
        }
    }

    let orderedCosineArr = cosineArr.sort((a, b) => b[1] - a[1])
    let KNNArr = orderedCosineArr.splice(0, k);
    let names = "";
    index = 1;
    KNNArr.forEach(element => {
        let name = `<br>${index}.${element[0]}, con una distancia de ${1 - element[1]}`;
        index++;
        names += name;
    });
    resultMusica.innerHTML = `Los ${k} vecinos más cercanos de ${name1}, por orden de cercanía, son:${names}`
});

compare3.addEventListener("click", function () {
    let name1 = selProtoVideo.options[selProtoVideo.selectedIndex].text;
    let k = KNN2.value;
    let Obj1 = [];
    for (var i = 0; i < datos.length; i++) {
        if (name1 === datos[i].Nombre) {
            Obj1 = datos[i];
        }
    }
    let Arr1 = Object.values(Obj1);
    let Arr1s = Arr1.splice(1);
    currName = 0;
    let cosineArr = [];
    while (currName < videojuegosTabla.length) {
        let Obj2 = [];
        for (var i = 0; i < videojuegosTabla.length; i++) {
            if (i === currName) {
                Obj2 = videojuegosTabla[i];
            }
        }
        console.log(Obj2);
        let Arr2 = Object.values(Obj2);
        let Arr2s = Arr2.splice(1);
        let result = [Arr2[0], cosineSimil(Arr1s, Arr2s)];
        cosineArr.push(result);
        currName++;
    }


    //QUITARLE LA SIMILITUD COSENO PROPIA
    for (let i = 0; i < cosineArr.length; i++) {
        if (cosineArr[i][1] >= 0.99) {
            cosineArr.splice(i, 1);
        }
    }

    let orderedCosineArr = cosineArr.sort((a, b) => b[1] - a[1])
    let KNNArr = orderedCosineArr.splice(0, k);
    let names = "";
    index = 1;
    KNNArr.forEach(element => {
        let name = `<br>${index}.${element[0]}, con una distancia de ${1 - element[1]}`;
        index++;
        names += name;
    });
    resultProtoJuegos.innerHTML = `Los ${k} vecinos más cercanos de ${name1}, por orden de cercanía, son:${names}`
});
