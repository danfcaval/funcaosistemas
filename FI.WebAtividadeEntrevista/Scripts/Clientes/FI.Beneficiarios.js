function ModalBenef() {
    $('#modalBenef').modal('show');
}

function AddRow() {
    var table = document.getElementById('benefTable');
    var name = $("#formBenef #NomeBenef").val();
    var cpf = $("#formBenef #CPFBenef").val();

    if (name == "" || cpf == "")
        return

    var rowCnt = table.rows.length;
    var tr = table.insertRow(rowCnt);

    for (var c = 0; c < 4; c++) {
        var td = document.createElement('td');          
        td = tr.insertCell(c);

        if (c == 0) {
            var nameCell = document.createTextNode(name);
            td.appendChild(nameCell);
        }
        else if (c == 1) {
            var cpfCell = document.createTextNode(cpf);
            td.appendChild(cpfCell);
        }
        else if (c == 2) {
            var modify = document.createElement('input');
            modify.setAttribute('type', 'button');
            modify.setAttribute('class', 'btn btn-sm btn-primary pull-right');
            modify.setAttribute('value', 'Alterar');
            modify.setAttribute('onclick', 'ChangeRow(this)');

            td.appendChild(modify);
        }
        else {
            var remove = document.createElement('input');
            remove.setAttribute('type', 'button');
            remove.setAttribute('class', 'btn btn-sm btn-primary pull-right');
            remove.setAttribute('value', 'Excluir');
            remove.setAttribute('onclick', 'RemoveRow(this)');

            td.appendChild(remove);
        }
    }

    $("#formBenef #NomeBenef").val(undefined);
    $("#formBenef #CPFBenef").val(undefined);
}

function RemoveRow(button) {
    var table = document.getElementById('benefTable');
    table.deleteRow(button.parentNode.parentNode.rowIndex);
}

function ChangeRow(button) {
    var tr = button.parentNode.parentNode;

    for (var c = 0; c < 4; c++) {

        if (c < 2) {
            var text = tr.childNodes[c].firstChild.textContent;
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('class', 'form-control');
            input.setAttribute('value', text);

            tr.childNodes[c].replaceChild(input, tr.childNodes[c].firstChild);
        }
        else if (c == 2) {
            tr.childNodes[c].firstChild.setAttribute('value', 'Confirmar');
            tr.childNodes[c].firstChild.setAttribute('onclick', 'ConfirmChange(this)');
        }
    }
}

function ConfirmChange(button) {
    var tr = button.parentNode.parentNode;

    for (var c = 0; c < 4; c++) {

        if (c < 2) {
            var text = tr.childNodes[c].firstChild.value;
            var newText = document.createTextNode(text);

            tr.childNodes[c].replaceChild(newText, tr.childNodes[c].firstChild);
        }
        else if (c == 2) {
            tr.childNodes[c].firstChild.setAttribute('value', 'Alterar');
            tr.childNodes[c].firstChild.setAttribute('onclick', 'ChangeRow(this)');
        }
    }
}


