import  { useEffect, useState } from 'react';
import { useGetProfileQuery, rickMortyApi } from '../../../redux/Api/rickMortyApi';
import { useDispatch } from 'react-redux';
import './profile.css';
import EpisodeCard from '../Cards/episode/EpisodeCard';
import ResidentCard from '../Cards/resident/ResidentCard';
import Spinner from '../Spinner/Spinner';
import { useLocation } from 'react-router-dom';



const Profile = () => {
  const location = useLocation();
  const id = location.state ? location.state.id : null;

  const { data, error, isLoading } = useGetProfileQuery(id);
  const dispatch = useDispatch();
  const [episodes, setEpisodes] = useState([]);
  const [Location, setLocation] = useState([]);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    if (data) {
      const episodeIds = data.episode.map(url => url.split('/').pop());
      Promise.all(episodeIds.map(id => dispatch(rickMortyApi.endpoints.getEpisode.initiate(id))))
        .then(episodes => setEpisodes(episodes.map(episode => episode.data)));

      const locationId = data.location.url.split('/').pop();
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
  if (error) return `Error: ${error.message}`;

  return (
    <>
    <div className='profile'>
      <div className='profile-details'>
        <div className='profile-image'>
          <img src={data.image} alt={data.name} />
        </div>
        <div className='profile-d'>
          <h2>Name: {data.name}</h2>
          <div className="status">
            <p>Status: {data.status}</p>
            <span className={`dot ${data.status === 'Alive' ? 'green' : data.status === 'Dead' ? 'red' : 'gray'}`}></span>
          </div>
          <p>Species: {data.species}</p>

          <p className={data.type ? 'type' : ''} style={data.type ? {} : { display: 'none' }}>Type: {data.type}</p>

          <p>Gender: {data.gender}</p>
          <p>Last known location: {data.location.name}</p>
          <p>First seen in: {episodes[0] ? episodes[0].name : 'Loading...'}</p>
        </div>
      </div>

      <div className="episodes">
        <h2>Episodes:</h2>
        <div className="episode-data">
          {episodes.map((episode, index) => (
            <EpisodeCard key={index} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
          ))}
        </div>
      </div>

      <div className="location-detail">
        <h2>Location:</h2>
        {Location && (
          <div className="location-data">
            <p>Origin: {data.origin.name}</p>
            <p>Dimension: {Location.dimension}</p>
            <p>Number of residents: <b>{Location.residents ? Location.residents.length : 0}</b></p>
          </div>
        )}
        <div className="resident-data">
          {residents.map((resident, index) => (
            resident && 
            <ResidentCard 
            key={index} 
            name={resident.name} 
            image={resident.image} />
          ))}
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Profile