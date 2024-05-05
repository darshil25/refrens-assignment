import React, { useEffect, useState } from 'react';
import { useGetProfileQuery, rickMortyApi } from '../../redux/Api/rickMortyApi';
import { useDispatch } from 'react-redux';
import './profile.css';
import EpisodeCard from './reusable/EpisodeCard';



const Profile = ({ id, deviceType }) => {
  const { data, error, isLoading } = useGetProfileQuery(id);
  const dispatch = useDispatch();
  const [episodes, setEpisodes] = useState([]);
  console.log("🚀 ~ Profile ~ episodes:", episodes)

  useEffect(() => {
    if (data) {
      const episodeIds = data.episode.map(url => url.split('/').pop());
      Promise.all(episodeIds.map(id => dispatch(rickMortyApi.endpoints.getEpisode.initiate(id))))
        .then(episodes => setEpisodes(episodes.map(episode => episode.data)));
    }
  }, [data, dispatch]);

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className='profile'>
      <div className='profile-details'>
        <div className='profile-image'>
          <img src={data.image} alt={data.name} />
        </div>
        <div className='profile-d'>
          <h2>name: {data.name}</h2>
          <div className="status">
            <p>Status: {data.status}</p>
            <span className={`dot ${data.status === 'Alive' ? 'green' : data.status === 'Dead' ? 'red' : 'gray'}`}></span>
          </div>
          <p>Species: {data.species}</p>

          <p className={data.type ? 'type' : ''} style={data.type ? {} : { display: 'none' }}>Type: {data.type}</p>

          <p>Gender: {data.gender}</p>
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
      <div className="location">

      </div>
    </div>
  )
}

export default Profile