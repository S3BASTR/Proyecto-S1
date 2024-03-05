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

// Función para asignar los estudiantes secuencialmente a cada salón de manera aleatoria
function assignStudentsRandomly() {
    // Secuencia personalizada de los salones
    var customSequence = ["11A", "9B", "6A", "8A", "5C", "8B", "6B", "9A", "6C", "7A", "10A", "7B", "10B"];

    // Crear un objeto para almacenar a los estudiantes de cada curso
    var studentsByCourse = {};
    for (var salon of customSequence) {
        var infoData = getInfoData(salon);
        var students = infoData.slice(3); // Ignorar los primeros 3 elementos que contienen información de la clase
        studentsByCourse[salon] = shuffleArray(students); // Mezclar los estudiantes de este curso
        originalLists[salon] = students.slice(); // Hacer una copia de la lista original
    }

    // Asignar los estudiantes secuencialmente a cada salón
    var allStudents = [];
    for (var i = 0; i < 33; i++) { // 33 es la cantidad máxima de estudiantes entre todos los salones
        for (var salon of customSequence) {
            var students = studentsByCourse[salon];
            if (i < students.length) {
                allStudents.push(students[i]);
            }
        }
    }

    // Asignar los estudiantes secuencialmente a cada salón
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

// En algún punto donde quieras asignar estudiantes secuencialmente, llama a la función:
// assignStudentsSequentially();
