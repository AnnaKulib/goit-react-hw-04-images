import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    // <div style={{ maxWidth: 1170, margin: '0 auto', padding: 15 }}>
    <ul className={s.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          cardUrl={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      ))}
    </ul>
    // </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  onClick: PropTypes.func,
};

export default ImageGallery;
