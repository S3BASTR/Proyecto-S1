// Función para mostrar la información del salón
function showInfo(title) {
    var infoTitle = document.getElementById("infoTitle");
    var infoList = document.getElementById("infoList");

    infoTitle.textContent = "Información del cuadro " + title;
    infoList.innerHTML = "";

    var infoData = getInfoData(title);

    var ul = document.createElement("ul");
    infoData.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });

    infoList.appendChild(ul);

    // Mostrar la cantidad de estudiantes por grado
    showStudentCountByGrade(infoData);

    document.getElementById("infoContainer").style.display = "flex";
}

// Función para obtener información adicional según el título
function getInfoData(title) {
    // Debes definir esta función según tus necesidades
    switch (title) {
        case "11A":
            return generateStudentList("11A", 28);
        case "6A":
            return generateStudentList("6A", 31);
        case "8B":
            return generateStudentList("8B", 32);
        case "8A":
            return generateStudentList("8A", 33);
        case "6B":
            return generateStudentList("6B", 31);
        case "6C":
            return generateStudentList("6C", 30);
        case "7B":
            return generateStudentList("7B", 27);
        case "7A":
            return generateStudentList("7A", 28);
        case "5C":
            return generateStudentList("5C", 31);
        case "10A":
            return generateStudentList("10A", 26);
        case "9A":
            return generateStudentList("9A", 20);
        case "9B":
            return generateStudentList("9B", 20);
        case "10B":
            return generateStudentList("10B", 26);
        default:
            return ["No hay información adicional disponible"];
    }
}

// Función para mostrar la cantidad de estudiantes por grado
function showStudentCountByGrade(infoData) {
    var gradeCount = {};

    // Contar la cantidad de estudiantes por grado
    for (var i = 3; i < infoData.length; i++) {
        var grade = infoData[i].split(" - ")[1]; // Obtener el grado desde el texto del estudiante
        if (gradeCount[grade]) {
            gradeCount[grade]++;
        } else {
            gradeCount[grade] = 1;
        }
    }

    // Mostrar la información en la lista
    var ul = document.createElement("ul");
    ul.innerHTML = "<li>Cantidad de Estudiantes por Grado:</li>";
    for (var grade in gradeCount) {
        var li = document.createElement("li");
        li.textContent = grade + ": " + gradeCount[grade] + " estudiantes";
        ul.appendChild(li);
    }

    document.getElementById("infoList").appendChild(ul);
}

// Función para ordenar la cantidad de estudiantes por curso en el salón

function showStudentCountByCourse(salon, estudiantesSalon) {
    // Lista de cursos en el orden especificado
    var courses = ["5C", "6A", "6B", "6C", "7A", "7B", "8A", "8B", "9A", "9B", "10A", "10B", "11A"];

    // Mostrar la información en la lista en orden
    var ul = document.createElement("ul");
    ul.innerHTML = "<li>Cantidad de Estudiantes por Curso en " + salon + ":</li>";
    courses.forEach(function(course) {
        var li = document.createElement("li");
        var count = getCountByCourse(estudiantesSalon, course);
        li.textContent = "Curso " + course + ": " + count + " estudiantes";
        ul.appendChild(li);
    });

    document.getElementById("infoList").appendChild(ul);
}

// Función para contar la cantidad de estudiantes por curso
function getCountByCourse(students, course) {
    var count = 0;
    students.forEach(function(student) {
        if (student.includes("Curso " + course)) {
            count++;
        }
    });
    return count;
}

// Función para mostrar la cantidad total de estudiantes después de la mezcla
function showTotalStudentCount(totalStudentCount) {
    var ul = document.createElement("ul");
    ul.innerHTML = "<li>Total de Estudiantes Después de Mezclar:</li>" +
                   "<li>" + totalStudentCount + " estudiantes</li>";
    
    document.getElementById("infoList").appendChild(ul);
}

// Función para generar la lista de estudiantes para cada salón
function generateStudentList(salon, cantidad) {
    var infoList = [
        "Información del cuadro " + salon,
        "Cantidad de estudiantes: " + cantidad,
        "Salón " + salon,
    ];

    for (var i = 1; i <= cantidad; i++) {
        infoList.push("Estudiante " + i + " - Curso " + salon);
    }

    return infoList;
}

// Función para ocultar la información del salón
function hideInfo() {
    document.getElementById("infoContainer").style.display = "none";
}

