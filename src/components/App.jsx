import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { getFetchData } from './api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [urlImageModal, setUrlImageModal] = useState('');
  const [isModalShow, setModalShow] = useState(false);
  const [imagesAfterPagination, setImagesAfterPagination] = useState('');

  const onClickMore = async () => {
    setLoading(true);

    try {
      const imagesAfterPagination = await getFetchData(query, page + 1);
      setImagesAfterPagination(imagesAfterPagination);
      setPage(page + 1);
      setImages([...images, ...imagesAfterPagination]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onModalClose = () => {
    setModalShow(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    });
  }, []);

  const onImageClick = e => {
    setModalShow(true);
    const url = e.target.name;
    setUrlImageModal(url);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setImagesAfterPagination('');

    const query = e.target.elements.query.value;

    try {
      const images = await getFetchData(query, page);
      setImages(images);
      setQuery(query);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={onSubmit} />

      {isLoading ? <Loader /> : null}

      <ImageGallery images={images} onImageClick={onImageClick} />

      {!isModalShow ? null : (
        <Modal url={urlImageModal} closeModal={onModalClose} />
      )}

      {(imagesAfterPagination.length < 12 &&
        imagesAfterPagination.length > 0) ||
      images.length === 0 ? null : isLoading ? (
        <Loader />
      ) : (
        <Button onClick={onClickMore} />
      )}
    </div>
  );
};
