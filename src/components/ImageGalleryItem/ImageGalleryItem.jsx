import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

export const ImageGalleryItem = ({ image, onclick }) => (
  <li className={css.ImageGalleryItem} id={image.id} onClick={onclick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
);


ImageGalleryItem.propTypes = {
  onclick: PropTypes.func,
  image: PropTypes.object,
}