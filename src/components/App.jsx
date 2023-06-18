import { Searchbar } from './Searchbar/Searchbar';
import { useState } from 'react';
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
  // const [isPaginationShow, setPaginationShow] = useState(false);
  const [urlImageModal, setUrlImageModal] = useState('');
  const [isModalShow, setModalShow] = useState(false);
  const [, setError] = useState('');
  const [imagesAfterPagination, setImagesAfterPagination] = useState('');

  const onClickMore = async () => {
    setLoading(true);

    // const images = images;

    try {
      const imagesAfterPagination2 = await getFetchData(query, page + 1);

      // this.setState({ imagesAfterPagination: imagesAfterPagination });
      setImagesAfterPagination(imagesAfterPagination2);
      console.log(imagesAfterPagination)
      console.log(imagesAfterPagination2)
      
      // this.setState(prevState => ({ page: prevState.page + 1 }));
      // setPage(prevState => ({ page: prevState.page + 1 }));
      setPage(page + 1)

      // this.setState({ images: [...images, ...imagesAfterPagination] });
      setImages([...images, ...imagesAfterPagination2] );

      setLoading(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const onModalClose = () => {
    setModalShow(false)
    // this.setState({ isModalShow: false });
  };

  const onImageClick = e => {
    // this.setState({ isModalShow: true });
    setModalShow(true);
    const url = e.target.name;
    // this.setState({ urlImageModal: url });
    setUrlImageModal(url)
  };

  const onSubmit = async e => {
    e.preventDefault();
    

    // this.setState({ isLoading: true });
    setLoading(true);
    // this.setState({ imagesAfterPagination: 0 });
    // setImagesAfterPagination('')

    const query = e.target.elements.query.value;

    try {
      const images = await getFetchData(query,page);
      // this.setState({ images: images });
      setImages(images)
      
      // this.setState({ query: query });
      setQuery(query)

      // this.setState({ isLoading: false });
      setLoading(false);

      // this.setState({ isPaginationShow: true });
    } catch (err) {
      setError( err );
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

      {((imagesAfterPagination.length < 12 && imagesAfterPagination.length > 0 ) ||
      images.length === 0) ? null : ( isLoading ? (
        <Loader />
      ) : (
        <Button onClick={onClickMore} />
      ))}

    
     
    </div>
  );
};
