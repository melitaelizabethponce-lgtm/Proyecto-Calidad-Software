
const fs = require('fs');
const path = require('path');
const escomplex = require('typhonjs-escomplex');

const archivo = path.join(__dirname, '..', 'src', 'asistencia.js');
const codigo = fs.readFileSync(archivo, 'utf8');

try {
    const resultado = escomplex.analyzeModule(codigo);

    console.log('\n===== MÉTRICAS DE COMPLEJIDAD FINAL. =====\n');

    console.log('Complejidad ciclomática promedio:',
        resultado.aggregate.cyclomatic);

    console.log('Complejidad cognitiva:',
        resultado.aggregate.cognitive);

    console.log('\n===== FUNCIONES ANALIZADAS =====\n');

    resultado.methods.forEach((metodo) => {
        console.log({
            nombre: metodo.name,
            complejidad: metodo.cyclomatic,
            lineas: metodo.sloc ? metodo.sloc.logical : 'No disponible'
        });
    });

    console.log('\n===== RESULTADO COMPLETO =====\n');

    fs.writeFileSync(
        path.join(__dirname, 'complejidad-final.json'),
        JSON.stringify(resultado, null, 2)
    );

    console.log('Informe guardado en informes/complejidad-final.json');

} catch (error) {
    console.error('Error al analizar el código:', error.message);
}
