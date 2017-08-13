$(document).ready(function(){
makeGrid();
detectBombs();
revealCells();
addFlag();
checkWin();
newGame();
screenWidth();
})

var makeGrid  = (function () {
    return function () {

      var row = 9;
      for (var i=0;i<row;i++){
        $(".divTableBody").append("<div class='divTableRow'></div>") }
      for (i=0;i<row;i++){
        $(".divTableRow").append("<div class='divTableCell'></div>") }
        $(".divTableCell").each( function(i) {
              $(this).attr('data', (i)).addClass("closed")

              //$(this).append(i+1)
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

      $(".divTableCell").on("click", function(){
        for (var i=0;i<mineArray.length;i++) {
          if ( $(this).attr("data") == mineArray[i] ) {
            for (var j = 0;j<81;j++) {
              $('*[data="' + mineArray[j] + '"]').html('<i class="fa fa-bomb" aria-hidden="true"></i>')
              .addClass('open mine').removeClass("closed fa-flag")
              $('*[data="' + j + '"]').addClass('open').removeClass("closed")
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
          arr.push(mineDistances.length)

            }

      return {

      distance: function (){
        return arr;
      }


      };
})();

var click = 0;
var id;
var openCells = [];

var distanceToMineArray = distanceToMine.distance();

var revealCells = (function () {

  return function() {

      $(".divTableCell").on("click", function(){

      var theNumber = $(this).attr("data")
      var selectedNumbers = [];
      var numbers = [-9,1,9,-1,-8,10,8,-10]
      var leftBorder = [0,9,18,27,36,45,54,63,72]
      var rightBorder = [8,17,26,35,44,53,62,71,80]


          if ( distanceToMineArray[theNumber] > 0 && $(this).hasClass('number') !== true
          && $(this).hasClass('mine') !== true && $(this).hasClass("fa-flag") == false) {
            $(this).addClass("open number").append(distanceToMineArray[theNumber]).removeClass("closed") }

          if ( distanceToMineArray[theNumber] == 0 && $(this).hasClass("click") == false
          && $(this).hasClass("fa-flag") == false){

            $(this).addClass("open click").removeClass("closed");
            var thisCell = parseInt(theNumber);
            if (thisCell > 0 && thisCell < 81 && openCells.includes(thisCell) == false) {
            openCells.push(thisCell) }


            function reveal() {  for (var i=0;i<numbers.length;i++) {

              var thisNum = thisCell + numbers[i]

              for (var k=0;k<rightBorder.length;k++) {
                if (thisCell == rightBorder[k]){
                  numbers[1] = 0;
                  numbers[4] = 0;
                  numbers[5] = 0;
                }
              }

              for (var j=0;j<leftBorder.length;j++) {
                if (thisCell == leftBorder[j]){
                  numbers[3] = 0;
                  numbers[6] = 0;
                  numbers[7] = 0;

                }
              }

              if ( $('*[data="' + thisNum + '"]').hasClass("fa-flag") == false ) {
              $('*[data="' + thisNum + '"]').addClass("open ").removeClass("closed") }
              if ( thisNum > 0 && thisNum < 81 && openCells.includes(thisNum) == false ){
              openCells.push(thisNum) }
              showNumbers()

            } }

            reveal();
            open();

            function open () {
            for (var o=0;o<openCells.length;o++){
             var clickboy = $('*[data="' + openCells[o] + '"]')
             while ( $(clickboy).hasClass("click") == false
             && $(clickboy).hasClass("number") == false && $(clickboy).hasClass("fa-flag") == false) {
               $(clickboy).trigger("click")
             }

           } }

        function showNumbers () {
          $('.open').each(function(i, obj) {
                  var num = parseInt($(this).attr("data"))
                  if (distanceToMineArray[num] > 0 && $(this).hasClass('number') !== true
                  && $(this).hasClass('mine') !== true){
                    $(this).append(distanceToMineArray[$(this).attr("data")]).addClass('number').removeClass("closed")
                  }
              });
             }


}
            });

};
})();


var addFlag  = (function () {


    return function () {

      function flagger (){

      $('.divTableCell').on('contextmenu', function(e){ return false; });

      $('.divTableCell').mousedown(function(event) {
        $(".fa-flag").length
          if (event.which == 3 && $(this).hasClass("number") == false && $(".fa-flag").length < 11) {
            $(this).toggleClass("fa fa-flag")

          }
          if ( $(".fa-flag").length == 11 ){
            $(this).toggleClass("fa fa-flag")
          }
          $(".flag-number").html(10 - parseInt($(".fa-flag").length) )
      });


    }

    flagger()

    };
})();

var checkWin  = (function () {
    return function () {

      $(".divTableCell").mousedown(function(){

      function hasFlag(element, index, mineArray) {
        return $('*[data="' + mineArray[index] + '"]').hasClass("fa-flag");
      }

      if ( (mineArray).every(hasFlag) == true) {
        alert("You win!")
//        window.reload()
      }
})

    };
})();

function newGame() {

$(".new").on("click", function(){
  location.reload()
}) }

//This function came from this answer:
//https://stackoverflow.com/questions/7715124/do-something-if-screen-width-is-less-than-960-px

function screenWidth(){
  $(window).resize(function() {
  if ($(window).width() < 960) {
     $(".container").hide()
     $("body").html("<p>Sorry! Your device's screen is too small to play this game! If you'd like to play, your screen must be larger than 960 pixels, and you'll need the ability to right-click.</p>")
  }
 else {
   $(".container").show()
   location.reload()
 }
});
}
