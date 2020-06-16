import React, { Component } from 'react';
import '../index.css';
import Search from './Search';
import Nav from './Nav';
import Container from './Container';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import apiKey from '../config.js';
import NotFound from './NotFound';

// This is an array of objects of flickr URLs which can be iterated over //

const photoArray = [
  `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=beach&per_page=24&page=1&format=json&nojsoncallback=1`,
  `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=park&per_page=24&page=1&format=json&nojsoncallback=1`,
  `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=city&per_page=24&page=1&format=json&nojsoncallback=1`,
];

// I have created this so I can pass down a list of ids for unique keys. I cant use the one in state because it has be formatted into one URL. //

// importing axios to fetch the API //

const axios = require('axios').default;

/* API key for flickr 
1fdb4b04f796cf2df19484cef0925651
*/

export default class App extends Component {
  state = {
    beachURLs: [],
    parkURLs: [],
    cityURLs: [],
    searchImages: [],
    loading: true,
  };

  // I am using axios so there is no need to convert the data to json, I am using using component did mount so i will only request
  // API data once the component has loaded //

  componentDidMount() {
    this.getGifImages(0, 'beachURLs');
    this.getGifImages(1, 'parkURLs');
    this.getGifImages(2, 'cityURLs');
  }

  // This method get the images via axios, uses another function
  // createImageURLs which then formats the data into a usable
  // URL address and it is put in a new array which is used ot update state //

  getGifImages = (arrayNo, key) => {
    this.updateLoading();
    axios
      .get(photoArray[arrayNo])
      .then((res) => res.data.photos.photo)
      .then((images) => {
        let gallery = this.createImageURLs(images);
        this.setState({
          [key]: gallery,
        });
      })
      .catch((error) => console.log('Error fetching and parsing data', error));
  };

  createImageURLs = (photos) => {
    let newArray = photos.map(
      (photo) =>
        `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
      // images.push(URL);
    );
    return newArray;
  };

  // Update loading state beofre searching

  updateLoading = () => {
    this.setState({
      loading: true,
    });
  };

  //Perform search //

  performSearch = (query) => {
    this.setState({});
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1fdb4b04f796cf2df19484cef0925651&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`
      )
      .then((res) => res.data.photos.photo)
      .then((images) => {
        let gallery = this.createImageURLs(images);
        this.setState({
          searchImages: gallery,
          loading: false,
        });
      })
      .catch((error) => console.log('Error fetching and parsing data', error));
  };

  render() {
    return (
      <BrowserRouter>
        <Search
          performSearch={this.performSearch}
          updateLoading={this.updateLoading}
          loading={this.state.loading}
        />
        <Nav />
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/beach" />} />
            <Route
              path="/beach"
              render={() => (
                <Container
                  images={this.state.beachURLs}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/park"
              render={() => (
                <Container
                  images={this.state.parkURLs}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/city"
              render={() => (
                <Container
                  images={this.state.cityURLs}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <Container
                  images={this.state.searchImages}
                  loading={this.state.loading}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
