# Proyecto de Calidad de Software

Proyecto académico en JavaScript para medir y mejorar la calidad de un sistema sencillo de control de asistencia universitaria, tomando como referencia ISO/IEC 25010.

## Requisitos
- Node.js 18 o superior
- npm
- Git

## Instalar dependencias
```bash
npm install
```

## Ejecutar el programa
```bash
npm start
```

## Ejecutar pruebas
```bash
npm test
npm run test:coverage
```

## Medir la versión inicial
Ejecutar los comandos por separado y guardar capturas en `evidencias/metricas-iniciales/`:
```bash
npm run metrics:size
npm run metrics:lint
npm run metrics:maintainability
npm run metrics:duplication
npm run test:coverage
```

`npm run metrics` ejecuta todos los análisis en secuencia. ESLint puede reportar problemas en esta versión inicial: forman parte del diagnóstico y se corregirán durante la refactorización.

## Ramas Git
La rama inicial solicitada es `medicion-inicial`. Después de guardar el estado inicial, crear la rama:
```bash
git add .
git commit -m "Versión inicial y medición de calidad"
git switch -c refactorizacion
```

## Importante para el informe
No inventar resultados. Registrar los valores que aparezcan realmente en las herramientas antes y después de refactorizar.
