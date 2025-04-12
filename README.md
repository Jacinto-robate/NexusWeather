# NexusWeather

Uma aplicação meteorológica moderna e responsiva desenvolvida com React que fornece dados meteorológicos em tempo real, previsões e visualizações.

![Captura de tela da aplicação NexusWeather](https://jacintorobate.vercel.app/_next/image?url=%2Fprojects%2Fweather.png&w=1920&q=75)

## Funcionalidades

- **Dados Meteorológicos em Tempo Real**: Obtenha condições climáticas atuais para qualquer localização no mundo
- **Geolocalização Automática**: Detecta a localização do usuário para fornecer informações meteorológicas locais
- **Previsão de 3 Dias**: Visualize previsões meteorológicas para os próximos dias
- **Gráfico de Temperatura Interativo**: Visualize as mudanças de temperatura ao longo do dia
- **Modo Dia/Noite**: Alternância automática de tema com base na hora do dia e opção de alternância manual
- **Métricas Meteorológicas Detalhadas**: Visualize umidade, pressão, velocidade do vento e mais
- **Design Responsivo**: Otimizado para dispositivos desktop e móveis

## Tecnologias Utilizadas

- **React**: Biblioteca frontend para construção da interface do usuário
- **Chart.js**: Visualização interativa de dados para tendências de temperatura
- **API de Geolocalização**: Detecção automática da localização do usuário
- **Weather API**: Dados meteorológicos em tempo real e previsões
- **FontAwesome**: Ícones meteorológicos e elementos de UI
- **CSS**: Estilização personalizada e design responsivo

## Estrutura do Projeto

```
NexusWeather/
├── src/
│   ├── Components/
│   │   ├── CurrentWeather.jsx  # Exibição do clima atual
│   │   ├── ExtraData.jsx       # Métricas meteorológicas adicionais
│   │   ├── Forecast.jsx        # Componente de previsão de três dias
│   │   ├── Footer.jsx          # Rodapé da aplicação
│   │   ├── SearchBar.jsx       # Funcionalidade de busca por localização
│   │   └── TempChart.jsx       # Visualização de temperatura
│   ├── assets/                 # Imagens e recursos estáticos
│   ├── App.jsx                 # Componente principal da aplicação
│   ├── conditionsData.js       # Mapeamentos de condições meteorológicas
│   └── ...
└── ...
```

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/Jacinto-robate/NexusWeather.git
   cd NexusWeather
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` no diretório raiz e adicione sua chave de API Weather:

   ```
   VITE_API_KEY=sua_chave_weatherapi_aqui
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra seu navegador e navegue para `http://localhost:3000`

## Integração com API

O NexusWeather utiliza o serviço [WeatherAPI](https://www.weatherapi.com/) para buscar dados meteorológicos. Para usar esta aplicação, você precisará:

1. Cadastrar-se para uma conta gratuita na [WeatherAPI](https://www.weatherapi.com/)
2. Gerar uma chave de API
3. Adicionar a chave ao seu arquivo `.env` conforme mostrado nas instruções de configuração

## Detalhes das Funcionalidades

### Exibição do Clima Atual

Mostra temperatura, localização, hora, data e condições meteorológicas atuais com ícones apropriados.

### Previsão do Tempo

Exibe dados de previsão para os próximos três dias, incluindo níveis de umidade e condições meteorológicas.

### Gráfico de Temperatura

Gráfico de linha interativo mostrando variações de temperatura ao longo do dia em intervalos de 3 horas.

### Modo Dia/Noite

Alterna automaticamente entre temas de dia e noite com base na hora atual do dia, com opção de alternância manual para preferência do usuário.

### Funcionalidade de Busca

Permite aos usuários buscar informações meteorológicas por nome de cidade ou localização.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 📞 Contato

- **LinkedIn**: [Jacinto Robate](https://www.linkedin.com/in/jacinto-robate-942a62267/)
