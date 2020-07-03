function getAuthorData(firstName, lastName) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const json = JSON.parse(this.response);
      console.log(json);
      const authors = json.author[0];
      // console.log(authors);
      const biography = authors.spotlight;
      // console.log(biography);
      const works = authors.works;
      processData(works, biography, firstName, lastName);
    }
  };
  xhttp.open(
    "GET",
    "https://reststop.randomhouse.com/resources/authors?lastName=" +
      lastName +
      "&firstName=" +
      firstName,
    false
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}

function processData(works, biography, firstName, lastName) {
  let titlesArray = [];
  let innerworks = works.works;
  console.log(works);
  for (let i in innerworks) {
    let worksId = innerworks[i];
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const json = JSON.parse(this.response);
        const bookTitle = json.titleweb;
        titlesArray.push(bookTitle);
      }
    };
    xhttp.open(
      "GET",
      "https://reststop.randomhouse.com/resources/works/" + worksId,
      false
    );
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
  }

  let nameString = "<h2>" + firstName + " " + lastName + "</h2>";
  let biographyString = "<p>" + biography + "</p>";
  let titleString = "<h3>Book Titles:</h3><br>";

  for (let i in titlesArray) {
    titleString += titlesArray[i] + "<br>";
  }

  let fullString =
    "<b>" +
    nameString +
    "</b><br><br>" +
    biographyString +
    "<br><br>" +
    titleString;

  document.getElementById("jsContent").innerHTML = fullString;
}

setTimeout(function () {
  getAuthorData("Christopher", "Paolini");
}, 1000);
