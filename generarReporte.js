const fs = require('fs');

const tiempoTotal = fs.readFileSync('tiempo_importacion.txt', 'utf8');

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Importación</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h2>Tiempo de Importación</h2>
    <canvas id="grafico"></canvas>
    <script>
        const ctx = document.getElementById('grafico');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MySQL'],
                datasets: [{
                    label: 'Tiempo de importación (segundos)',
                    data: [${tiempoTotal}],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }]
            }
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('reporte.html', html);
console.log("📊 Reporte generado: reporte.html");
