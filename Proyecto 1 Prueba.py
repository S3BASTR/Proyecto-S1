import random

def asignar_estudiantes():
    # Datos iniciales
    salones = ["Salon 302", "Salon 201", "Salon 202", "Salon 101", "Salon 102","Salon a","Salon b","Salon c","Salon d","Salon e"]
    puestos_por_salon = [31, 33, 32, 31, 30,32,32,32,31,30]
    grados = [601,602,701,702, 801,802, 901,902,1001, 1002]


    # Crear una lista con la cantidad total de estudiantes
    estudiantes = [f"Grado {grado} - Estudiante {i+1}" for grado in grados for i in range(3)]

    # Mezclar aleatoriamente la lista de estudiantes
    random.shuffle(estudiantes)

    # Asignar estudiantes a los salones sin repetir en puestos cercanos
    asignaciones = {}
    for i in range(len(salones)):
        asignaciones[salones[i]] = []
        for grado in grados:
            # Seleccionar estudiantes de un grado específico
            estudiantes_grado = [estudiante for estudiante in estudiantes if f"Grado {grado}" in estudiante]

            for j in range(puestos_por_salon[i]):
                # Verificar que hay estudiantes disponibles antes de hacer pop
                if estudiantes_grado:
                    asignaciones[salones[i]].append(estudiantes_grado.pop(0))
                    # Evitar repetir estudiantes del mismo grado en puestos cercanos
                    while j > 0 and asignaciones[salones[i]][j].split()[1] == asignaciones[salones[i]][j-1].split()[1]:
                        random.shuffle(estudiantes_grado)
                        if estudiantes_grado:
                            asignaciones[salones[i]][j] = estudiantes_grado.pop(0)
                        else:
                            break
                else:
                    break  # Salir del bucle si no hay más estudiantes disponibles

    return asignaciones

# Ejecutar la función y obtener las asignaciones
resultados = asignar_estudiantes()

# Imprimir los resultados
for salon, estudiantes in resultados.items():
    print(f"{salon}: {estudiantes}")



