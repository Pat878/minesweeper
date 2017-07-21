$(document).ready(function(){
makeGrid();
//addMines();
detectBombs();
revealCells();
//distanceToMine();
})

var makeGrid  = (function () {
    return function () {
      var row = 9;
      for (var i=0;i<row;i++){
        $(".divTableBody").append("<div class='divTableRow'></div>") }
      for (i=0;i<row;i++){
        $(".divTableRow").append("<div class='divTableCell'></div>") }
        $(".divTableCell").each( function(i) {
              $(this).attr('data', (i))
            //  $(this).append(i+1)
            });
    };
})();

var addMines = (function () {

var mineArray = [];
for (var i = 0; i < 81;i++) {
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
      //console.log(mineArray.sort())

      $(".divTableCell").on("click", function(){
        //console.log($(this).attr("data"))
        for (var i=0;i<mineArray.length;i++) {
          if ( $(this).attr("data") == mineArray[i] ) {
            for (var j = 0;j<81;j++) {
              $('*[data="' + mineArray[j] + '"]').html('<i class="fa fa-bomb" aria-hidden="true"></i>')
              .css("background-color", "white" )
              $('*[data="' + j + '"]').css("background-color", "white" )
             }
          }
         }
      })
    };
})();

var distanceToMine = (function () {

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

        var arr = [];

        for (var i=0;i<81;i++) {

          var thisCell =  i;
          var up = (thisCell - 9);
          var right = (thisCell + 1);
          var down = (thisCell + 9);
          var left = (thisCell - 1);
          var diagonalRightUp = (thisCell - 8);
          var diagonalRightDown = (thisCell + 10);
          var diagonalLeftUp = (thisCell - 10);
          var diagonalLeftDown = (thisCell + 8);

          var leftBorder = [0,9,18,27,36,45,54,63,72]
          var rightBorder = [8,17,26,35,44,53,62,71,80]

          for (var j=0;j<leftBorder.length;j++) {
              if (i == leftBorder[j]){
              left = (-100)
              diagonalLeftUp = (-100)
              diagonalLeftDown = (-100)
          } }

          for (var k=0;k<rightBorder.length;k++) {
              if (i == rightBorder[k]){
              right = (-100)
              diagonalRightUp = (-100)
              diagonalRightDown = (-100)
          } }

          var direction = [up,right,down,left,diagonalRightUp,diagonalRightDown,diagonalLeftUp,diagonalLeftDown];

          var adjacentNumbers = direction.filter(function(num){
              return num > 0 && num <= 81
          })
          var mineDistances = mineArray.diff(adjacentNumbers)
//console.log(adjacentNumbers)
          arr.push(mineDistances.length)

            }

      return {

      distance: function (){
        return arr;
      }


      };
})();

var distanceToMineArray = distanceToMine.distance();
console.log(distanceToMineArray)

var revealCells = (function () {

  return function() {

      $(".divTableCell").on("click", function(){
          if ( distanceToMineArray[$(this).attr("data")] > 0) {
          $(this).addClass("open").append(distanceToMineArray[$(this).attr("data")])
          }

      });

};
})();



for (var i=0;i<81;i++) {

  var thisCell =  i;
  var up = (thisCell - 9);
  var right = (thisCell + 1);
  var down = (thisCell + 9);
  var left = (thisCell - 1);
  var diagonalRightUp = (thisCell - 8);
  var diagonalRightDown = (thisCell + 10);
  var diagonalLeftUp = (thisCell - 10);
  var diagonalLeftDown = (thisCell + 8);

  var leftBorder = [0,9,18,27,36,45,54,63,72]
  var rightBorder = [8,17,26,35,44,53,62,71,80]

  for (var j=0;j<leftBorder.length;j++) {
      if (i == leftBorder[j]){
      left = (-100)
      diagonalLeftUp = (-100)
      diagonalLeftDown = (-100)
  } }

  for (var k=0;k<rightBorder.length;k++) {
      if (i == rightBorder[k]){
      right = (-100)
      diagonalRightUp = (-100)
      diagonalRightDown = (-100)
  } }

  var direction = [up,right,down,left,diagonalRightUp,diagonalRightDown,diagonalLeftUp,diagonalLeftDown];
console.log(direction)
  //var adjacentNumbers = direction.filter(function(num){
    //  return num > 0 && num <= 81
//  })
  //var mineDistances = mineArray.diff(adjacentNumbers)
//console.log(adjacentNumbers)
  //arr.push(mineDistances.length)

    }
