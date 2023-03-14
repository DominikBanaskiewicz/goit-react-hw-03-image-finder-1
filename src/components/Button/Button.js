import PropTypes from 'prop-types';
import React from 'react';
import css from '../Button/Button.module.css';

export class Button extends React.Component {
  render() {
    return (
      <button
        type="submit"
        className={css.Button}
        onClick={this.props.onClickLoadMore}
      >
        <span className="button-label">Load images</span>
      </button>
    );
  }
}
Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};
