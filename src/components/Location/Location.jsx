import { useEffect, useState } from 'react';
import { useGetLocationsQuery } from '../../../redux/Api/rickMortyApi';
import Spinner from '../Spinner/Spinner';
import LocationCard from '../Cards/location/LocationCard';
import './location.css';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';



const Location = () => {

  const [page, setPage] = useState(1);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { data, error, isLoading } = useGetLocationsQuery(page);


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

  const handleLocationClick = (id) => {
    navigate('/location-details', { state: { id } });
  };

  if (isLoading) return <Spinner />;
  return (
    <>
    {isLoadingPage ? <Spinner /> : (
      data && (
        <>
        <div className="location-card-detail">
        {data && data.results.map((location) => (
            <LocationCard 
            key={location.id} 
            name={location.name} 
            type={location.type} 
            dimension={location.dimension}
            onCardClick={() => handleLocationClick(location.id)}
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

export default Location