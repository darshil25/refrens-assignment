import React from 'react'
import './locationCard.css'

const LocationCard = ({ id, name, type, dimension, onCardClick }) => {
  return (
    <div className="loc-card"
      onClick={() => {
        onCardClick(id);
      }}>
        <h4 className = "card-title" > Name: { name }</h4>
        <p className="card-text">Type: {type}</p>
        <p className="card-text">Dimension: {dimension}</p>
      </div >
      )
}

export default LocationCard