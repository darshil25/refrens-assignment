import React, { useEffect, useState } from 'react';
import { useGetCharactersQuery } from '../../../redux/Api/rickMortyApi';
import CharacterCard from '../Cards/character/CharacterCard';
import './characters.css';
import Profile from '../Profile/Profile';
import Pagination from '../pagination/Pagination';


const Characters = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ status: '', location: '', gender: '', species: '', type: '' });
  const initialFilterState = { status: '', location: '', episode: '', gender: '', species: '', type: '' };
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const { data, error, isLoading } = useGetCharactersQuery({
    page: page,
    name: filter.name !== '' ? filter.name : undefined,
    status: filter.status !== '' ? filter.status : undefined,
    species: filter.species !== '' ? filter.species : undefined,
    type: filter.type !== '' ? filter.type : undefined,
    gender: filter.gender !== '' ? filter.gender : undefined,
  });

  const handleSearchChange = (event) => {
    console.log("🚀 ~ handleSearchChange ~ event:", event)
    setSearch(event.target.value);
    setFilter({ ...filter, [selectedCategory]: event.target.value });
  }

  const handleCardClick = id => {
    console.log('Setting ID:', id);
    setSelectedCharacterId(id);
    // console.log(selectedCharacterId)
  };

  const handleFilterChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearch('');
    setFilter({ ...filter, [event.target.value]: '' });
  }

  // const filteredCharacters = data ? data.results.filter(character => {
  //   return character.name.toLowerCase().includes(search.toLowerCase())
  //     && (filter.status === '' || character.status === filter.status)
  //     && (filter.species === '' || character.species === filter.species)
  //     && (filter.type === '' || character.type === filter.type)
  //     && (filter.gender === '' || character.gender === filter.gender)
  // }) : [];

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
        <>
          {selectedCharacterId ? (
            <Profile id={selectedCharacterId} />
          ) :
            (<>
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
                      onCardClick={handleCardClick}
                    />
                  )

                })}
              </div>
              <Pagination currentPage={page} totalPages={data.info.pages} onPageChange={handlePageChange} />
            </>)
          }
        </>
      )}
    </>
  );
}

export default Characters;
