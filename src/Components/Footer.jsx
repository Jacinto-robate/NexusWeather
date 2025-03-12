import "./Footer.css";

const Rodape = () => {
  return (
    <div className="footer">
      <h3 className="footer__text">
        Criado e desenvolvido por{" "}
        <a href="https://github.com/jacinto-robate" target="_blank">
          Jacinto Robate
        </a>{" "}
        com React, CSS, Chart.js, GeolocationAPI e WeatherAPI.
      </h3>
    </div>
  );
};

export default Rodape;
