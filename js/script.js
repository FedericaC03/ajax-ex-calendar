$(document).ready(function() {

  var date = moment("2018-01-01");

  calendar(date);
  holidays(date);
  prevMonth (date);
  nextMonth (date);

});

//FUNZIONE CALENDARIO: ELENCO GIORNI DEL MESE
function calendar(date) {

  var momentdate = moment(date);
  $(".days").html("");
  var giorniMese = momentdate.daysInMonth()
  var mese = momentdate.format("MMMM");

  $("h1").text(momentdate.format("MMMM " + "YYYY"));

  //TEMPLATE
  var source = $("#calendar").html();
  var template = Handlebars.compile(source);

  //CICLO TUTTI I GIORNI DEL MESE E LI APPENDO ALL'HTML
  for (var i = 1; i <= giorniMese; i++) {
    var newMomentDate = momentdate;

    var context = {
      "day" : i,
      "month": date.format("MMMM"),
      "date" : momentdate.format("YYYY-MM-DD")
    };
    var html = template(context);
    $(".days").append(html);
    newMomentDate.add(1, "day");
    };
  }

//AGGIUNGO AD OGNI FESTIVITA' IL COLORE ROSSO E IL NOME
function holidays(date) {
  var month = date.format("M") - 1;

//EFFETTUO UNA CHIAMATA AJAX ALL'API DELLE FESTIVITA'
  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year":2018,
        "month": month
      },
      "method": "GET",
      "success": function(data) {
        var festivita = data.response;

        for (var i = 0; i < festivita.length; i++) {
          var dataFestivita = festivita[i].date;
          var nomefestivita = festivita[i].name;

          $(".day[data-data='"+dataFestivita+"']").addClass("holiday");
          $(".day[data-data='"+dataFestivita+"'] .holidayName").text( " - " + nomefestivita);
        }
      },
      "error": function(errore) {
        alert("Errore");
      }
    }
  );
}
//FUNZIONE CLICK PREV
function prevMonth (date) {
  var nextMonth = $(".prev");

  nextMonth.click(function(){

    date.subtract(1, "months");

    if (date.year() == 2017) {
      date.add(1, "months");
      alert("Spiacente non abbiamo dati disponibili");
    } else {
      calendar(date);
      holidays(date);
    }
  })
};

//FUNZIONE CLICK NEXT {
function nextMonth (date) {
  var nextMonth = $(".next");

  nextMonth.click(function(){

    date.add(1, "months");

    if (date.year() == 2019) {
      date.subtract(1, "months");
      alert("Spiacente non abbiamo dati disponibili");
    } else {
      calendar(date);
      holidays(date);
    }
  })
};
