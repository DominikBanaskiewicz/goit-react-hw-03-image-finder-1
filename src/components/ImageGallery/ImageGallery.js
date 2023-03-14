import { ImageGalleryitem } from 'components/ImageGalleryItem/ImageGalleryitem';
import PropTypes from 'prop-types';
import React from 'react';
import css from '../ImageGallery/ImageGallery.module.css';

export class ImageGallery extends React.Component {
  onImageClick = evt => {
    evt.preventDefault();
    this.props.onImageClick(evt.target.id);
  };
  render() {
    const { images } = this.props;
    if (typeof images !== 'undefined') {
      return (
        <ul className={css.ImageGallery}>
          {images.map(elem => (
            <ImageGalleryitem
              key={elem.id}
              id={elem.id}
              image={elem}
              onImageClick={this.onImageClick}
            />
          ))}
        </ul>
      );
    }
  }
}
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
