// Seleciona o botão que vai gerar um novo usuário
const btn = document.getElementById("btn");

// Adiciona um evento ao botão, que chama a função 'getPerson' quando clicado
btn.addEventListener("click", function () {
  // Chama a função getPerson passando a função getData como callback
  getPerson(getData);
});

// Função que faz a requisição para obter os dados de um usuário aleatório
function getPerson(cb) {
  // URL da API que fornece os dados do usuário aleatório
  const url = "https://randomuser.me/api/";

  // Cria um objeto XMLHttpRequest para realizar a requisição HTTP
  const request = new XMLHttpRequest();

  // Abre a requisição com o método GET e a URL da API
  request.open("GET", url, true);

  // Função que será chamada quando a resposta da API for recebida
  request.onload = function () {
    // Verifica se a requisição foi bem-sucedida (status 200)
    if (this.status === 200) {
      // Chama a função de callback (getData) passando a resposta da requisição
      cb(this.responseText, showData);
    }
  };

  // Envia a requisição
  request.send();
}

// Função que manipula a resposta da API, extraindo os dados desejados
function getData(response, cb) {
  // Converte a resposta em formato JSON
  const data = JSON.parse(response);

  // Desestruturação dos dados de interesse da resposta
  const {
    name: { first }, // Primeiro nome
    name: { last }, // Sobrenome
    picture: { large }, // Foto grande do usuário
    location: { street }, // Localização
    phone, // Número de telefone
    email, // Email
  } = data.results[0];

  // Chama a função de callback (showData) passando os dados extraídos
  cb(first, last, large, street, phone, email);
}

// Função que exibe os dados extraídos da API no HTML
function showData(first, last, large, street, phone, email) {
  // Atualiza o conteúdo de diversos elementos HTML com os dados obtidos
  document.getElementById("name").textContent = `${first} ${last}`;
  document.getElementById("first").textContent = first;
  document.getElementById("last").textContent = last;
  document.getElementById("street").textContent = street.name;
  document.getElementById("phone").textContent = phone;
  document.getElementById("email").textContent = email;
  document.getElementById("photo").src = large;
}
