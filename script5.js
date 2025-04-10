const cityCoordinates = {
    saopaulo: { name: "São Paulo", latitude: -23.55, longitude: -46.63 },
    rio: { name: "Rio de Janeiro", latitude: -22.91, longitude: -43.17 },
    brasilia: { name: "Brasília", latitude: -15.78, longitude: -47.93 }
  };
  
  const select = document.getElementById("citySelect");
  const result = document.getElementById("result");
  
  // Função para buscar e exibir o clima
  async function fetchWeather(cityKey) {
    const city = cityCoordinates[cityKey];
    if (!city) {
      result.textContent = "Cidade não encontrada.";
      return;
    }
  
    const { latitude, longitude, name } = city;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  
    try {
      result.textContent = "Carregando...";
  
      const response = await fetch(url);
      if (!response.ok) throw new Error("Falha na resposta da API");
  
      const data = await response.json();
      const { temperature, windspeed } = data.current_weather;
  
      result.textContent = `Clima em ${name}: ${temperature}°C, Vento: ${windspeed} km/h`;
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
      result.textContent = `Erro ao obter o clima de ${city.name}.`;
    }
  }
  
  // Evento de mudança no select
  select.addEventListener("change", (e) => {
    const selectedCity = e.target.value;
    if (selectedCity) {
      fetchWeather(selectedCity);
    } else {
      result.textContent = "Selecione uma cidade para ver o clima.";
    }
  });
  