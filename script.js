(function mainLoop() {
    console.log("runs");
    var curPlayer = "player1";
    var body = $("body");
    var numberOfRows = 6;
    var numberOfCols = 7;
    var diaVictory = false;
    console.log("current player is: " + "Red Player");
    // startMenu()

    var pointer = $("#pointer");
    // // event handler detects mouse move
    // pointer.on("mousemove", function(e){
    //   // getting x & y coordinates of the user pointer's center
    //   var x = e.clientX - pointer.outerWidth() / 2 - e.target.offsetLeft + "px";
    //   var y = e.clientY - pointer.outerHeight() / 2 - e.target.offsetTop + "px";
    //   // moving pointer to new coordinates
    //   pointer.css({
    //     transform : 'translate(' + x + "," + y + ")"
    //   })
    // })

    $(".column").on("click", function(e) {
        //e is the current target (column)
        e.target.classList.add("active");
        var slotsInColumn = $(e.currentTarget).find(".slot");
        var slotsInRow0 = $(".row0");
        var slotsInRow1 = $(".row1");
        var slotsInRow2 = $(".row2");
        var slotsInRow3 = $(".row3");
        var slotsInRow4 = $(".row4");
        var slotsInRow5 = $(".row5");
        var rows = [
            slotsInRow0,
            slotsInRow1,
            slotsInRow2,
            slotsInRow3,
            slotsInRow4,
            slotsInRow5
        ];
        // console.log(slotsInColumn);

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                break; //breaks the loop
            }
        }

        slotsInColumn.eq(i).addClass(curPlayer);
        // console.log(slotsInColumn);
        // console.log(body);
        diagonalVictory();

        if (VerticalVictory(slotsInColumn) || RowVictory(rows) || diaVictory) {
            victoryMessage();
            console.log("VICTORY!!!");
        } else {
            if (curPlayer == "player1") {
                console.log("current player is: " + "Black Player");
                // console.log('changing to 2');
                curPlayer = "player2";
                pointer.css({
                    "background-color": "black",
                    color: "white"
                });
            } else if (curPlayer == "player2") {
                console.log("current player is: " + "Red Player");
                // console.log('changing back to 1');
                curPlayer = "player1";
                pointer.css({
                    "background-color": "red",
                    color: "black"
                });
            }
        }
    });
    //CHECKING FOR VICTORY
    //loop through slots
    function VerticalVictory(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            // console.log(i);
            if (slots.eq(i).hasClass(curPlayer)) {
                str += "v";
            } else {
                str += "x";
            }
        }
        // console.log(str,slots,curPlayer);
        return str.indexOf("vvvv") > -1;
    }

    function RowVictory(arg) {
        var str = "";
        for (var i = 0; i < arg.length; i++) {
            var singleRow = arg[i];
            for (var j = 0; j < singleRow.length; j++) {
                if (singleRow.eq(j).hasClass(curPlayer)) {
                    str += "v";
                } else {
                    str += "x";
                }
            }
        }
        return str.indexOf("vvvv") > -1;
    }

    function diagonalVictory() {
        var slots = $(".slot");

        for (var i = 0; i < slots.length; i++) {
            var chip = i;
            var chipDown2 = i + (numberOfRows + 1);
            var chipDown3 = i + (numberOfRows + 1) * 2;
            var chipDown4 = i + (numberOfRows + 1) * 3;
            var chipUp2 = i + (numberOfRows - 1);
            var chipUp3 = i + (numberOfRows - 1) * 2;
            var chipUp4 = i + (numberOfRows - 1) * 3;

            if (
                slots.eq(chip).hasClass(curPlayer) &&
                slots.eq(chipDown2).hasClass(curPlayer) &&
                slots.eq(chipDown3).hasClass(curPlayer) &&
                slots.eq(chipDown4).hasClass(curPlayer)
            ) {
                for (var j = 1; j < numberOfCols; j++) {
                    if (
                        chip == numberOfRows * j - 1 ||
                        chipDown2 == numberOfRows * j - 1 ||
                        chipDown3 == numberOfRows * j - 1
                    ) {
                        console.log("out of table below");
                    } else {
                        diaVictory = true;
                    }
                }
            } else if (
                slots.eq(chip).hasClass(curPlayer) &&
                slots.eq(chipUp2).hasClass(curPlayer) &&
                slots.eq(chipUp3).hasClass(curPlayer) &&
                slots.eq(chipUp4).hasClass(curPlayer)
            ) {
                for (var j = 0; j < numberOfCols; j++) {
                    if (
                        chip == numberOfRows * j ||
                        chipUp2 == numberOfRows * j ||
                        chipUp3 == numberOfRows * j
                    ) {
                        console.log("out of table above");
                    } else {
                        diaVictory = true;
                    }
                }
            } else {
                // diaVictory = false
            }
        }
    }

    $(".restartButton").on("click", function(e) {
        $(".redBanner").css({
            display: "none"
        });
        $(".blackBanner").css({
            display: "none"
        });
        $(".table").css({
            "transition-property": "transform",
            "transition-duration": "1s",
            transform: "translateY(100%)"
        });
        $(".mookup").css({
            "transition-property": "transform",
            "transition-duration": "1s",
            transform: "translateY(27%)"
        });
        setTimeout(function() {
            $(".player1").removeClass("player1");
            $(".player2").removeClass("player2");
            $(".mookup").css({
                "transition-property": "transform",
                "transition-duration": "0s",
                transform: "translateY(-100%)"
            });
            $(".table").css({
                "transition-property": "transform",
                "transition-duration": "0s",
                transform: "translateY(0%)"
            });
            // location.reload()
        }, 1000);
    });

    function victoryMessage() {
        if (curPlayer == "player1") {
            $(".redBanner").css({
                display: "block"
            });
        } else if (curPlayer == "player2") {
            $(".blackBanner").css({
                display: "block"
            });
        }
    }

    // function startMenu() {
    //   console.log('generating columns');
    //   for (var i = 1; i < numberOfCols; i++) {
    //     $('<div class="column"></div>').appendTo('.table')
    //     for (var j = 1; j < numberOfRows; j++) {
    //       var currenSlot = '<div class="slot row' + (j-1) + '">'
    //       $(currenSlot).appendTo('.column').eq(j)
    //     }
    //   }
    // }
})();

//24 diagonal victories

// function diagonal(col, row) {
//   var col = 0;
//   var row = -1;
//   [
//     ".column:nth-child(col" + col + 1 + ") .row:nth-child(row" + row + 1 + ")",
//     ".column:nth-child(col1) .row:nth-child(row1)"
//   ]
// }

// function diagonalVictory(){
//   var numberOfCols =7;
//   var numberOfRows = 6;
//   for (var i = 0; i < numberOfCols; i++) {
//       for (var j = 0; j < numberOfRows; j++) {
//           var selectors = [
//               '.column' + i + ' .row' + j,
//               '.column' + (i+1) + ' .row' + (j+1),
//               '.column' + (i+2) + ' .row' + (j+2),
//               '.column' + (i+3) + ' .row' + (j+3),
//           ];
//           var selector = selectors.join(', ');
//           // if (selector.hasClass(curPlayer)){
//           //   console.log('selector has class ' + curPlayer);
//           // }
//           // console.log(selector);
//       }
//   }
// }
