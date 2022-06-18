import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  onSubmitCearchForm = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return toast.error('Sorry, there are no images');
    }

    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.onSubmitCearchForm}>
          <button type="submit" className={s.searchForm__button}>
            <ImSearch />
            <span className={s.searchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={s.searchForm__input}
            onChange={this.handleInputChange}
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
}

export default Searchbar;
