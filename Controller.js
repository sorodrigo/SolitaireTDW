/**
 * Created by Rodrigo on 25/04/15.
 */

function Game(custom) {
    this.custom = custom;
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
    this.timer = -1;
    this.time = true;
    this.score = -1;
}

Game.prototype.newGame = function () {

    this.score = 0;
    for (k in this.gameboards) {

        this.defineCircles(k);
        this.addButtons(k);
    }

    for (i in variants = document.getElementsByName("variant"))
    {
        if (variants[i].checked)
        {
            if(variants[i].value == "central")
            {
                this.gameboards["row4"].posiciones[3].tipo = "hueco";
            }
            else if(variants[i].value == "random")
            {

                var random = this.gameboards["row1"].posiciones[0];
                while(random.tipo != "imagen") {
                    var num1 = 0;
                    var num2 = -1;
                    while (num1 < 1 || num1 > 7) {
                        num1 = Math.floor((Math.random() * 10));
                    }

                    while (num2 < 0 || num2 > 6) {
                        num2 = Math.floor((Math.random() * 10));
                    }
                    var random = this.gameboards["row" + num1].posiciones[num2]
                }
                random.tipo = "hueco";
            }
        }
    }

    timer();
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
    gb.setAttribute("class", "rows");
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

    if (!this.movesRemaining() && this.custom == false) {

        if (this.getButtonsLeft() != 1) {

            try {
                var del = document.getElementById("end")
                del.parentNode.removeChild(del);
            }
            catch (e) {
                var end = document.createElement("div");
                end.setAttribute("id", "end");
                var endLabel = document.createElement("h1");
                endLabel.setAttribute("id", "endLabel");
                document.getElementById("board").appendChild(end);
                document.getElementById("end").appendChild(endLabel);
                document.getElementById("endLabel").innerHTML = "Game Over! No more moves.";

            }

            this.score = this.score - (parseInt(this.getButtonsLeft()) * 50);

        }
        else {

            try {
                var del = document.getElementById("end")
                del.parentNode.removeChild(del);
            }
            catch (e) {
                var end = document.createElement("div");
                end.setAttribute("id", "end");
                var endLabel = document.createElement("h1");
                endLabel.setAttribute("id", "endLabel");
                document.getElementById("board").appendChild(end);
                document.getElementById("end").appendChild(endLabel);
                document.getElementById("endLabel").innerHTML = "Congratulations! You have won.";
            }

            if (this.gameboards["row4"].posiciones[3].tipo = "imagen") {
                this.score += 150;
            }


        }
    }

    if (!this.time) {
        try {
            var del = document.getElementById("end")
            del.parentNode.removeChild(del);
        }
        catch (e) {
            var end = document.createElement("div");
            end.setAttribute("id", "end");
            var endLabel = document.createElement("h1");
            endLabel.setAttribute("id", "endLabel");
            document.getElementById("board").appendChild(end);
            document.getElementById("end").appendChild(endLabel);
            document.getElementById("endLabel").innerHTML = "Game Over! No more time.";
        }

        this.score = this.score - (parseInt(this.getButtonsLeft()) * 50);

    }

    if (this.score >= 0) {
        document.getElementById("score").setAttribute("class", "scoregreen");
    }
    else {
        document.getElementById("score").setAttribute("class", "scorered");
    }
    document.getElementById("score").innerHTML = "Score: " + this.score;

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

    if (this.time && this.movesRemaining()) {
        middlePos = this.getMiddle(this.previous, this.current);

        var middle = this.getCircleById("b" + middlePos);
        if (middle.tipo == "imagen") {
            this.current.tipo = "imagen";
            this.previous.tipo = "hueco";
            middle.tipo = "hueco";
            this.score += 15;

        }

        this.displayGame();
    }

}

Game.prototype.customGame = function () {
    this.custom = true
    for (k in this.gameboards) {
        this.defineCircles(k);
    }
    this.score = 0;
    this.current = null;
    this.previous = null;
    this.time = true;
    this.timer = -1;
    try {
        var end = document.getElementById("end")
        end.parentNode.removeChild(end);
    }

    finally {
        this.displayGame();
    }

}

Game.prototype.unsetCustom = function () {
    if (this.custom) {
        this.custom = false;
        try {
            var end = document.getElementById("end")
            end.parentNode.removeChild(end);
        }

        finally {
            timer();
            this.displayGame();
        }
    }

    else {

        var restart = confirm("Are you sure you want to start over? All your progress will be lost.");

        if (restart == true) {

            this.restart();
        }

    }
}

Game.prototype.restart = function () {


    for (k in gb = this.gameboards) {
        gb[k].posiciones = Array(7);
        var child = document.getElementById(k);
        document.getElementById("board").removeChild(child);
    }

    this.previous = null;
    this.current = null;
    this.timer = -1;
    this.time = true;
    this.score = -1;

    try {
        var end = document.getElementById("end")
        end.parentNode.removeChild(end);
    }
    finally {
        this.newGame(false);
    }
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

    if (TimeStr != "0-1:59:59")
    {
        document.getElementById("ctdown").innerHTML = TimeStr;
    }
    else
    {
        document.getElementById("ctdown").innerHTML = "00:00:00";
    }


}

function numReloj(t) {

    return (t < 10) ? "0" + t : t;

}

Game.prototype.getButtonsLeft = function () {

    var contador = 0;
    for (k in gb = this.gameboards) {
        for (i in pos = gb[k].posiciones) {
            if (pos[i].tipo == "imagen") {
                contador++;
            }
        }
    }
    return contador;
}