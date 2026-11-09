
// VERSIÓN REFACTORIZADA
// Sistema de control de asistencia universitaria.

// Almacenamiento de estudiantes y asistencias.
const estudiantes = [];
const asistencias = [];

// Comprueba si un valor está vacío.
function estaVacio(valor) {
  return valor === null || valor === undefined || valor === "";
}

// Busca un estudiante por su identificador.
function encontrarEstudiante(id) {
  return estudiantes.find(estudiante => estudiante.id === id);
}

// Comprueba si una asistencia ya fue registrada.
function asistenciaDuplicada(id, fecha) {
  return asistencias.some(asistencia =>
    asistencia.id === id && asistencia.fecha === fecha
  );
}

// Registra un nuevo estudiante.
function registrarEstudiante(id, nombre, carrera) {
  const campos = [
    { valor: id, mensaje: "El ID es obligatorio" },
    { valor: nombre, mensaje: "El nombre es obligatorio" },
    { valor: carrera, mensaje: "La carrera es obligatoria" }
  ];

  for (const campo of campos) {
    if (estaVacio(campo.valor)) {
      console.log(campo.mensaje);
      return false;
    }
  }

  if (encontrarEstudiante(id)) {
    console.log("El estudiante ya existe");
    return false;
  }

  estudiantes.push({ id, nombre, carrera });
  console.log("Estudiante registrado");
  return true;
}

// Registra la asistencia de un estudiante.
function registrarAsistencia(id, fecha, estado) {
  const campos = [
    { valor: id, mensaje: "El ID es obligatorio" },
    { valor: fecha, mensaje: "La fecha es obligatoria" },
    { valor: estado, mensaje: "El estado es obligatorio" }
  ];

  for (const campo of campos) {
    if (estaVacio(campo.valor)) {
      console.log(campo.mensaje);
      return false;
    }
  }

  if (!encontrarEstudiante(id)) {
    console.log("No existe el estudiante");
    return false;
  }

  if (asistenciaDuplicada(id, fecha)) {
    console.log("La asistencia ya fue registrada");
    return false;
  }

  asistencias.push({ id, fecha, estado });
  console.log("Asistencia registrada");
  return true;
}

// Busca todas las asistencias de un estudiante.
function buscarAsistencia(id) {
  return asistencias.filter(asistencia => asistencia.id === id);
}

// Cuenta las asistencias presentes y atrasadas.
function contarAsistencias(id) {
  let total = 0;

  for (const asistencia of asistencias) {
    const corresponde = asistencia.id === id;
    const asistio = ["Presente", "Atrasado"].includes(asistencia.estado);

    if (corresponde && asistio) {
      total++;
    }
  }

  return total;
}

// Devuelve una copia de la lista de estudiantes.
function listarEstudiantes() {
  return estudiantes.slice();
}

// Genera el resumen de asistencia de un estudiante.
function obtenerResumen(id) {
  let total = 0;
  let presentes = 0;
  let ausentes = 0;

  for (const asistencia of asistencias) {
    if (asistencia.id !== id) {
      continue;
    }

    total++;

    if (asistencia.estado === "Presente") {
      presentes++;
    } else if (asistencia.estado === "Ausente") {
      ausentes++;
    }
  }

  return {
    estudiante: id,
    total,
    presentes,
    ausentes
  };
}

// Elimina todos los datos almacenados.
function limpiarDatos() {
  estudiantes.length = 0;
  asistencias.length = 0;
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

// Exportación de funciones.
module.exports = {
  registrarEstudiante,
  registrarAsistencia,
  buscarAsistencia,
  contarAsistencias,
  listarEstudiantes,
  obtenerResumen,
  limpiarDatos
};
