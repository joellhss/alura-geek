const verificarLogin = (email) => {
    let retorno = false;
    return fetch(`http://localhost:3000/Funcionarios?email=${email}`)
        .then(resposta => resposta.json())
        .then( array => {
            return array[0].senha
        })
        .catch(error => {
            return "E-mail inválido"
        })
}

export const funcionarioServices = {
    verificarLogin,
}