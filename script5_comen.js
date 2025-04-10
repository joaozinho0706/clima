// Objeto que armazena as coordenadas geográficas das cidades
const cityCoordinates = {
  saopaulo: { name: "São Paulo", latitude: -23.55, longitude: -46.63 },
  rio: { name: "Rio de Janeiro", latitude: -22.91, longitude: -43.17 },
  brasilia: { name: "Brasília", latitude: -15.78, longitude: -47.93 }
};

// Pega o elemento <select> do HTML com o id "citySelect"
const select = document.getElementById("citySelect");

// Pega o elemento onde será exibido o resultado com o id "result"
const result = document.getElementById("result");

// Função assíncrona que busca e exibe o clima da cidade selecionada
async function fetchWeather(cityKey) {
  // Busca a cidade no objeto cityCoordinates usando a chave (cityKey)
  const city = cityCoordinates[cityKey];

  // Caso a cidade não exista no objeto, exibe mensagem de erro e encerra a função
  if (!city) {
    result.textContent = "Cidade não encontrada.";
    return;
  }

  // Extrai latitude, longitude e nome da cidade
  const { latitude, longitude, name } = city;

  // Monta a URL da API de clima usando as coordenadas
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    // Mostra mensagem de carregamento enquanto busca os dados
    result.textContent = "Carregando...";

    // Faz a requisição à API usando fetch e espera a resposta
    const response = await fetch(url);

    // Se a resposta não for OK, lança um erro
    if (!response.ok) throw new Error("Falha na resposta da API");

    // Converte a resposta em JSON
    const data = await response.json();

    // Extrai temperatura e velocidade do vento dos dados recebidos
    const { temperature, windspeed } = data.current_weather;

    // Exibe as informações do clima na tela
    result.textContent = `Clima em ${name}: ${temperature}°C, Vento: ${windspeed} km/h`;
  } catch (error) {
    // Se der erro na requisição, mostra mensagem de erro e exibe no console
    console.error("Erro ao buscar o clima:", error);
    result.textContent = `Erro ao obter o clima de ${city.name}.`;
  }
}

// Adiciona um evento que escuta mudanças no <select>
select.addEventListener("change", (e) => {
  // Pega o valor da cidade selecionada no select
  const selectedCity = e.target.value;
  /*
  select.addEventListener("change", ...)
Adiciona um ouvinte de evento ao elemento select.
O evento "change" é disparado sempre que o usuário muda a opção selecionada no menu suspenso.
(e) => { ... }
Define uma função de callback que será chamada quando o evento ocorrer.
O parâmetro e (abreviação de event) contém informações sobre o evento.
e.target.value
e.target é o elemento HTML que disparou o evento (neste caso, o <select>).
.value acessa o valor da opção selecionada (ex: "saopaulo", "rio", etc.).
  */
 

// Se uma cidade foi selecionada, chama a função para buscar o clima
  if (selectedCity) {
    fetchWeather(selectedCity);
  } else {
    // Se não foi selecionada nenhuma cidade, exibe mensagem padrão
    result.textContent = "Selecione uma cidade para ver o clima.";
  }
});
