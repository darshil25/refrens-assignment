import { useEffect, useState } from 'react';
import { useGetCharactersQuery } from '../../../redux/Api/rickMortyApi';
import CharacterCard from '../Cards/character/CharacterCard';
import './home.css';
import Pagination from '../pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoadingPage, setIsLoadingPage] = useState(false); 
  const [filter, setFilter] = useState({ status: '', gender: '', species: '', type: '' });
  const [selectedCategory, setSelectedCategory] = useState('name');
  const { data, error, isLoading } = useGetCharactersQuery({
    page: page,
    name: filter.name !== '' ? filter.name : undefined,
    status: filter.status !== '' ? filter.status : undefined,
    species: filter.species !== '' ? filter.species : undefined,
    type: filter.type !== '' ? filter.type : undefined,
    gender: filter.gender !== '' ? filter.gender : undefined,
  });
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    console.log("🚀 ~ handleSearchChange ~ event:", event)
    setSearch(event.target.value);
    setFilter({ ...filter, [selectedCategory]: event.target.value });
  }

  const handleCharacterClick = (id) => {
    navigate('/profile', { state: { id } });
  };

  const handleFilterChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearch('');
    setFilter({ ...filter, [event.target.value]: '' });
  }

  const handlePageChange = (pageNumber) => {
    setIsLoadingPage(true); // set loading state to true when page changes
    setPage(pageNumber);
  }
  useEffect(() => {
    if (data) {
      setIsLoadingPage(false); // set loading state to false when data is fetched
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoadingPage ? <Spinner /> : ( // display spinner if page is loading
      data && (
        <>
          <div className="filter">
            <input type="text" name="search" value={search} onChange={handleSearchChange} placeholder="Search" />
            <select name="category" value={selectedCategory} onChange={handleFilterChange}>
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="gender">Gender</option>
              <option value="species">Species</option>
              <option value="type">Type</option>
            </select>
          </div>
          <div className='characters-grid'>
            {data.results.map((character) => {
              console.log('Character ID:', character.id); // This will log the ID of the chara
              return (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  image={character.image}
                  name={character.name}
                  status={character.status}
                  species={character.species}
                  type={character.type}
                  gender={character.gender}
                  location={character.location.name}
                  onCardClick={() => handleCharacterClick(character.id)}
                />
              )

            })}
          </div>
          <Pagination currentPage={page} totalPages={data.info.pages} onPageChange={handlePageChange} />
        </>
      ))}
    </>
  );
}

export default Home;
