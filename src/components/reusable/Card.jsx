import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'

const Card = ({ id, image, name, status, species, type, gender, location, onCardClick }) => {
  return (
    <div className="card" onClick={() => {
      onCardClick(id);
    }}>
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">

        {/* character name, gender, species and status */}
        <div className='details'>
          <h2 className="card-name">{name}</h2>
          <div className="sta_spe">
            <span className={`dot ${status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray'}`}></span>
            <p>{status} - {species} - {gender}</p>
          </div>
        </div>

        {/* character type*/}
        <div className={type ? 'type' : ''} style={type ? {} : { display: 'none' }}>
          <p className='cat'>Type</p>
          <p>{type}</p>
        </div>

        {/* character location */}
        <div className="location">
          <p className='cat'>Location</p>
          <p>{location}</p>
        </div>
      </div>
    </div>
  )
}

export default Card