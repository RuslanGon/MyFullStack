import React, { useState } from 'react';
import css from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const onChangeInput = (e) => setQuery(e.target.value);
  const onClickButton = () => onSearch(query);

  return (
    <div className={css.block}>
      <h2 className={css.title}>Search car by Location</h2>

      <input
        type="text"
        value={query}
        onChange={onChangeInput}
        placeholder="search by location"
        className={css.input}
      />

      <button type="button" onClick={onClickButton} className={css.button}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
