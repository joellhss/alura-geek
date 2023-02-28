import { produtosServices } from "../service/produtos-service.js";

let categorias = [];

function buscaExibeProdutos() {
    
    produtosServices.exibirProdutos()
    .then ( resposta => {
        resposta.forEach(produto => {
            if(categorias.indexOf(produto.categoria) < 0) {
                categorias.push(produto.categoria)
                insereTitulo(produto.categoria, "#")
                
                
            }
        });

        resposta.forEach(produto => {
            let categoriaDoProduto = produto.categoria.replace(" ", "") + "Boxes";
            let preco = editaPreco(produto.preco);
            insereBox(produto.urlImage, produto.nome, preco, produto.id, categoriaDoProduto);

        })

        if(resposta.length > 0) {
            insereTitulo("Diversos", "#");

            let produtosDiversos = shuffleArray(resposta);
            
            for(let i = 0; i <= 5; i++) {
                let produto = produtosDiversos[i];
                let categoriaDoProduto = "DiversosBoxes";
                let preco = editaPreco(produto.preco);
                insereBox(produto.urlImage, produto.nome, preco, produto.id, categoriaDoProduto);
            }
        }
    })
}

function insereTitulo(titulo, url) {
    let mainProdutos = document.querySelector('[data-produtos="home"]')

    let title = document.createElement("h2");
    title.classList.add("categoriaTitle");
    title.id = titulo.replace(" ", "");
    title.innerText = titulo;

    let verMaisLink = document.createElement("a");
    verMaisLink.classList.add("verMais");
    verMaisLink.href = url;
    verMaisLink.innerText = "Ver todos";

    let titleBox = document.createElement("div");
    titleBox.classList.add("titleBox");
    titleBox.appendChild(title);
    titleBox.appendChild(verMaisLink);

    let boxes = document.createElement("div");
    boxes.classList.add("categoriaBoxes");
    boxes.id = titulo.replace(" ", "") + "Boxes";

    mainProdutos.appendChild(titleBox);
    mainProdutos.appendChild(boxes);
}

function insereBox(imagem, nome, preco, id, categoriaPagina) {
    const listaProdutos = document.getElementById(categoriaPagina)
    const boxProduto = document.createElement("div")
    boxProduto.classList.add("boxProduto")
    boxProduto.id = "id-" + id

    const infoProduto = `
        <div class="boxProduto-boxImagem">
            <img class="boxProduto-boxImagem-imagem" src="${imagem}" alt="">
        </div>
        <p class="boxProduto-nome">${nome}</p>
        <p class="boxProduto-preco">${preco}</p>
        <a href="#" class="linkPaginaProduto">Ver produto</a>
        
    `

    boxProduto.innerHTML = infoProduto

    listaProdutos.appendChild(boxProduto)
}

function editaPreco(preco) {
    const recebePreco = `${preco}`
    const newPreco = recebePreco.replace('.', ',')
    
    return `R$ ${newPreco}`  
} 

function shuffleArray(arr) {
    // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

buscaExibeProdutos();
