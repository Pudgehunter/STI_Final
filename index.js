const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
const table = document.getElementById("results");
const tableHead = document.getElementById("headings");
const sel1 = document.getElementById("Name1");
const kInput = document.getElementById("KNN");
const compareBtn = document.getElementById("compare");
const resultTxt = document.getElementById("result");
let isAsc = false;
let datos;
let currName;
let infoTabla;

//Tener los bases de datos música y videojuegos adentro.
$.ajax({
    url: "./CSV/STI final Musica (respuestas) - Respuestas de formulario 1.csv",
    dataType: "text"
}).done((data) => {
    infoTabla = crearTabla(data);
})
function crearTabla(data){
    var datosFila = data.split("\n" && "\r");
    var info = [];
    for(let index = 1; index < datosFila.length; index++){
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
    console.log(info);
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
    console.log(rows);

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
    console.log(orderedCosineArr);
    let KNNArr = orderedCosineArr.splice(0, k);
    let names = "";
    index = 1;
    KNNArr.forEach(element => {
        let name = `<br>${index}.${element[0]}, con una distancia de ${1 - element[1]}`;
        index++;
        names += name;
    });
    resultTxt.innerHTML = `Los ${k} vecinos más cercanos de ${name1}, por orden de cercanía, son:${names}`
    //console.log(KNNArr);
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
        sum += a[i] * b[i];
    }
    return sum;
}
function magnitude(a) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += Math.pow(a[i], 2);
    }
    let result = Math.sqrt(sum);
    return result;
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
    }

    reader.readAsText(input);

});