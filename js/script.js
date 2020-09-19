$(document).ready(function() {

  var date = "2018-01-01";
  var momentdate = moment(date);
  var giorniMese = momentdate.daysInMonth()
  var mese = momentdate.format("MMMM");
  console.log(mese);

//TEMPLATE
  var source = $("#calendar").html();
  var template = Handlebars.compile(source);

//CICLO TUTTI I GIORNI DEL MESE E
  for (var i = 1; i <= giorniMese; i++) {
    var context = {
      "day" : i,
      "month": mese,
      "date" : momentdate.format("YYYY-MM-DD")
    };
    var html = template(context);
    $(".days").append(html);
    momentdate.add(1, "day");
  }

//EFFETTUO UNA CHIAMATA AJAX ALL'API DELLE FESTIVITA'
 $.ajax(
   {
   "url": "https://flynn.boolean.careers/exercises/api/holidays",
   "data": {
     "year":2018,
     "month": 0
   },
     "method": "GET",
     "success": function(data) {
        holidays(data.response);
   },
   "error": function(errore) {
     alert("Errore");
   }
 }
);

});

//AGGIUNGO AD OGNI FESTIVITA' IL COLORE ROSSO E IL NOME
function holidays(festivita) {
  for (var i = 0; i < festivita.length; i++) {
    var dataFestivita = festivita[i].date;
    var nomefestivita = festivita[i].name;

    $(".day[data-data='"+dataFestivita+"']").addClass("holiday");
    $(".day[data-data='"+dataFestivita+"'] .holidayName").text( " - " + nomefestivita);
  }
}
