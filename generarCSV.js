const fs = require('fs');

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomText(length) {
    let text = "";
    for (let i = 0; i < length; i++) {
        const char = String.fromCharCode(randomNumber(97, 123));  // Letras aleatorias
        text += char;
    }
    return text;
}

function generateData(size) {
    let csv = "nombre,edad,texto\n";  // Cabecera del CSV
    for (let i = 0; i < size; i++) {
        const nombre = randomText(randomNumber(5, 10));
        const edad = randomNumber(18, 80);
        const texto = randomText(randomNumber(20, 100));
        csv += `${nombre},${edad},${texto}\n`;
    }
    return csv;
}

const NUM = 50000;
const data = generateData(NUM);
fs.writeFileSync("data.csv", data);

console.log(`Generación de datos completada. Se crearon ${NUM} registros.`);
