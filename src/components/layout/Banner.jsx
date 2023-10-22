import React from 'react'

const Banner = ({ text }) => {
  return (
    <div className="section_banner">
      <div className="container">
        <h1 className="text-center text-uppercase text-white">
          {text}
        </h1>
      </div>
    </div>
  )
}

export default Banner