$(document).ready(function(){
makeGrid()
for (var i=0;i<10;i++){
addMines();}
})

var makeGrid  = (function () {
    return function () {
      var row = 9;
      for (var i=0;i<row;i++){
        $(".divTableBody").append("<div class='divTableRow'></div>") }
      for (i=0;i<row;i++){
        $(".divTableRow").append("<div class='divTableCell'></div>") }
        $(".divTableCell").each( function(i) {
              $(this).attr('data', (i+1));
            });
    };
})();

var addMines = (function (){
    return function () {
      var random = Math.floor(Math.random() * (81 - 1 + 1)) + 1;
      $('*[data="' + random  + '"]').append("X")
    };
})();
