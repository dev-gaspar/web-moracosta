import Sidenav from '../layout/Sidenav'

const Vehiculos = () => {
  return (
    <Sidenav
      mainContent={
        <div className="content">
          <div className="row ">
            <div className="col-xl-12">
              <div
                className="card shadow bg-body rounded"
                style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
              >
                <div className="d-flex justify-content-between card-body">
                  <h4 className="page-title">Vehiculos</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow bg-body rounded">
                <div className="card-body">

                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Vehiculos