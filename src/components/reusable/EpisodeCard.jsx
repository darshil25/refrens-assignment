import React from 'react'

const EpisodeCard = ({name, airDate, episode}) => {
  return (
    <div className="episode-card">
      <h3>{name}</h3>
      <p>{airDate}</p>
      <p>{episode}</p>
    </div>
  )
}

export default EpisodeCard