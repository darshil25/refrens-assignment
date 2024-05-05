import React from 'react'
import './residentCard.css'

const ResidentCard = ({ name, image }) => {

  return (
    <div className="resident-card">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default ResidentCard