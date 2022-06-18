import React, { Component } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Audio } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { animateScroll as scroll } from 'react-scroll';

import api from 'services/API';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';
import s from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    status: 'idle',
    total: 0,
    largeImage: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({
        images: [],
        status: 'pending',
        page: 1,
      });
      this.getImages();
    }
    if (page !== prevState.page && page !== 1) {
      this.setState({
        status: 'pending',
      });
      this.getImages();
      scroll.scrollToBottom();
    }
  };

  submitSomeProps = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

  async getImages() {
    const { searchQuery, page } = this.state;

    try {
      const imagesGallery = await api.ServiceApi(searchQuery, page);

      if (imagesGallery.hits.length === 0) {
        this.setState({
          status: 'idle',
        });
        return toast.error(`${searchQuery} not found`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...imagesGallery.hits],
        status: 'resolved',
        total: imagesGallery.totalHits,
      }));
    } catch (error) {
      this.setState({
        error,
        status: 'rejected',
      });
    }
  }

  handleLoadMoreButtonClick = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImage = event => {
    this.toggleModal();
    this.setState({ largeImage: event });
  };

  render() {
    const { images, showModal, status, total, largeImage } = this.state;
    const { submitSomeProps, toggleModal, handleLoadMoreButtonClick } = this;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={submitSomeProps} />
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.onClickImage} />
        )}
        {status === 'pending' && (
          <div>
            <Loader />
            <Audio
              height="100"
              width="100"
              color="#3f51b594"
              ariaLabel="loading"
            />
          </div>
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt={''} className={s.modalImage} />
          </Modal>
        )}
        {images.length > 0 && images.length < total && (
          <Button onClick={handleLoadMoreButtonClick} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
