import css from './Modal.module.css'
import PropTypes from 'prop-types'

export const Modal = ({ url, closeModal }) => {
  return (
    <div onClick={closeModal} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};



Modal.propTypes = {
  closeModal: PropTypes.func,
  url: PropTypes.string.isRequired,
}