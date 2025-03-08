const mysql = require('mysql2');
const fs = require('fs');

// Conectar a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'testdb'
});

const filePath = './data.csv';

// Función para importar datos desde un archivo CSV
function importCSV() {
    const data = fs.readFileSync(filePath, 'utf8');
    const rows = data.split('\n').slice(1);  // Saltar la cabecera

    rows.forEach(row => {
        const [nombre, edad, texto] = row.split(',');
        if (nombre && edad && texto) {
            connection.query(
                'INSERT INTO personas (nombre, edad, texto) VALUES (?, ?, ?)',
                [nombre, parseInt(edad), texto],
                (err) => {
                    if (err) throw err;
                }
            );
        }
    });

    console.log("Datos importados con éxito.");
}

importCSV();
connection.end();
