import PropTypes from 'prop-types';
import React from 'react';
import css from '../Modal/Modal.module.css';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPress);
  }
  keyPress = evt => {
    if (evt.key === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
};
