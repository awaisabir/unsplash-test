import React from 'react';
import StyledComponents from "styled-components";
import Unsplash from "./helpers/Unsplash";

import { Segment, Dimmer, Loader, Pagination } from "semantic-ui-react";

import Photo from "./photos/Photo";
import SearchBar from "./search/Search";

const MasonryLayout = StyledComponents.div`
  column-count: 4;
  margin: 1.5em;
  padding: 0;
  column-gap: 1.5em;
`;

const MasonryBrick = StyledComponents.div`
  display: inline-block;
  margin: 0 0 1.5em;
  width: 100%;
`;

const SearchContainer = StyledComponents.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const LoadingContainer = StyledComponents.div`
  height: 100vh;
`;

const PaginationContainer = StyledComponents.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const options = [
  { key: "photos", text: "Photos", value: "photos" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
      error: false,
      selectedOption: "Photos",
      currentTerm: "",
      queriedTerm: "",
      totalPages: 350,
      currentPage: 1
    }
  }

  componentDidMount() {
    const { currentPage } = this.state;

    this.setState({loading: true}, () => {
      Unsplash.getPhotos(currentPage, 20, "latest")
        .then((photos) => {
          this.setState({
            loading: false,
            photos: photos
          });
        })
        .catch((err) => {
          this.setState({
            loading: false,
            error: true
          });
        });
    });
  }

  componentDidUpdate(_, prevState) {
    const { queriedTerm, currentPage } = this.state;

    // if the page has changed
    if (currentPage !== prevState.currentPage) {
      // is it a query?
      if (queriedTerm) {
        this.photosRequest("SEARCH");
      } else {
        this.photosRequest("LATEST");
      }
    }
  }

  photosRequest = (type) => {
    const { queriedTerm, currentPage } = this.state
    this.setState({
      loading: true
    });

    switch(type) {
      case "SEARCH":
        (async () => {
          try {
            const photos = await Unsplash.getPhotosByTerm(queriedTerm, currentPage, 20);
            this.setState({
              photos: photos,
              loading: false
            });
          } catch (_) {
            this.setState({
              loading: false,
              error: true
            });
          }
        })();

        break;

      case "LATEST":
          (async () => {
            try {
              const photos = await Unsplash.getPhotos(currentPage, 20, "latest");
              this.setState({
                photos: photos,
                loading: false
              });
            } catch (_) {
              this.setState({
                loading: false,
                error: true
              });
            }
          })();
      break;

      default:
        break;

    }
  }

  renderPhotos = () => {
    const { photos } = this.state;

    let itemToMap = photos.results ? photos.results : photos;

    return itemToMap.map((photo) => (
      <MasonryBrick key={photo.id}>
        <Photo 
          photo={photo}
        />
      </MasonryBrick>
    ));
  };

  onSearch = (term) => {
    this.setState({
      currentTerm: term
    });
  };

  onSubmit = (currentOption) => {
    this.setState({
      option: currentOption,
      currentPage: 1,
      loading: true,
      queriedTerm: this.state.currentTerm
    }, async () => {
      const photos = await Unsplash.getPhotosByTerm(this.state.queriedTerm, 1, 20);
      this.setState({
        photos: photos,
        loading: false
      });
    });
  };

  render() {
    const {
      loading,
      error,
      option,
      currentPage,
      totalPages
    } = this.state;

    if (error) {
      return "Error ...";
    }
  
    return (
      <React.Fragment>
        <SearchContainer>
          <SearchBar 
            onSearch={this.onSearch}
            onSubmit={this.onSubmit}
            options={options}
            currentOption={option}
          />
        </SearchContainer>
  
        {
          loading ?
          <LoadingContainer>
            <Segment style={{height: "100%"}}>
              <Dimmer active inverted>
                <Loader size="huge">Loading</Loader>
              </Dimmer>
            </Segment>
          </LoadingContainer> :
          <React.Fragment>
            <MasonryLayout>
              {this.renderPhotos()}
            </MasonryLayout>
      
            <PaginationContainer>
              <Pagination
                boundaryRange={0}
                defaultActivePage={currentPage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1} 
                totalPages={totalPages}
                onPageChange={(e, {activePage}) => this.setState({currentPage: activePage})}
              />
            </PaginationContainer>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

}

export default App;
