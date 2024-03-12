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

// Resto del código...


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

// Función para mezclar los estudiantes entre todos los salones
// Función para mezclar los estudiantes entre todos los salones
// Función para mezclar los estudiantes entre todos los salones
function shuffleLists() {
    // Crear una lista de todos los estudiantes
    var allStudents = [];
    var totalStudentCount = 0;  // Variable para llevar un seguimiento del total de estudiantes

    for (var salon of ["11A", "6A", "8B", "8A", "6B", "6C", "7B", "7A", "5C", "10A", "9A", "9B", "10B"]) {
        var infoData = getInfoData(salon);
        var students = infoData.slice(3); // Ignorar los primeros 3 elementos que contienen información de la clase
        allStudents = allStudents.concat(students);
        totalStudentCount += students.length;  // Actualizar el total de estudiantes
    }

    // Mezclar la lista de estudiantes
    allStudents = assignStudentsRandomly(allStudents);

    // Asignar los estudiantes mezclados a cada salón
    var startIndex = 0;
    for (var salon of ["11A", "6A", "8B", "8A", "6B", "6C", "7B", "7A", "5C", "10A", "9A", "9B", "10B"]) {
        var infoData = getInfoData(salon);
        var cantidadEstudiantes = infoData.length - 3;
        var estudiantesSalon = allStudents.slice(startIndex, startIndex + cantidadEstudiantes);
        startIndex += cantidadEstudiantes;
        updateSalon(salon, estudiantesSalon);

        // Mostrar la cantidad de estudiantes por curso en el salón después de mezclar
        showStudentCountByCourse(salon, estudiantesSalon);
    }

    // Mostrar la cantidad total de estudiantes después de la mezcla
    showTotalStudentCount(totalStudentCount);
}

// Función para mostrar la cantidad de estudiantes por curso en el salón después de mezclar
function showStudentCountByCourse(salon, estudiantesSalon) {
    var courseCount = {};

    // Contar la cantidad de estudiantes por curso en el salón
    for (var i = 0; i < estudiantesSalon.length; i++) {
        var course = estudiantesSalon[i].split(" - ")[1]; // Obtener el curso desde el texto del estudiante
        if (courseCount[course]) {
            courseCount[course]++;
        } else {
            courseCount[course] = 1;
        }
    }

    // Mostrar la información en la lista
    var ul = document.createElement("ul");
    ul.innerHTML = "<li>Cantidad de Estudiantes por Curso en " + salon + ":</li>";
    for (var course in courseCount) {
        var li = document.createElement("li");
        li.textContent = course + ": " + courseCount[course] + " estudiantes";
        ul.appendChild(li);
    }

    document.getElementById("infoList").appendChild(ul);
}


// Función para mostrar la cantidad total de estudiantes después de la mezcla
function showTotalStudentCount(totalStudentCount) {
    var ul = document.createElement("ul");
    ul.innerHTML = "<li>Total de Estudiantes Después de Mezclar:</li>" +
                   "<li>" + totalStudentCount + " estudiantes</li>";
    
    document.getElementById("infoList").appendChild(ul);
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

// Función para asignar estudiantes aleatoriamente sin repetir del mismo curso seguidos
function assignStudentsRandomly(students) {
    var currentIndex = students.length, randomIndex, temporaryValue;

    // Mientras haya elementos para mezclar
    while (currentIndex !== 0) {
        // Seleccionar un elemento sin mezclar
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Intercambiarlo con el elemento actual
        temporaryValue = students[currentIndex];
        students[currentIndex] = students[randomIndex];
        students[randomIndex] = temporaryValue;

        // Verificar que no haya estudiantes del mismo curso seguidos
        if (currentIndex > 0 && students[currentIndex].includes("Curso " + students[currentIndex - 1].substring(students[currentIndex - 1].length - 3))) {
            // Si hay estudiantes del mismo curso seguidos, intercambiar con un elemento anterior
            temporaryValue = students[currentIndex - 1];
            students[currentIndex - 1] = students[randomIndex];
            students[randomIndex] = temporaryValue;
        }
    }

    return students;
}
