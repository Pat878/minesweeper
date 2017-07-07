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
        console.log($(this).attr("data"))
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
      for (var i=0;i<mineArray.length;i++) {
        for (var j = 0;j<82;j++) {
          if ( $(this).attr("data") !== mineArray[i]) {
            $('*[data="' + mineArray[i] + '"]').css("background-color", "blue" );
          }
              if (mineArray.includes(j) == false) {
                $('*[data="' + j + '"]').css("background-color", "white" );
        }
      }
    }

  });
};
})();
