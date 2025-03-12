import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import { CurrentWeather, findIcon } from "./Components/CurrentWeather";
import TempChart from "./Components/TempChart";
import Forecast from "./Components/Forecast";
import Footer from "./Components/Footer";
import ExtraData from "./Components/ExtraData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloudImg from "./assets/cloud.jpg";
import nightImg from "./assets/night4.jpg";

function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // importar a chave da API do arquivo .env
  const apiKey = import.meta.env.VITE_API_KEY;

  // Mudar a imagem de fundo quando o estado do toggle mudar
  useEffect(() => {
    document.body.style = `background-image:  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${
      toggle ? cloudImg : nightImg
    });`;
  }, [toggle]);

  // Verificar se é dia ou noite
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    setToggle(isDay);
  }, []);

  // Obter a localização do usuário usando a API de Geolocalização
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => {
        console.log("Erro de geolocalização:", err);
        setError(
          "Não foi possível obter sua localização. Por favor, use a barra de pesquisa."
        );
        setLoading(false);
      }
    );
  }, []);

  // Buscar dados meteorológicos da API usando latitude e longitude
  useEffect(() => {
    if (lat && lon) {
      // Só faça a chamada se lat e lon existirem
      setLoading(true);
      setError(null);

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=yes`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Erro ao buscar dados por localização:", err.message);
          setError(
            "Erro ao buscar dados meteorológicos. Tente novamente mais tarde."
          );
          setLoading(false);
        });
    }
  }, [lat, lon, apiKey]);

  // Buscar dados meteorológicos da API usando a localização da barra de pesquisa
  useEffect(() => {
    if (location && location.trim() !== "") {
      // Só faça a chamada se location existir e não for vazio
      setLoading(true);
      setError(null);

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=yes`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Erro ao buscar dados por localização:", err.message);
          setError(
            "Não foi possível encontrar dados para esta localização. Verifique o nome e tente novamente."
          );
          setLoading(false);
        });
    }
  }, [location, apiKey]);

  // Armazenar os dados do clima atual em um objeto
  const currentData = {
    temp: weather?.current?.temp_c,
    location: weather?.location?.name,
    date: weather?.location?.localtime,
    icon: weather?.current?.condition?.icon,
    text: weather?.current?.condition?.text,
  };

  // Armazenar os dados meteorológicos extras em um objeto
  const extraData = {
    pressure: weather?.current?.pressure_mb,
    wind: weather?.current?.wind_mph,
  };

  // Armazenar os dados da previsão do tempo em um array
  const forecastDays = weather?.forecast?.forecastday;

  // Armazenar os dados de temperatura por hora em um array
  const temps = [];
  if (
    weather?.forecast?.forecastday &&
    weather.forecast.forecastday.length > 0
  ) {
    weather.forecast.forecastday[0].hour.forEach((hour) => {
      temps.push(hour.temp_c);
    });
  }

  // Filtrar os dados de temperatura por hora para obter a temperatura a cada 3 horas
  const eightTemps = temps.filter((_, i) => i % 3 === 0);

  // Adicionar a última temperatura ao array
  const nineTemps =
    temps.length > 0 ? [...eightTemps, temps[temps.length - 1]] : [];

  // Converter a data para palavras
  const dateToWords = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    date = new Date(date);
    const month = months[date.getMonth()];
    const dateNum = date.getDate();

    return `${month} ${dateNum}`;
  };

  return (
    <div className="App">
      <nav className="nav">
        <div className="logo">
          <FontAwesomeIcon
            icon="fa-brands fa-skyatlas"
            className="logo__icon"
          />
          <h1 className="logo__text">NexusWeather</h1>
        </div>
        <SearchBar setCity={setLocation} toggle={toggle} />
        <FontAwesomeIcon
          icon="fa-solid fa-circle-half-stroke"
          className="switch-mode"
          onClick={() => {
            setToggle(!toggle);
          }}
          style={{
            transform: toggle ? "scaleX(1)" : "scaleX(-1)",
          }}
        />
      </nav>

      {loading && (
        <div className="loading-message ">
          Carregando dados meteorológicos...
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="grid-two">
          <div className="grid-one">
            <CurrentWeather weatherData={currentData} />
            <div className="grid-three">
              {forecastDays?.map((day) => {
                return (
                  <Forecast
                    key={day.date}
                    date={dateToWords(day.date)}
                    icon={findIcon(day.day?.condition?.text)}
                    value={day.day?.avghumidity}
                  />
                );
              })}
            </div>
            <div className="grid-three">
              <ExtraData extraData={extraData} />
            </div>
          </div>
          <div className="grid-four">
            {nineTemps.length > 0 && <TempChart tempsData={nineTemps} />}
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
