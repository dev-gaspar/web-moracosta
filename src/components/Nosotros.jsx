const Nosotros = () => {
  return (
    <div>
      <div className="top-fixed" />
      <div class="container">
        <header class="text-center my-5">
          <h1>Quiénes Somos</h1>
        </header>
        <section>
          <div class="row">
            <div class="col-lg-6">
              <h2>Nuestra Historia</h2>
              <p>Tu empresa es una organización comprometida con...</p>
            </div>
            <div class="col-lg-6">
              <h2>Nuestro Equipo</h2>
              <p>Estamos formados por un equipo de profesionales...</p>
            </div>
          </div>
        </section>

        <section class="my-5">
          <h1>Misión</h1>
          <p>Nuestra misión es...</p>
        </section>

        <section class="my-5">
          <h1>Visión</h1>
          <p>Nuestra visión es...</p>
        </section>
      </div>
    </div>
  )
}

export default Nosotros