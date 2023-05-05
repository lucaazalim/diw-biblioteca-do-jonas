class Livro {
    constructor(capa, titulo, edicao, ano, genero, paginas, local, emprestado) {
        this.capa = capa;
        this.titulo = titulo;
        this.edicao = edicao;
        this.ano = ano;
        this.genero = genero;
        this.paginas = paginas;
        this.local = local;
        this.emprestado = emprestado;
    }
}

const livros_padrao = [
    new Livro("https://www.lpm.com.br/livros/imagens/dom_quixote_hq_9788525433633_hd.jpg", "Dom Quixote", "1ª edição", 1605, "Romance", 863, "Biblioteca de casa", false),
    new Livro("https://m.media-amazon.com/images/I/51tKyWgUD+L._SX327_BO1,204,203,200_.jpg", "1984", "1ª edição", 1949, "Ficção Distópica", 328, "Carro", true),
    new Livro("https://m.media-amazon.com/images/I/81X706V7XsL.jpg", "A Origem das Espécies", "1ª edição", 1859, "Ciências Naturais", 502, "Biblioteca de casa", false),
    new Livro("https://m.media-amazon.com/images/I/81SQPrWU7SL.jpg", "Cem Anos de Solidão", "1ª edição", 1967, "Romance", 457, "Cabeceira", false),
    new Livro("https://m.media-amazon.com/images/I/61-5X0w8VqS.jpg", "Ulisses", "1ª edição", 1922, "Romance", 730, "Armário", true),
    new Livro("https://m.media-amazon.com/images/I/81Ph4QRq1gL.jpg", "O Grande Gatsby", "1ª edição", 1925, "Romance", 218, "Biblioteca de casa", false),
    new Livro("https://m.media-amazon.com/images/I/913zODhgHXL.jpg", "Guerra e Paz", "1ª edição", 1869, "Romance Histórico", 1225, "Biblioteca de casa", true),
    new Livro("https://m.media-amazon.com/images/I/61kif0Iav7L.jpg", "Moby Dick", "1ª edição", 1851, "Romance", 585, "Biblioteca de casa", false),
    new Livro("https://m.media-amazon.com/images/I/71b3GDZMzSL.jpg", "O Apanhador no Campo de Centeio", "1ª edição", 1951, "Romance", 277, "Sala de estar", false),
    new Livro("https://m.media-amazon.com/images/I/71L28YvPobL.jpg", "Os Miseráveis", "1ª edição", 1862, "Romance Histórico", 1488, "Biblioteca de casa", true)
];

var livros;

function criarLivro(livro) {

    let id = livros.size + 1;
    livro.id = id;

    console.log(`Criando a livro ${livro.nome} de ID ${id}...`);

    livros.set(id.toString(), livro);

    guardarLivros();
    exibirLivros();

}

function removerLivro(id) {

    livros.delete(id);

    guardarLivros();
    exibirLivros();

}

function guardarLivros() {
    localStorage.setItem('livros', JSON.stringify(Object.fromEntries(livros)));
}

function exibirLivros(filtroNome="") {

    $('#livros').html("");

    for (const [id, livro] of livros.entries()) {

        if(filtroNome && !livro.titulo.startsWith(filtroNome)) {
            continue;
        }

        let capa = livro.capa != null ? livro.capa : 'https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png';
        let emprestado = livro.emprestado ? 'Sim' : 'Não';

        $('#livros').append(`
            <tr>
                <td><img src="${capa}" width="80px"></td>
                <td>${livro.titulo}</td>
                <td>${livro.edicao}</td>
                <td>${livro.ano}</td>
                <td>${livro.genero}</td>
                <td>${livro.paginas}</td>
                <td>${livro.local}</td>
                <td>${emprestado}</td>
                <td colspan="1">
                    <button id="btn-editar-livro-${id}" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-editar-livro">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td colspan="1">
                    <button id="btn-remover-livro-${id}" type="button" class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);

        $(`#btn-remover-livro-${id}`).click(function () {

            let nome = livros.get(id).nome;

            removerLivro(id);
            alertar(`Livro <strong>${nome}</strong> removida com sucesso!`, "warning");

        });

        $(`#btn-editar-livro-${id}`).click(function () {

            let livro = livros.get(id);

            $('#input-id-livro').val(livro.id);
            $('#input-capa-livro').val(livro.capa);
            $('#input-titulo-livro').val(livro.titulo);
            $('#input-edicao-livro').val(livro.edicao);
            $('#input-ano-livro').val(livro.ano);
            $('#input-genero-livro').val(livro.genero);
            $('#input-paginas-livro').val(livro.paginas);
            $('#input-local-livro').val(livro.local);
            $('#input-emprestado-livro').prop("checked", livro.emprestado);

        });

    }

}

$('#btn-confirmar').click(function (event) {

    let form = $('#form-editar-livro')[0];

    if (!form.checkValidity()) {
        return;
    }

    let livroId = $('#input-id-livro').val();
    let capa = $('#input-capa-livro').val();
    let titulo = $('#input-titulo-livro').val();
    let edicao = $('#input-edicao-livro').val();
    let ano = $('#input-ano-livro').val();
    let genero = $('#input-genero-livro').val();
    let paginas = $('#input-paginas-livro').val();
    let local = $('#input-local-livro').val();
    let emprestado = $('#input-emprestado-livro').prop('checked');

    if (!capa || !titulo || !edicao || !ano || !genero || !paginas || !local) {
        alertar(`Preencha todos os campos obrigatórios.`, "danger", "alerta-editar-livro");
        return false;
    }

    if(livroId) {

        // Editando...

        let livro = livros.get(livroId);

        livro.capa = capa;
        livro.titulo = titulo;
        livro.edicao = edicao;
        livro.ano = ano;
        livro.genero = genero;
        livro.paginas = paginas;
        livro.local = local;
        livro.emprestado = emprestado;

        guardarLivros();
        exibirLivros();

        $('#modal-editar-livro').modal('hide');

        alertar(`Livro <strong>${nome}</strong> salva com sucesso!`, "success");

    } else {

        // Criando...

        let livro = new Livro(capa, titulo, edicao, ano, genero, paginas, local, emprestado);
        criarLivro(livro);
    
        formCriarLivro.reset();
        $('#modal-criar-livro').modal('hide');
    
        alertar(`Livro <strong>${nome}</strong> criada com sucesso!`, "success");

    }

});

var livrosLocalStorage = JSON.parse(localStorage.getItem('livros'));

if (livrosLocalStorage) {

    livros = new Map(Object.entries(livrosLocalStorage));

} else {

    livros = new Map();
    console.log("Criando livros padrão...");
    for (const livro of livros_padrao) {
        criarLivro(livro);
    }

}

$('#btn-buscar').click(function() {
    let filtroNome = $('#input-buscar-nome').val();
    exibirLivros(filtroNome);
    console.log("debug");
});

exibirLivros();