function assignStudentsRandomly(students, maxStudentsPerSalon) {
    var currentIndex = students.length,
        randomIndex,
        temporaryValue,
        salonIndex = 0,
        assignedStudents = [];

    // Crear un objeto para almacenar los estudiantes por grado
    var studentsByGrade = {};
    students.forEach(student => {
        var grade = student.split(" - ")[1];
        if (!studentsByGrade[grade]) {
            studentsByGrade[grade] = [];
        }
        studentsByGrade[grade].push(student);
    });

    // Crear una lista con todos los grados
    var grades = Object.keys(studentsByGrade);

    // Mezclar la lista de grados
    grades = grades.sort(() => Math.random() - 0.5);

    // Asignar estudiantes a los salones de manera equitativa
    grades.forEach(grade => {
        studentsByGrade[grade].forEach(student => {
            assignedStudents.push(student);
            salonIndex = (salonIndex + 1) % maxStudentsPerSalon; // Ciclar entre los salones
        });
    });

    return assignedStudents;
}



// Función para mezclar los estudiantes entre todos los salones
function shuffleLists() {
    // Limpiar el contenido existente en el contenedor de la lista antes de agregar la nueva lista
    document.getElementById("infoList").innerHTML = "";

    // Variable para contener a todos los estudiantes
    var allStudents = [];

    // Recorrer cada salón para obtener los estudiantes y agregarlos a la lista total
    ["11A", "6A", "8B", "8A", "6B", "6C", "7B", "7A", "5C", "10A", "9A", "9B", "10B"].forEach(function(salon) {
        var infoData = getInfoData(salon);
        var students = infoData.slice(3); // Ignorar los primeros 3 elementos que contienen información de la clase
        allStudents = allStudents.concat(students); // Agregar los estudiantes de este salón a la lista total
    });

    // Mezclar la lista de estudiantes
    allStudents = assignStudentsRandomly(allStudents);

    // Asignar los estudiantes mezclados a cada salón
    var startIndex = 0;
    ["11A", "6A", "8B", "8A", "6B", "6C", "7B", "7A", "5C", "10A", "9A", "9B", "10B"].forEach(function(salon) {
        var infoData = getInfoData(salon);
        var cantidadEstudiantes = infoData.length - 2;
        var estudiantesSalon = allStudents.slice(startIndex, startIndex + cantidadEstudiantes);
        startIndex += cantidadEstudiantes;
        updateSalon(salon, estudiantesSalon);

        // Mostrar la cantidad de estudiantes por curso en el salón después de mezclar
        showStudentCountByCourse(salon, estudiantesSalon);
    });

    // Mostrar la cantidad total de estudiantes después de la mezcla
    showTotalStudentCount(allStudents.length);
}

function assignStudentsRandomly(students) {
    var currentIndex = students.length,
        randomIndex,
        temporaryValue;

    // Calcular el mínimo y máximo de estudiantes por curso
    var minStudentsPerCourse = Math.min(4, Math.floor(students.length / 13));
    var maxStudentsPerCourse = 4;

    // Mientras haya elementos para mezclar
    while (currentIndex !== 0) {
        // Seleccionar un elemento sin mezclar
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Intercambiarlo con el elemento actual
        temporaryValue = students[currentIndex];
        students[currentIndex] = students[randomIndex];
        students[randomIndex] = temporaryValue;

        // Verificar que no haya más de 4 estudiantes por salón del mismo curso
        var currentCourse = students[currentIndex].substring(students[currentIndex].length -2);
        var studentsWithSameCourse = 1;
        for (var i = currentIndex - 2; i >= 0; i--) {
            var course = students[i].substring(students[i].length - 2);
            if (course === currentCourse) {
                studentsWithSameCourse++;
                if (studentsWithSameCourse > maxStudentsPerCourse) {
                    // Si hay más de 4 estudiantes del mismo curso en el mismo salón, intercambiar con un elemento anterior
                    temporaryValue = students[i];
                    students[i] = students[randomIndex];
                    students[randomIndex] = temporaryValue;
                    break;
                }
            } else {
                // Si encontramos un estudiante de un curso diferente, detener la verificación
                break;
            }
        }
    }

    return students;
}




// Función para organizar los estudiantes en sus salones originales
function organizeLists() {
    for (var salon of ["11A", "6A", "8B", "8A", "6B", "6C", "7B", "7A", "5C", "10A", "9A", "9B", "10B"]) {
        var infoData = getInfoData(salon);
        var students = infoData.slice(3); // Ignorar los primeros 3 elementos que contienen información de la clase
        updateSalon(salon, students);
    }
}

// Función para actualizar la información de un salón con los estudiantes dados
function updateSalon(title, students) {
    var salonElement = document.querySelector(".box[data-title='" + title + "']");
    var ul = document.createElement("ul");
    students.forEach(function (student) {
        var li = document.createElement("li");
        li.textContent = student;
        ul.appendChild(li);
    });

    // Limpiar el salón antes de agregar los estudiantes
    salonElement.innerHTML = "";

    // Mostrar el título del salón
    var titleDiv = document.createElement("div");
    titleDiv.textContent = "Información del cuadro " + title;
    salonElement.appendChild(titleDiv);

    // Agregar la lista de estudiantes
    salonElement.appendChild(ul);
}
