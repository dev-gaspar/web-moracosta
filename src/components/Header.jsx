import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <section className="banner" style={{height: "100vh"}}>
        <div className="banner-background">
          <video className="video-background" loop autoPlay="autoplay" muted playsInline defaultmuted="true">
            <source src="../assets/video.webm" type="video/webm" />
            Your browser does not support HTML5 video
          </video>
        </div>
      </section>

      <div className="container banner-titulo">
        <h1 className="text-center mb-3 mb-md-4">LB-Silhouette R35 GTR</h1>
        <h4 className="text-center mb-3 mb-md-3">EMOCIÓN PURA EN RUEDAS POTENTES</h4>
      </div>

      <div className="container banner-pie">
        <div>
          <p className="caract_titulo">300 CABALLOS</p>
          <p className="caract_subtitulo">DE POTENCIA</p>
        </div>
        <div>
          <p className="caract_titulo">PLUG IN</p>
          <p className="caract_subtitulo">HYBRID</p>
        </div>
        <div>
          <p className="caract_titulo">SEGURIDAD +10</p>
          <p className="caract_subtitulo">SISTEMA ADAS</p>
        </div>
        <div>
          <p className="caract_titulo">DESDE</p>
          <p className="caract_subtitulo">$199,999</p>
        </div>
        <div>
          <button>
            Ver
          </button>
        </div>
      </div>


      <section className="call-action">
        <div className="container p-4 pt-9 text-center">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 "><Link className="cta-item" to={"/modelos"}>VER MAS MODELOS</Link></div>
            <div className="col-12 col-md-6 col-lg-6"><Link className="cta-item" to={"/contacto"}>CONTACTAR AGENTE</Link></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header;