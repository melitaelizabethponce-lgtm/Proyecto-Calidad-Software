// VERSIÓN INICIAL: contiene oportunidades de mejora para la práctica.
// Sistema sencillo de control de asistencia universitaria.

var estudiantes = [];
var asistencias = [];

function registrarEstudiante(id, nombre, carrera) {
  if (id == null || id == "") {
    console.log("El ID es obligatorio");
    return false;
  }
  if (nombre == null || nombre == "") {
    console.log("El nombre es obligatorio");
    return false;
  }
  if (carrera == null || carrera == "") {
    console.log("La carrera es obligatoria");
    return false;
  }

  for (var i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].id == id) {
      console.log("El estudiante ya existe");
      return false;
    }
  }

  estudiantes.push({ id: id, nombre: nombre, carrera: carrera });
  console.log("Estudiante registrado");
  return true;
}

function registrarAsistencia(id, fecha, estado) {
  if (id == null || id == "") {
    console.log("El ID es obligatorio");
    return false;
  }
  if (fecha == null || fecha == "") {
    console.log("La fecha es obligatoria");
    return false;
  }
  if (estado == null || estado == "") {
    console.log("El estado es obligatorio");
    return false;
  }

  var existe = false;
  for (var i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].id == id) {
      existe = true;
    }
  }

  if (existe == false) {
    console.log("No existe el estudiante");
    return false;
  }

  for (var j = 0; j < asistencias.length; j++) {
    if (asistencias[j].id == id && asistencias[j].fecha == fecha) {
      console.log("La asistencia ya fue registrada");
      return false;
    }
  }

  asistencias.push({ id: id, fecha: fecha, estado: estado });
  console.log("Asistencia registrada");
  return true;
}

function buscarAsistencia(id) {
  var resultado = [];
  for (var i = 0; i < asistencias.length; i++) {
    if (asistencias[i].id == id) {
      resultado.push(asistencias[i]);
    }
  }
  if (resultado.length > 0) {
    return resultado;
  } else {
    return [];
  }
}

function contarAsistencias(id) {
  var total = 0;
  for (var i = 0; i < asistencias.length; i++) {
    if (asistencias[i].id == id) {
      if (asistencias[i].estado == "Presente") {
        total = total + 1;
      } else {
        if (asistencias[i].estado == "Atrasado") {
          total = total + 1;
        }
      }
    }
  }
  return total;
}

function listarEstudiantes() {
  var lista = [];
  for (var i = 0; i < estudiantes.length; i++) {
    lista.push(estudiantes[i]);
  }
  return lista;
}

function obtenerResumen(id) {
  var total = 0;
  var presentes = 0;
  var ausentes = 0;

  for (var i = 0; i < asistencias.length; i++) {
    if (asistencias[i].id == id) {
      total++;
      if (asistencias[i].estado == "Presente") {
        presentes++;
      } else {
        if (asistencias[i].estado == "Ausente") {
          ausentes++;
        }
      }
    }
  }

  return {
    estudiante: id,
    total: total,
    presentes: presentes,
    ausentes: ausentes
  };
}

function limpiarDatos() {
  estudiantes = [];
  asistencias = [];
}

// Datos de demostración al ejecutar el programa directamente.
if (require.main === module) {
  registrarEstudiante("EST001", "Ana Pérez", "Software");
  registrarEstudiante("EST002", "Luis López", "Redes");
  registrarAsistencia("EST001", "2026-11-09", "Presente");
  registrarAsistencia("EST002", "2026-11-09", "Atrasado");
  console.log("Estudiantes:", listarEstudiantes());
  console.log("Asistencias de EST001:", buscarAsistencia("EST001"));
  console.log("Resumen:", obtenerResumen("EST001"));
}

module.exports = {
  registrarEstudiante,
  registrarAsistencia,
  buscarAsistencia,
  contarAsistencias,
  listarEstudiantes,
  obtenerResumen,
  limpiarDatos
};
