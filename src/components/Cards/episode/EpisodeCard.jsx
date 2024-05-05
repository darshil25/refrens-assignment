import './episodeCard.css'
import PropTypes from 'prop-types';

const EpisodeCard = ({name, airDate, episode}) => {
  return (
    <div className="episode-card">
      <h3>{name}</h3>
      <p>{airDate}</p>
      <p>{episode}</p>
    </div>
  )
}
EpisodeCard.propTypes = {
  name: PropTypes.string.isRequired,
  airDate: PropTypes.string.isRequired,
  episode: PropTypes.string.isRequired,
};

export default EpisodeCard