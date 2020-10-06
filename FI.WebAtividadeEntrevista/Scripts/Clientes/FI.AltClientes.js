
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
        if(obj.Beneficiarios)
            loadGrid(obj.Beneficiarios);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var benefTable = document.getElementById('benefTable');
        var beneficiarios = new Array();

        for (row = 1; row < benefTable.rows.length; row++) {
            var beneficiario = {
                "Nome": benefTable.rows[row].cells[0].firstChild.data,
                "CPF": benefTable.rows[row].cells[1].firstChild.data
            }
            beneficiarios.push(beneficiario);
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
                "Beneficiarios": beneficiarios
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function loadGrid(rows) {
    var table = document.getElementById('benefTable');

    for (var i = 1; i <= rows.length; i++) {
        var tr = table.insertRow(i);
        for (var c = 0; c < 4; c++) {
            var td = document.createElement('td');
            td = tr.insertCell(c);

            if (c == 0) {
                var nameCell = document.createTextNode(rows[i-1].Nome);
                td.appendChild(nameCell);
            }
            else if (c == 1) {
                var cpfCell = document.createTextNode(rows[i-1].CPF);
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
    }
}