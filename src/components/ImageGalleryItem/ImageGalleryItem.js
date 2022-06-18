import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ cardUrl, alt, onClick }) => (
  <li className={s.imageGalleryItem} onClick={onClick}>
    <img className={s.imageGalleryItem__image} src={cardUrl} alt={alt}></img>
  </li>
);

ImageGalleryItem.propTypes = {
  cardUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
