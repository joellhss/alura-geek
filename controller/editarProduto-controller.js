import { produtosServices } from "../service/produtos-service.js"

const retorno = sessionStorage.getItem("acessoLiberado")

if(retorno != "true") {
    window.location.href = "../pages/loginHome.html"
}

(async () => {
    const capturaURL = new URL(window.location)
    const idPagina = capturaURL.searchParams.get("id")

    const urlImage = document.querySelector("[data-tipo='urlImage']")
    const categoria = document.querySelector("[data-tipo='categoria']")
    const nome = document.querySelector("[data-tipo='nome']")
    const preco = document.querySelector("[data-tipo='precoProduto']")
    const descricao = document.querySelector("[data-tipo='descricao']")

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

    try {
        const produto = await produtosServices.exibirProdutoEdicao(idPagina)
        const newPreco = produto.preco.toFixed(2)
    
            urlImage.value = produto.urlImage
            categoria.value = produto.categoria
            nome.value = produto.nome
            preco.value = newPreco
            descricao.value = produto.descricao

            const trataPreco = SimpleMaskMoney.setMask(preco, args)
    }
    
    catch(error) {
        console.error(error)
        //window.location.href = "../telas/erro.html"
    }

    const form = document.querySelector("[data-form-produto]")

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault()
        try {
            const precoToNumber = SimpleMaskMoney.formatToNumber(preco.value)
            await produtosServices.atualizarProduto(idPagina, nome.value, descricao.value, precoToNumber, urlImage.value, categoria.value)
            window.location.href = "../pages/editarProdutoConcluido.html"
        }
        catch(error) {
            console.error(error)
            //window.location.href = "../telas/erro.html"
        }

    })

})()



