import PropTypes from 'prop-types';
import React from 'react';
import css from '../Searchbar/Searchbar.module.css';

export class Searchbar extends React.Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    console.log(searchQuery);
    this.props.handleSubmit(searchQuery);
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
