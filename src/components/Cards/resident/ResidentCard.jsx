
import './residentCard.css'
import PropTypes from 'prop-types';

const ResidentCard = ({ name, image }) => {

  return (
    <div className="resident-card">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  )
}

ResidentCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ResidentCard