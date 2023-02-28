import { funcionarioServices } from "../service/funcionarios-service.js";

const retorno = sessionStorage.getItem("acessoLiberado")

if(retorno == "true") {
    window.location.href = "../pages/menuAdministrador.html"
}

let dados = document.querySelector("[data-form-login]");
let email;
let senha;

dados.addEventListener("submit", (elementos) => {
    elementos.preventDefault();
    email = elementos.target[0];
    senha = elementos.target[1];

    let verificacao = funcionarioServices.verificarLogin(email.value);

    verificacao.then(retorno => {
        
        if(retorno === "E-mail inválido") {
            msgErro();

        } else if(retorno === senha.value){
            entrarAdmin()
        } else {
            msgErro();
        }
    })


})

function entrarAdmin() {
    sessionStorage.setItem("acessoLiberado", true)
    window.location.href = "../pages/menuAdministrador.html"
}

function msgErro() {
    const newElement = document.createElement("p");
    newElement.classList.add("error");
    newElement.textContent = "E-mail ou senha inválido.";

    dados.appendChild(newElement);
}

const emailForm = document.querySelector("[data-tipo='emailFuncionario']")
const senhaForm = document.querySelector("[data-tipo='password']")

emailForm.addEventListener("focus", () => {
    const erro = document.querySelector(".error")
    if(erro != null) {
        dados.removeChild(erro);
    }
})

senhaForm.addEventListener("focus", () => {
    const erro = document.querySelector(".error")
    if(erro != null) {
        dados.removeChild(erro);
    }
})
