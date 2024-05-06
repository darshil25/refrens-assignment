import { useEffect, useState } from 'react';
import { useGetEpisodesQuery } from '../../../redux/Api/rickMortyApi';
import Spinner from '../Spinner/Spinner';

import './episodeDetails.css';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import EpisodeCard from '../Cards/episode/EpisodeCard';



const EpisodeDetails = () => {

  const [page, setPage] = useState(1);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { data, error, isLoading } = useGetEpisodesQuery(page);


  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    setIsLoadingPage(true); // set loading state to true when page changes
    setPage(pageNumber);
  }

  useEffect(() => {
    if (data) {
      setIsLoadingPage(false);
    }                                            
  }, [data]);

  const handleEpisodeClick = (id) => {
    navigate('/episode-details', { state: { id } });
  };

  if (isLoading) return <Spinner />;
  return (
    <>
    {isLoadingPage ? <Spinner /> : (
      data && (
        <>
        <div className="episode-card-detail">
        {data && data.results.map((episode) => (
            <EpisodeCard 
            name={episode.name} 
            airDate={episode.air_date} 
            episode={episode.episode}
            onCardClick={() => handleEpisodeClick(episode.id)}
            />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={data.info.pages} onPageChange={handlePageChange} />

        </>
      )
    )}
    </>
  )
}

export default EpisodeDetails