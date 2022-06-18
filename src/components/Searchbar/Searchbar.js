import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase().trim());
  };

  const onSubmitCearchForm = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Sorry, there are no images');
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onSubmitCearchForm}>
        <button type="submit" className={s.searchForm__button}>
          <ImSearch />
          <span className={s.searchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={s.searchForm__input}
          onChange={handleInputChange}
          value={searchQuery}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
