const botaoTransparencia = document.getElementById("botao-transparencia");
const linksInativos = document.querySelectorAll(".link-inativo");

linksInativos.forEach(link => {
    link.addEventListener("click", function (evento) {
        evento.preventDefault();
        alert("Esta seção está temporariamente inativa.");
    });
});

if (botaoTransparencia) {
    botaoTransparencia.addEventListener("click", () => {
        alert("Área de transparência ainda não liberada.");
    });
}

const formularioContato = document.getElementById("formulario-contato");

formularioContato.addEventListener("submit", function (evento) {
    evento.preventDefault();
    alert("Mensagem enviada com sucesso!");
    formularioContato.reset();
});