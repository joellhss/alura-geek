import { produtosServices } from "../service/produtos-service.js";

const retorno = sessionStorage.getItem("acessoLiberado")

if(retorno != "true") {
    window.location.href = "../pages/loginHome.html"
}

const formulario = document.querySelector("[data-form-produto]")
const preco = document.querySelector('[data-tipo="precoProduto"]')

const args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: 'R$ ',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'end'
  };

preco.addEventListener("focus", () => {
    const trataPreco = SimpleMaskMoney.setMask(preco, args)
})

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.nome.value
    const descricao = evento.target.descricao.value
    const preco = evento.target.precoProduto.value
    const urlImage = evento.target.urlImage.value
    const categoria = evento.target.categoria.value
      
    const precoToNumber = SimpleMaskMoney.formatToNumber(preco)

    produtosServices.criarProduto(nome, descricao, precoToNumber, urlImage, categoria)
    .then(() => {
        window.location.href = "../pages/adicionarNovoProdutoConcluido.html"
    })

})