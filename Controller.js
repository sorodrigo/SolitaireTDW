/**
 * Created by Rodrigo on 25/04/15.
 */

function Game(custom) {
    this.custom = custom;
    this.score = 0;
    this.gameboards = {
        "row1": new Gameboard("row1")
        , "row2": new Gameboard("row2")
        , "row3": new Gameboard("row3")
        , "row4": new Gameboard("row4")
        , "row5": new Gameboard("row5")
        , "row6": new Gameboard("row6")
        , "row7": new Gameboard("row7")
    };
    this.previous = null;
    this.current = null;
    this.timer = 0;
    this.time = true;
}

Game.prototype.newGame = function () {


    for (k in this.gameboards) {

        this.defineCircles(k);
        this.addButtons(k);
    }

    this.gameboards["row4"].posiciones[3].tipo = "hueco";


    this.displayGame();

}

Game.prototype.defineCircles = function (gb) {
    if (this.custom == false) {
        var tipo = "imagen";
    }
    else {
        tipo = "hueco";
    }
    var pos = this.gameboards[k].posiciones;
    for (var i = 0; i < pos.length; i++) {
        if ((gb == "row3" || gb == "row4" || gb == "row5") || (i > 1 && i < 5)) {
            this.gameboards[gb].addCircle(i, tipo);
        }
        else {
            this.gameboards[gb].addCircle(i, "vacio");
        }

    }
}

Game.prototype.addButtons = function (k) {
    var gb = document.createElement("div");
    var pos = this.gameboards[k].posiciones;
    gb.setAttribute("id", k);
    gb.setAttribute("class", "row");
    document.getElementById("board").appendChild(gb);

    for (i = 0; i < pos.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("id", pos[i].idCi);
        button.setAttribute("class", pos[i].tipo);
        button.setAttribute("name", pos[i].pos);

        document.getElementById(k).appendChild(button);
    }
}

Game.prototype.getCircleById = function (id) {
    var row = "row" + id.substring(1, 2);
    var column = parseInt(id.substring(2, 3));
    column--;

    try {
        var circle = this.gameboards[row].posiciones[column];
        return circle;
    }
    catch (e) {
        return null;
    }

}

Game.prototype.displayGame = function () {


    for (k in this.gameboards) {

        var pos = this.gameboards[k].posiciones;
        for (i = 0; i < pos.length; i++) {
            var button = document.createElement("button");
            button.setAttribute("id", pos[i].idCi);
            button.setAttribute("class", pos[i].tipo);
            button.setAttribute("name", pos[i].pos);

            document.getElementById(k).replaceChild(button, document.getElementById(k).childNodes.item(i));
        }
    }

    document.getElementById("score").innerHTML = this.score;

    if (!this.movesRemaining() && this.custom == false) {

        alert("not more moves :-{");
    }

}

Game.prototype.getMoves = function (id) {
    var location = parseInt(id.substring(1));

    var moves = {
        "top": location - 20,
        "left": location - 2,
        "right": location + 2,
        "down": location + 20
    };


    for (i in moves) {

        if (this.getCircleById("b" + moves[i]) == null || this.getCircleById("b" + moves[i]).tipo == "vacio") {
            moves[i] = null;
        }

    }

    return moves;
}

Game.prototype.movesRemaining = function () {

    var movesRemaining = true;
    for (k in gb = this.gameboards) {
        for (i in pos = gb[k].posiciones) {

            var img = pos[i];
            if (img.tipo == "imagen") {
                var moves = this.getMoves(img.idCi);
                for (m in moves) {
                    if (moves[m] != null) {
                        var circle = this.getCircleById("b" + moves[m]);
                        if (circle.tipo == "hueco") {
                            var middle = this.getCircleById("b" + this.getMiddle(img, circle));
                            if (middle.tipo == "imagen") {
                                return movesRemaining;
                            }
                        }
                    }
                }

            }
        }
    }

    return !movesRemaining;
}

Game.prototype.getMiddle = function (pre, cur) {

    if (cur.tipo == "hueco" && pre.tipo == "imagen") {
        var movimientos = this.getMoves(pre.idCi);
        var currentPos = parseInt(cur.idCi.substring(1));
        var middlePos = null;
        for (var m in movimientos) {
            if (movimientos[m] == currentPos) {

                switch (m) {
                    case "top":
                        middlePos = currentPos + 10;
                        break;
                    case "right":
                        middlePos = currentPos - 1;
                        break;
                    case "down":
                        middlePos = currentPos - 10;
                        break;
                    case "left":
                        middlePos = currentPos + 1;
                        break;
                    default :
                        break;
                }
            }
        }
    }

    return middlePos;
}

Game.prototype.move = function () {


    middlePos = this.getMiddle(this.previous, this.current);

    var middle = this.getCircleById("b" + middlePos);
    if (middle.tipo == "imagen") {
        this.current.tipo = "imagen";
        this.previous.tipo = "hueco";
        middle.tipo = "hueco";
        this.score += 15;
        document.getElementById("debug").innerHTML += game.previous.idCi + "->" + game.current.idCi + "<br>";


    }

    this.displayGame();

}

Game.prototype.customGame = function () {
    this.custom = !this.custom;
    if (this.custom) {
        for (k in this.gameboards) {
            this.defineCircles(k);
        }
        this.score = 0;
        this.current = null;
        this.previous = null;
    }
    this.displayGame();
}

Game.prototype.place = function () {

    if (this.current.tipo == "hueco") {
        this.current.tipo = "imagen"
    }
    else {
        this.current.tipo = "hueco";
    }
    game.displayGame();
}

Game.prototype.setTimer = function () {


    var h = document.getElementById("hours").value;
    var m = document.getElementById("minutes").value;
    var s = document.getElementById("seconds").value;


    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    if (h != "") {
        hours = parseInt(h);
    }
    if (m != "") {
        minutes = parseInt(m);
    }
    if (s != "") {
        seconds = parseInt(s);
    }

    this.timer = (hours * 3600) + (minutes * 60) + (seconds);

}

Game.prototype.updateTimer = function () {


    this.timer--;
    var Seconds = this.timer;

    var Hours = Math.floor(Seconds / 3600);
    Seconds -= Hours * (3600);

    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);

    var TimeStr = numReloj(Hours) + ":" + numReloj(Minutes) + ":" + numReloj(Seconds);

    document.getElementById("debug").innerHTML = TimeStr;


}

function numReloj(t) {

    return (t < 10) ? "0" + t :  t;

}