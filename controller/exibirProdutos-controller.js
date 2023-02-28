import { produtosServices } from "../service/produtos-service.js";


function insereBox(imagem, nome, preco, id) {
    const listaProdutos = document.querySelector("[data-listaProdutos]")
    const boxProduto = document.createElement("div")
    boxProduto.classList.add("boxProduto")

    const infoProduto = `
        <div class="boxProduto-boxImagem">
            <img class="boxProduto-boxImagem-imagem" src="${imagem}" alt="">
            <div class="buttons-imagem">
                <a data-tipo="deletar"><i class="ph-trash-fill"></i></a>
                <a href="./editarProduto.html?id=${id}"><i class="ph-pencil-simple-fill"></i></a>
            </div>
        </div>
        <p class="boxProduto-nome">${nome}</p>
        <p class="boxProduto-preco">${preco}</p>
        <p class="boxProduto-id">#${id}</p>
    `

    boxProduto.innerHTML = infoProduto

    listaProdutos.appendChild(boxProduto)

}

function buscaProdutos() {
    produtosServices.exibirProdutos()
    .then ( resposta => {
        resposta.forEach(produto => {
            const newPreco = editaPreco(produto.preco)
            insereBox(produto.urlImage, produto.nome, newPreco, produto.id)
        });
    })
}

const retorno = sessionStorage.getItem("acessoLiberado")

if(retorno == "true") {
    buscaProdutos()
} else {
    window.location.href = "../pages/loginHome.html"
}


function editaPreco(preco) {
    const recebePreco = `${preco}`
    const newPreco = recebePreco.replace('.', ',')
    
    return `R$ ${newPreco}`  
} 