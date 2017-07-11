$(document).ready(function(){
makeGrid();
//addMines();
detectBombs();
detectEmptySpaces();
distanceToMine();
})

var makeGrid  = (function () {
    return function () {
      var row = 9;
      for (var i=0;i<row;i++){
        $(".divTableBody").append("<div class='divTableRow'></div>") }
      for (i=0;i<row;i++){
        $(".divTableRow").append("<div class='divTableCell'></div>") }
        $(".divTableCell").each( function(i) {
              $(this).attr('data', (i+1))
            //  $(this).append(i+1)
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
      console.log(mineArray.sort())

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

  return function() {

  $(".divTableCell").on("click", function() {

    var thisCell = parseInt($(this).attr("data"));
    var up = (thisCell - 9);
    var right = (thisCell + 1);
    var down = (thisCell + 9);
    var left = (thisCell - 1);
    var diagonalRightUp = (thisCell - 8);
    var diagonalRightDown = (thisCell + 10);
    var diagonalLeftUp = (thisCell - 10);
    var diagonalLeftDown = (thisCell + 8);
    var direction = [up,right,down,left,diagonalRightUp,diagonalRightDown,diagonalLeftUp,diagonalLeftDown];


  });
};
})();


var distanceToMine  = (function () {
    return function () {


//The following code to find mathcing array values was taken from this answer:
//https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays

      Array.prototype.diff = function(arr2) {
          var ret = [];
          this.sort();
          arr2.sort();
          for(var i = 0; i < this.length; i += 1) {
              if(arr2.indexOf( this[i] ) > -1){
                  ret.push( this[i] );
              }
          }
          return ret;
      };

      $(".divTableCell").each( function(i) {

        var thisCell =  parseInt($(this).attr("data"));
        var up = (thisCell - 9);
        var right = (thisCell + 1);
        var down = (thisCell + 9);
        var left = (thisCell - 1);
        var diagonalRightUp = (thisCell - 8);
        var diagonalRightDown = (thisCell + 10);
        var diagonalLeftUp = (thisCell - 10);
        var diagonalLeftDown = (thisCell + 8);
        var direction = [up,right,down,left,diagonalRightUp,diagonalRightDown,diagonalLeftUp,diagonalLeftDown];


        var adjacentNumbers = direction.filter(function(num){
            return num > 0 && num <= 81
        })
           var mineDistances = mineArray.diff(adjacentNumbers)
          console.log( mineDistances.length );

            if (mineDistances.length > 0) {
            $(this).append(mineDistances.length) }


          });


      };
})();
