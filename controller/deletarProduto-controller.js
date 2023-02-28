import { produtosServices } from "../service/produtos-service.js"

const retorno = sessionStorage.getItem("acessoLiberado")

if(retorno != "true") {
    window.location.href = "../pages/loginHome.html"
}

const listaProdutos = document.querySelector('[data-listaProdutos]')

function deletarProduto(evento) {
    if (evento.target.className === "ph-trash-fill") {
        const idProduto = evento.target.offsetParent.offsetParent.parentElement.querySelector(".boxProduto-id").innerText
        const id = idProduto.replace("#", "")
        console.log(id)

        const menuAdministrativo = document.querySelector('[data-tipo="menuAdministrativo"]')
        menuAdministrativo.innerHTML += `
            <div class="menuAdministrativo-deletar">
                <div class="menuAdministrativo-deletar-box">
                    <p>Você realmente quer excluir este produto?</p>
                    <div class="buttons-deletar">
                        <button class="button" data-tipo="deletarSim">Sim</button>
                        <button class="button" data-tipo="deletarNao">Não</button>
                    </div>
                </div>
            </div>
        `

        const sim = document.querySelector('[data-tipo="deletarSim"]')  
        const nao = document.querySelector('[data-tipo="deletarNao"]')
        
        sim.addEventListener("click", () => {
            produtosServices.deletarProduto(id)
            .then( resposta => {
                window.location.reload()
            })
        })
        
        nao.addEventListener("click", () => {
            window.location.reload()
        })
    }
}

listaProdutos.addEventListener("click", (evento) => {
    deletarProduto(evento)
})
