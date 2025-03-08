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
    const start = process.hrtime();  // Iniciar medición del tiempo

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

    const end = process.hrtime(start);
    const importTime = end[0] + end[1] / 1e9;  // Convertir a segundos
    console.log(`Datos importados con éxito en ${importTime.toFixed(4)} segundos.`);

    // Reporte HTML 
    const reportHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Importación</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f4f4f4;
                text-align: center;
                padding: 20px;
            }
            .container {
                background: white;
                max-width: 600px;
                margin: auto;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 18px;
                color: #555;
            }
            canvas {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Reporte de Importación de Datos MySQL</h1>
            <p>Tiempo de importación: <strong>${importTime.toFixed(4)}</strong> segundos</p>
            <canvas id="myChart"></canvas>
        </div>
        <script>
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Tiempo de Importación', 'Otros'],
                    datasets: [{
                        data: [${importTime.toFixed(4)}, 10 - ${importTime.toFixed(4)}],
                        backgroundColor: ['#36a2eb', '#ff6384']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Tiempo de Importación' }
                    }
                }
            });
        </script>
    </body>
    </html>`;

    // Guardar el reporte
    fs.writeFileSync('reporte.html', reportHTML);
    console.log("Reporte generado: 'reporte.html'");
}

importCSV();
connection.end();
