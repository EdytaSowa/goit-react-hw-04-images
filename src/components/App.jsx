import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { getFetchData } from './api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';


export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    isPaginationShow: false,
    urlImageModal: '',
    isModalShow: false,
    error: '',
    imagesAfterPagination: 0,
  };

  onClickMore = async () => {
    this.setState({ isLoading: true });

    const images = this.state.images;

    try {
      const imagesAfterPagination = await getFetchData(
        this.state.query,
        this.state.page + 1
      );
      this.setState({ imagesAfterPagination: imagesAfterPagination });
      this.setState(prevState => ({ page: prevState.page + 1 }));
      this.setState({ images: [...images, ...imagesAfterPagination] });
      this.setState({ isLoading: false });
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onModalClose = () => {
    this.setState({ isModalShow: false });
  };

  onImageClick = e => {
    this.setState({ isModalShow: true });
    const url = e.target.name;
    this.setState({ urlImageModal: url });
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });
    this.setState({ imagesAfterPagination: 0 });

    const query = e.target.elements.query.value;



    try {
      const images = await getFetchData(query, this.state.page);
      this.setState({ images: images });
      this.setState({ query: query });
      this.setState({ isLoading: false });
      this.setState({ isPaginationShow: true });
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

        {this.state.isLoading ? (
          <Loader
          />
        ) : null}

        <ImageGallery
          images={this.state.images}
          onImageClick={this.onImageClick}
        />

        {!this.state.isModalShow ? null : (
          <Modal
            url={this.state.urlImageModal}
            closeModal={this.onModalClose}
          />
        )}

        {this.state.imagesAfterPagination.length < 12 ||
        this.state.images.length === 0 ? null : this.state.isLoading ? (
          <Loader
          />
        ) : (
          <Button onClick={this.onClickMore} />
        )}
    
      </div>
    );
  }
}
