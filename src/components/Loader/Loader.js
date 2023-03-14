import React from 'react';
import css from '../Loader/Loader.module.css';

export class Loader extends React.Component {
  render() {
    return (
      <div className={css.lds__ripple}>
        <div></div>
        <div></div>
      </div>
    );
  }
}
