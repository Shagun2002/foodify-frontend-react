import React, { useContext } from 'react';
import { Form} from 'react-bootstrap';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SearchBar = () => {
  const navigate= useNavigate();
  const {searchInput, setSearchInput, fetchSearchMeals}= useContext(AuthContext);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchMeals();
    navigate('/meals')
  };

  return (
    <>
      <Form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search meals..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='mr-sm-2 ml-sm-5'
        />
        <button type="submit" className='search-button'>Search</button>
      </Form>
    </>
  );
};

export default SearchBar;
