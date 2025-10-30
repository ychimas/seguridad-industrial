// Configuración del Curso - Seguridad industrial
// Generado automáticamente por SF CoursePress

const cursoConfig = {
  nombre: "Seguridad industrial",
  descripcion: "este curso abarcara todo lo referente a la seguridad industrial",
  categoria: "Seguridad Industrial",
  version: "1.0",
  lecciones: [
  {
    "id": 1,
    "name": "Introduccion a la seguridad industrial",
    "moments": [
      {
        "id": 1,
        "type": "slider",
        "name": "momento1_1",
        "file": "lecciones/leccion-1-momento-1.html"
      },
      {
        "id": 2,
        "type": "slider",
        "name": "momento1_2",
        "file": "lecciones/leccion-1-momento-2.html"
      },
      {
        "id": 3,
        "type": "slider",
        "name": "momento1_3",
        "file": "lecciones/leccion-1-momento-3.html"
      }
    ]
  },
  {
    "id": 2,
    "name": "La seguridad industrial y sus beneficios sociales",
    "moments": [
      {
        "id": 1,
        "type": "slider",
        "name": "momento2_1",
        "file": "lecciones/leccion-2-momento-1.html"
      },
      {
        "id": 2,
        "type": "slider",
        "name": "momento2_2",
        "file": "lecciones/leccion-2-momento-2.html"
      },
      {
        "id": 3,
        "type": "slider",
        "name": "momento2_3",
        "file": "lecciones/leccion-2-momento-3.html"
      },
      {
        "id": 4,
        "type": "slider",
        "name": "momento2_4",
        "file": "lecciones/leccion-2-momento-4.html"
      }
    ]
  },
  {
    "id": 3,
    "name": "La importancia de la seguridad industrial hoy día",
    "moments": [
      {
        "id": 1,
        "type": "slider",
        "name": "momento3_1",
        "file": "lecciones/leccion-3-momento-1.html"
      },
      {
        "id": 2,
        "type": "slider",
        "name": "momento3_2",
        "file": "lecciones/leccion-3-momento-2.html"
      },
      {
        "id": 3,
        "type": "slider",
        "name": "momento3_3",
        "file": "lecciones/leccion-3-momento-3.html"
      }
    ]
  }
],
  
  // Configuración de navegación
  navegacion: {
    mostrarMenu: true,
    permitirSaltar: false,
    mostrarProgreso: true
  },
  
  // Configuración SCORM
  scorm: {
    version: "1.2",
    trackingActivo: true,
    guardarProgreso: true
  }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cursoConfig;
}