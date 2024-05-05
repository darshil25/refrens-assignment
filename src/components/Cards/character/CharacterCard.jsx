import PropTypes from 'prop-types';
import './characterCard.css'

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
            {/* added condition to display color Accordingly */}
            <span className={`dot ${status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray'}`}></span>
            <p>{status} - {species} - {gender}</p>
          </div>
        </div>

        {/* character type*/}
        {/* added condition to display type if available */}
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

Card.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string,
  gender: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Card