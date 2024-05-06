import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import ResidentCard from '../Cards/resident/ResidentCard';
import { useDispatch } from 'react-redux';
import { rickMortyApi, useGetLocationQuery } from '../../../redux/Api/rickMortyApi';
import { useEffect, useState } from 'react';
import './locationDetails.css';


const LocationDetails = () => {
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  const { data, error, isLoading } = useGetLocationQuery(id);
  const dispatch = useDispatch();


  const [Location, setLocation] = useState([]);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    if (data) {
        //repeated same process for location
      const locationId = data.id;
      dispatch(rickMortyApi.endpoints.getLocation.initiate(locationId))
        .then(response => {
          setLocation(response.data);

          // Fetch residents data
          const residentIds = response.data.residents.map(url => url.split('/').pop());
          Promise.all(residentIds.map(id => dispatch(rickMortyApi.endpoints.getProfile.initiate(id))))
            .then(residents => setResidents(residents.map(resident => resident.data)));
        });
    }
  }, [data, dispatch]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="single-location">
      <div className="location-info">
        <h1>{Location.name}</h1>
        <p>Type: {Location.type}</p>
        <p>Dimension: {Location.dimension}</p>
        <p>Number of residents: <b>{Location.residents ? Location.residents.length : 0}</b></p>
      </div>

      <div className="res-data">
      <h2>Residents</h2>
      <div className="resident-data">
  {residents.length === 0 ? (
    <p>No residents found</p>
  ) : (
    residents.map((resident, index) => (
      resident && 
      <ResidentCard 
        key={index} 
        name={resident.name} 
        image={resident.image} 
      />
    ))
  )}
</div>
      </div>
      
      </div>
    </>
  )
}

export default LocationDetails