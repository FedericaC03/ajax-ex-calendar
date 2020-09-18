$(document).ready(function() {

  var date = "2018-01-01";
  var momentdate = moment(date);
  var giorniMese = momentdate.daysInMonth()
  var mese = momentdate.format("MMMM");
  console.log(mese);
//TEMPLATE
  var source = $("#calendar").html();
  var template = Handlebars.compile(source);


  for (var i = 1; i <= giorniMese; i++) {
    var context = {
      "day" : i,
      "month": mese,
    };
    var html = template(context);
    $(".days").append(html)
  }
});
