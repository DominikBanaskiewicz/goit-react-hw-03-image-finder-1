import React from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { fetchGalleryimages } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
export class App extends React.Component {
  static defaultProps = {};

  static propTypes = {};
  state = {
    images: [],
    isLoading: false,
    searchQuery: ' ',
    pageNumber: 1,
    isModalOpen: false,
    largeImageURL: null,
    isLoadMoreButtonVisible: false,
  };

  async getImages(searchQuery, pageNumber, isFirstSearch = true) {
    this.setState({ isLoading: true });
    try {
      const images = await fetchGalleryimages(
        searchQuery,
        this.state.pageNumber
      );
      if (images.length === 12)
        this.setState({ isLoadMoreButtonVisible: true });
      else this.setState({ isLoadMoreButtonVisible: false });
      if (isFirstSearch) {
        this.setState({ images });
      } else {
        this.setState({ images: this.state.images.concat(images) });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
        pageNumber: this.state.pageNumber + 1,
      });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  async componentDidMount() {
    this.scrollToBottom();
    this.setState({ isLoading: true });
    try {
      const images = await fetchGalleryimages('', this.pageNumber);
      if (images.length === 12)
        this.setState({ isLoadMoreButtonVisible: true });
      else this.setState({ isLoadMoreButtonVisible: false });
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
        pageNumber: this.state.pageNumber + 1,
      });
    }
  }

  onSubmit = async search => {
    this.setState({
      searchQuery: search,
      images: [],
      pageNumber: 1,
      isLoaded: false,
      isModalOpen: false,
      lagerImageUrl: null,
    });

    await this.getImages(search);
  };

  onClickLoadMore = () => {
    const { pageNumber, searchQuery } = this.state;
    this.getImages(searchQuery, pageNumber + 1, false);
  };

  getLargeimageUrl = (id, images) => {
    return images.find(elem => elem.id === Number(id)).largeImageURL;
  };

  onImageClick = imageId => {
    const lagerImageUrl = this.getLargeimageUrl(imageId, this.state.images);
    this.setState({ isModalOpen: true, largeImageURL: lagerImageUrl });
  };

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      images,
      isLoading,
      isModalOpen,
      largeImageURL,
      isLoadMoreButtonVisible,
    } = this.state;
    return (
      <div className="App">
        <Searchbar handleSubmit={this.onSubmit} />
        <ImageGallery images={images} onImageClick={this.onImageClick} />
        {isLoading && <Loader />}
        <div
          ref={el => {
            this.el = el;
          }}
        />
        {isModalOpen && (
          <Modal
            largeImageUrl={largeImageURL}
            onClose={this.closeModal}
          ></Modal>
        )}
        {isLoadMoreButtonVisible && (
          <Button onClickLoadMore={this.onClickLoadMore} />
        )}
      </div>
    );
  }
}
