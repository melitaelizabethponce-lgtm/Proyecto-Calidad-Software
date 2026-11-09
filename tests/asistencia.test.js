const asistencia = require("../src/asistencia");

beforeEach(() => {
  asistencia.limpiarDatos();
});

describe("Sistema de asistencia - versión inicial", () => {
  test("registra un estudiante válido", () => {
    expect(asistencia.registrarEstudiante("E01", "María", "Software")).toBe(true);
    expect(asistencia.listarEstudiantes()).toHaveLength(1);
  });

  test("no registra un estudiante sin identificador", () => {
    expect(asistencia.registrarEstudiante("", "María", "Software")).toBe(false);
  });

  test("no permite identificadores repetidos", () => {
    asistencia.registrarEstudiante("E01", "María", "Software");
    expect(asistencia.registrarEstudiante("E01", "Pedro", "Redes")).toBe(false);
  });

  test("registra asistencia de un estudiante existente", () => {
    asistencia.registrarEstudiante("E01", "María", "Software");
    expect(asistencia.registrarAsistencia("E01", "2026-11-09", "Presente")).toBe(true);
    expect(asistencia.buscarAsistencia("E01")).toHaveLength(1);
  });

  test("no registra asistencia para un estudiante inexistente", () => {
    expect(asistencia.registrarAsistencia("E99", "2026-11-09", "Presente")).toBe(false);
  });

  test("cuenta presentes y atrasos como asistencia", () => {
    asistencia.registrarEstudiante("E01", "María", "Software");
    asistencia.registrarAsistencia("E01", "2026-11-09", "Presente");
    asistencia.registrarAsistencia("E01", "2026-11-10", "Atrasado");
    expect(asistencia.contarAsistencias("E01")).toBe(2);
  });

  test("genera el resumen de asistencia", () => {
    asistencia.registrarEstudiante("E01", "María", "Software");
    asistencia.registrarAsistencia("E01", "2026-11-09", "Presente");
    asistencia.registrarAsistencia("E01", "2026-11-10", "Ausente");
    expect(asistencia.obtenerResumen("E01")).toEqual({
      estudiante: "E01",
      total: 2,
      presentes: 1,
      ausentes: 1
    });
  });
});
