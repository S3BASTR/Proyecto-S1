const estudiantesPorGrado = {
    quinto: {
        "5c": Array.from({ length: 31 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
     },
    
    
    sexto: {
      "6a": Array.from({ length: 31 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` })),
      "6b": Array.from({ length: 31 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` })),
      "6c": Array.from({ length: 30 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
    },
    septimo: {
      "7a": Array.from({ length: 28 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` })),
      "7b": Array.from({ length: 27 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
    },
    octavo: {
      "8a": Array.from({ length: 33 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` })),
      "8b": Array.from({ length: 32 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
    },
    noveno: {
      "9a": Array.from({ length: 20 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` })),
      "9b": Array.from({ length: 20 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
    },
    decimo: {
      "10a": Array.from({ length: 26 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` })),
      "10b": Array.from({ length: 26 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
    },
    once: {
      "11a": Array.from({ length: 28 }, (_, i) => ({ id: i + 1, nombre: `Estudiante ${i + 1}` }))
    }
  };
  
  console.log(estudiantesPorGrado);
  
