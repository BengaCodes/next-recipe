import React from 'react'


const Cards = ({ imageUrl, recipeName }) => {
  return (
    <a className="card">
      <img src={imageUrl} alt={recipeName} style={{ width: '100%' }} />
      <div className="container">
        <h4><b>{recipeName}</b></h4>
      </div>
    </a>
  )
}

export default Cards
