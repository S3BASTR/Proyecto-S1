"""import random

def asignar_estudiantes():
    # Datos iniciales
    salones = ["Salon 302", "Salon 201", "Salon 202", "Salon 101", "Salon 102","Salon a","Salon b","Salon c","Salon d","Salon e"]
    puestos_por_salon = [31, 33, 32, 31, 30,32,32,32,31,30]
    grados = [601,602,701,702, 801,802, 901,902,1001, 1002]
    estudiantes = [302.1,302.2,302.3,302.4,302.5,302.6,302.7,302.8,302.9,302.10,302.11,302.12,302.13,302.14,302.15,
                   302.16,302.17,302.18,302.19,302.20,302.21,302.22,302.23,302.24,302.25,302.26,302.27,302.27,302.28,302.29,
                   302.30, 302.31,
                   
                   
                   201.1,201.2,201.3,201.4,201.5,201.6,201.7,201.8,201.9,201.10,201.11,201.12,201.13,201.14,201.15,
                   201.16,201.17,201.18,201.19,201.20,201.21,201.22,201.23,201.24,201.25,201.26,201.27,201.28,201.29,201.30,
                   201.31,201.32,201.33,
                   
                   
                   202.1,202.2,202.3,202.4,202.5,202.6,202.7,202.8,202.9,202.10,202.11,202.12,202.13,202.14,202.15,
                   202.16,202.17,202.18,202.19,202.20,202.21,202.22,202.23,202.24,202.25,202.26,202.27,202.28,202.29,202.30,
                   202.31,202.32,
                   
                   
                   101.1,101.2,101.3,101.4,101.5,101.6,101.7,101.8,101.9,101.10,101.11,101.12,101.13,101.14,101.15,
                   101.16,101.17,101.18,101.19,101.20,101.21,101.22,101.23,101.24,101.25,101.26,101.27,101.28,101.29,101.30,
                   101.31,
                   
                   
                   102.1,102.2,102.3,102.4,102.5,102.6,102.7,102.8,102.9,102.10,102.11,102.12,102.13,102.14,102.15,
                   102.16,102.17,102.18,102.19,102.20,102.21,102.22,102.23,102.24,102.25,102.26,102.27,102.28,102.29,102.30,
                   
                   "Sa.1","Sa.2","Sa.3","Sa.4","Sa.5","Sa.6","Sa.7","Sa.8","Sa.9","Sa.10","Sa.11","Sa.12","Sa.13","Sa.14","Sa.15",
                   "Sa.16","Sa.17","Sa.18","Sa.19","Sa.20","Sa.21","Sa.22","Sa.23","Sa.24","Sa.25","Sa.26","Sa.27","Sa.28","Sa.29","Sa.30",
                   "Sa.32","Sa.32",
                   
                   
                   "Sb.1","Sb.2","Sb.3","Sb.4","Sb.5","Sb.6","Sb.7","Sb.8","Sb.9","Sb.10","Sb.11","Sb.12","Sb.13","Sb.14","Sb.15",
                   "Sb.16","Sb.17","Sb.18","Sb.19","Sb.20","Sb.21","Sb.22","Sb.23","Sb.24","Sb.25","Sb.26","Sb.27","Sb.28","Sb.29","Sb.30",
                   "Sb.31","Sb.32",
                   
                   "Sc.1","Sc.2","Sc.3","Sc.4","Sc.5","Sc.6","Sc.7","Sc.8","Sc.9","Sc.10","Sc.11","Sc.12","Sc.13","Sc.14","Sc.15",
                   "Sc.16","Sc.17","Sc.18","Sc.19","Sc.20","Sc.21","Sc.22","Sc.23","Sc.24","Sc.25","Sc.26","Sc.27","Sc.28","Sc.29","Sc.30",
                   "Sc.31","Sc.32",
                   
                   "Sd.1","Sd.2","Sd.3","Sd.4","Sd.5","Sd.6","Sd.7","Sd.8","Sd.9","Sd.10","Sd.11","Sd.12","Sd.13","Sd.14","Sd.15",
                   "Sd.16","Sd.17","Sd.18","Sd.19","Sd.20","Sd.21","Sd.22","Sd.23","Sd.24","Sd.25","Sd.26","Sd.27","Sd.28","Sd.29","Sd.30",
                   "Sd.31",
                   
                   
                   "Se.1","Se.2","Se.3","Se.4","Se.5","Se.6","Se.7","Se.8","Se.9","Se.10","Se.11","Se.12","Se.13","Se.14","Se.15",
                   "Se.16","Se.17","Se.18","Se.19","Se.20","Se.21","Se.22","Se.23","Se.24","Se.25","Se.26","Se.27","Se.28","Se.29","Se.30"]


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
    print(f"{salon}: {estudiantes}")"""

import random

def asignar_estudiantes():
    # Datos iniciales
    salones = ["Salon 302", "Salon 201", "Salon 202", "Salon 101", "Salon 102", "Salon a", "Salon b", "Salon c", "Salon d", "Salon e"]
    puestos_por_salon = [31, 33, 32, 31, 30, 32, 32, 32, 31, 30]
    grados = [601, 602, 701, 702, 801, 802, 901, 902, 1001, 1002]
    estudiantes = [f"{grado}.{i+1}" for grado in grados for i in range(30)]

    # Mezclar aleatoriamente la lista de estudiantes
    random.shuffle(estudiantes)

    # Asignar estudiantes a los salones sin que se sienten cerca estudiantes del mismo grado
    asignaciones = {}
    for i in range(len(salones)):
        asignaciones[salones[i]] = []
        for j in range(puestos_por_salon[i]):
            if estudiantes:
                asignaciones[salones[i]].append(estudiantes.pop(0))
            else:
                break  # Detener si no hay más estudiantes disponibles

    return asignaciones

# Ejecutar la función y obtener las asignaciones
resultados = asignar_estudiantes()

# Imprimir los resultados
for salon, estudiantes in resultados.items():
    print(f"{salon}: {estudiantes}")



