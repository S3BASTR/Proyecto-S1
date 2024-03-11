// Variables globales para almacenar las listas originales de estudiantes
var originalLists = {};

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


// Función para asignar los estudiantes aleatoriamente a cada salón sin seguir una secuencia específica
function assignStudentsRandomly() {
    // Obtener la lista de todos los estudiantes de todos los salones
    var allStudents = [];
    for (var salon of ["11A", "9B", "6A", "8A", "5C", "8B", "6B", "9A", "6C", "7A", "10A", "7B", "10B"]) {
        var infoData = getInfoData(salon);
        var students = infoData.slice(3); // Ignorar los primeros 3 elementos que contienen información de la clase
        allStudents = allStudents.concat(students);
        originalLists[salon] = students.slice(); // Hacer una copia de la lista original
    }

    // Mezclar la lista completa de estudiantes de manera aleatoria
    var shuffledStudents = shuffleArray(allStudents);

    // Asignar los estudiantes aleatoriamente a cada salón
    var startIndex = 0;
    for (var salon of ["11A", "9B", "6A", "8A", "5C", "8B", "6B", "9A", "6C", "7A", "10A", "7B", "10B"]) {
        var infoData = getInfoData(salon);
        var cantidadEstudiantes = infoData.length - 3;
        var estudiantesSalon = shuffledStudents.slice(startIndex, startIndex + cantidadEstudiantes);
        startIndex += cantidadEstudiantes;
        updateSalon(salon, estudiantesSalon);
    }



    // Asignar los estudiantes aleatoriamente a cada salón
    var startIndex = 0;
    for (var salon of customSequence) {
        var infoData = getInfoData(salon);
        var cantidadEstudiantes = infoData.length - 3;
        var estudiantesSalon = allStudents.slice(startIndex, startIndex + cantidadEstudiantes);
        startIndex += cantidadEstudiantes;
        updateSalon(salon, estudiantesSalon);
    }
}

function organizeLists() {
    // Ordenar cada lista de estudiantes numéricamente de menor a mayor
    for (var salon of ["11A", "9B", "6A", "8A", "5C", "8B", "6B", "9A", "6C", "7A", "10A", "7B", "10B"]) {
        var originalList = originalLists[salon];
        originalList.sort(function (a, b) {
            var numA = parseInt(a.match(/\d+/)[0], 10);
            var numB = parseInt(b.match(/\d+/)[0], 10);
            return numA - numB;
        });
        updateSalon(salon, originalList);
    }
}


// Función para mezclar un array
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Mientras queden elementos a mezclar
    while (0 !== currentIndex) {
        // Seleccionar un elemento sin mezclar restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Intercambiarlo con el elemento actual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



// Función para actualizar la información de un salón con los estudiantes dados
function updateSalon(title, students) {
    var salonElement = document.querySelector(".box[data-title='" + title + "']");
    var ul = document.createElement("ul");

    // Objeto para almacenar la cantidad de estudiantes por curso en el salón
    var estudiantesPorCurso = {};

    students.forEach(function (student) {
        var li = document.createElement("li");
        li.textContent = student;
        ul.appendChild(li);

        // Obtener el curso del estudiante
        var curso = student.match(/Curso ([^\s]+)/)[1];

        // Incrementar la cantidad de estudiantes para ese curso en el salón
        if (estudiantesPorCurso[curso]) {
            estudiantesPorCurso[curso]++;
        } else {
            estudiantesPorCurso[curso] = 1;
        }
    });

    // Mostrar el título del salón
    var titleDiv = document.createElement("div");
    titleDiv.textContent = "Información del cuadro " + title;
    salonElement.appendChild(titleDiv);

    // Agregar la lista de estudiantes
    salonElement.appendChild(ul);

    // Mostrar la cantidad total de estudiantes en el salón
    var totalEstudiantesDiv = document.createElement("div");
    totalEstudiantesDiv.textContent = "Total de estudiantes: " + students.length;
    salonElement.appendChild(totalEstudiantesDiv);

    // Mostrar la cantidad de estudiantes por curso
    var cursosDiv = document.createElement("div");
    cursosDiv.textContent = "Cantidad de estudiantes por curso:";
    salonElement.appendChild(cursosDiv);

    // Mostrar la cantidad de estudiantes por curso de manera organizada
    for (var curso in estudiantesPorCurso) {
        var cantidad = estudiantesPorCurso[curso];
        var cursoInfo = document.createElement("div");
        cursoInfo.textContent = curso + ": " + cantidad;
        salonElement.appendChild(cursoInfo);
    }
}
