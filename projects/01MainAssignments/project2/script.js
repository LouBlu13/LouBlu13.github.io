//*DO NOT CHANGE THIS FILE*//

// Variable, in der später alle Daten aus student.json gespeichert werden
var student;

// Lädt die student.json-Datei
fetch("student.json")
  .then(function (response) {
    // Prüft, ob die Anfrage erfolgreich war
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Wandelt die Antwort in JSON-Daten um
    return response.json();
  })
  .then(function (data) {
    // Speichert die JSON-Daten in der Variablen student
    student = data;

    // Ruft die Funktion auf, die die Projektkarten erstellt
    createProjectCard();
  })
  .catch(function (error) {
    // Gibt Fehlermeldung aus, falls etwas beim Laden schiefgeht
    console.error("There was a problem fetching the data:", error);
  });


// ------------------------------------------------
// --- Funktion zum Erstellen aller Projektkarten ---
// ------------------------------------------------
function createProjectCard() {

  // Setzt den Namen des Schülers in den Header
  var headerName = document.querySelector(".header-container h2");
  headerName.textContent = student.name;

  // Schleife: geht durch alle Projekte in student.projects
  for (var i = 0; i < student.projects.length; i++) {

    var project = student.projects[i];

    // ---------------------------
    // SECTION FÜR EIN PROJEKT
    // ---------------------------
    var section = document.createElement("section");
    section.id = project.folder; // z.B. "projectA"
    section.classList.add("project-container", "container");

    // Trennlinie / Designelement
    var division = document.createElement("div");
    division.classList.add("division");
    section.appendChild(division);

    // Überschrift (Projekt-Folder Name)
    var contentText = document.createElement("div");
    contentText.classList.add("content-text");

    var h1 = document.createElement("h1");
    h1.textContent = project.folder;

    contentText.appendChild(h1);
    section.appendChild(contentText);

    // Fügt die Section in den Container auf der Webseite ein
    document.querySelector(".projects-container").appendChild(section);

    // ---------------------------
    // ARTICLE, das mehrere Karten enthält
    // ---------------------------
    var article = document.createElement("article");
    article.classList.add("project");

    // Schleife für die Anzahl der Projektkarten in diesem Projekt
    for (var j = 0; j < project.projectNumber; j++) {

      // Eine einzelne Projektkarte ("Card")
      var card = document.createElement("div");
      card.classList.add("card");

      // ID wie: "projectA1", "projectA2", ...
      var cardId = project.folder + (j + 1);
      card.id = cardId;

      // Klick-Funktion zum Öffnen des Projekts
      card.onclick = function () {
        openProject();
      };

      // ---------------------------
      // Hintergrundbild der Karte setzen
      // ---------------------------
      var imgUrl =
        "./projects/" +
        project.folder +
        "/project" +
        (j + 1) +
        "/thumbnail." +
        student.thumbnailExtension;

      card.style.background = "url(" + imgUrl + ") center center/cover";

      // ---------------------------
      // INFO-BEREICH DER KARTE
      // ---------------------------
      var projectInfo = document.createElement("div");
      projectInfo.classList.add("project-info");

      var projectBio = document.createElement("div");
      projectBio.classList.add("project-bio");

      var h3 = document.createElement("h3");
      h3.textContent = "project " + (j + 1); // z.B. "project 1"

      projectBio.appendChild(h3);
      projectInfo.appendChild(projectBio);
      card.appendChild(projectInfo);

      // Karte in das article einfügen
      article.appendChild(card);
    }

    // article in die Section einfügen
    section.appendChild(article);
  }
}


// ------------------------------------------------
// Funktion: prüft, ob eine Datei existiert
// ------------------------------------------------
function fileExists(url) {
  var http = new XMLHttpRequest();

  // HEAD = nur prüfen, ob Datei existiert, ohne Inhalt zu laden
  http.open("HEAD", url, false);

  // Anfrage senden
  http.send();

  // Wenn Status NICHT 404 ist → existiert Datei
  return http.status != 404;
}
