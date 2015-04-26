function Circle(id, pos, tipo) {
    this.idCi = id;
    this.pos = pos;
    this.tipo = tipo;
}

function Gameboard(id) {

    this.idGb = id;
    this.posiciones = new Array(7);
}

Gameboard.prototype.addCircle = function (pos, tipo) {

    var i = pos + 1;
    var clasesPos = ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete"];
    var idCircle = "b" + this.idGb.substring(3) + i;
    this.posiciones[pos] = new Circle(idCircle, clasesPos[pos], tipo);

}