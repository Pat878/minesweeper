$(document).ready(function(){
makeGrid();
//addMines();
detectBombs();
detectEmptySpaces();
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

var addMines = (function () {

var mineArray = [];
for (var i = 1; i < 82;i++) {
mineArray.push(i)
}

    return {
      shuffle: function (array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  get: function (){
  addMines.shuffle(mineArray);
  mineArray = mineArray.splice(1,10)
    return mineArray
  }

    };
})();

var mineArray = addMines.get()

var detectBombs  = (function () {
    return function () {
    //  var mineArray = addMines.get()
      console.log(mineArray)

      $(".divTableCell").on("click", function(){
        //console.log($(this).attr("data"))
        for (var i=0;i<mineArray.length;i++) {
          if ( $(this).attr("data") == mineArray[i] ) {
            for (var j = 0;j<82;j++) {
              $('*[data="' + mineArray[j] + '"]').html('<i class="fa fa-bomb" aria-hidden="true"></i>')
              .css("background-color", "white" )
              $('*[data="' + j + '"]').css("background-color", "white" )
             }
          }
         }
      })
    };
})();

var detectEmptySpaces = (function () {

  return function () {
  $(".divTableCell").on("click", function() {
    var thisCell = parseInt($(this).attr("data"));
    var up, right, down, left, diagonalRightUp, diagonalRightDown, diagonalLeftUp, diagonalLeftDown;
    $(this).css("background-color", "white" );
    var timer = setInterval(function(){
      thisCell = (thisCell + 1);

    if ( mineArray.includes(thisCell) == false && thisCell % 9 !== 1  ) {
      $('*[data="' + thisCell + '"]').css("background-color", "white" );
        }
      if ( mineArray.includes(thisCell) == true || thisCell % 9 == 1 ) {
        clearInterval(timer);
      }
    }, 1000);
  });
};
})();
