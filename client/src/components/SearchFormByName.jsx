import React, { useState } from 'react';
import css from './SearchFormByName.module.css';

const SearchFormByName = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleClick = () => onSearch(query);

  return (
    <div className={css.block}>
      <h2 className={css.title}>Search car by name</h2>

      <input
        className={css.input}
        type="text"
        placeholder="search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className={css.button} onClick={handleClick}>
        Search car
      </button>
    </div>
  );
};

export default SearchFormByName;
