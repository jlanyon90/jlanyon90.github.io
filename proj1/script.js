function modify_qty(val) {
    var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty,10) + val;

    if (new_qty < 0) {
        new_qty = 0;
    }

    document.getElementById('qty').value = new_qty;
    return new_qty;
}

function reset_qty(){
    document.getElementById('qty').value = 0;
    return 0;
}

function modify_restartqty(resval) {
    var restartqty = document.getElementById('restartqty').value;
    var new_restartqty = parseInt(restartqty,10) + resval;

    if (new_restartqty < 0) {
        new_restartqty = 0;
    }

    document.getElementById('restartqty').value = new_restartqty;
    return new_restartqty;
}

function reset_restartqty(){
    document.getElementById('restartqty').value = 0;
    return 0;
}
