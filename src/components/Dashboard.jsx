import React from 'react'
import Sidenav from './Sidenav'

const Dashboard = () => {
  return (
    <Sidenav
      mainContent={
        <div className="content">
          <div className="row ">
            <div className="col-xl-12">
              <div
                className="card"
                style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
              >
                <div className="card-body">
                  <h4 className="page-title">Vision general</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Dashboard