const criarProduto = (nome, descricao, preco, urlImage, categoria) => {
    return fetch("http://localhost:3000/Produtos", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome, 
            descricao: descricao,
            preco: preco,
            urlImage: urlImage,
            categoria: categoria,
        })
    })
    .then(resposta => {
        if(resposta.ok) {
            return resposta.body
        }
        throw new Error("Não foi possível criar o produto.")
    })
}

const exibirProdutos = () => {
    return fetch("http://localhost:3000/Produtos")
    .then(resposta => {
       return resposta.json()
    })
}

const exibirProdutoEdicao = (id) => {
    return fetch(`http://localhost:3000/Produtos/${id}`)
    .then(resposta => {
        const resp = resposta.json()
        return resp   
    })
}

const atualizarProduto = (id, nome, descricao, preco, urlImage, categoria) => {
    return fetch(`http://localhost:3000/Produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome, 
            descricao: descricao,
            preco: preco,
            urlImage: urlImage,
            categoria: categoria,
        })
    })
    .then(resposta => resposta.json())
}

const deletarProduto = (id) => {
    return fetch(`http://localhost:3000/Produtos/${id}`, {
        method: "DELETE"
    })
    .then(resposta => resposta.json())
}


export const produtosServices = {
    criarProduto,
    exibirProdutos,
    exibirProdutoEdicao,
    atualizarProduto,
    deletarProduto
}

