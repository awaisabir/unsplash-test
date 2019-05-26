import React from 'react';
import StyledComponents from "styled-components";
import Unsplash from "./helpers/Unsplash";

import { Segment, Dimmer, Loader, Pagination } from "semantic-ui-react";

import Photos from "./photos/Photos";
import SearchBar from "./search/Search";
import Collections from './collections/Collection';

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
  { key: "photos", text: "Photos", value: "photos" },
  { key: "collections", text: "Collections", value: "collections" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      collections: [],
      loading: false,
      error: false,
      selectedOption: "Photos",
      currentTerm: "",
      queriedTerm: "",
      totalPages: 350,
      currentPage: 1,
      queryType: "photos"
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
    const { queriedTerm, currentPage, queryType } = this.state;

    // if the page has changed
    if (currentPage !== prevState.currentPage) {
      // is it a query?
      if (queriedTerm) {
        if (queryType === "photos") {
          this.photosRequest("SEARCH");
        } else {
          this.collectionsRequest("SEARCH");
        }
      } else {
        if (queryType === "photos") {
          this.photosRequest("LATEST");
        } else {
          this.collectionsRequest("LATEST");
        }
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
  };

  collectionsRequest = (type) => {
    const { queriedTerm, currentPage } = this.state
    this.setState({
      loading: true
    });

    switch(type) {
      case "SEARCH":
        (async () => {
          try {
            const collections = await Unsplash.getCollectionsByTerm(queriedTerm, currentPage, 10);
            this.setState({
              collections: collections,
              photos: [],
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
              const collections = await Unsplash.getCollections(currentPage, 20, "latest");
              this.setState({
                collections: collections,
                photos: [],
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
      if (this.state.option === "collections") {
        const collections = await Unsplash.getCollectionsByTerm(this.state.queriedTerm, 1, 20);
        this.setState({
          collections: collections,
          photos: [],
          loading: false,
          queryType: "collections"
        });
      }
      
      if (this.state.option === "photos") {        
        const photos = await Unsplash.getPhotosByTerm(this.state.queriedTerm, 1, 20);
        this.setState({
          photos: photos,
          collections: [],
          loading: false,
          queryType: "photos"
        });
      }
    });
  };

  render() {
    const {
      loading,
      error,
      option,
      photos,
      currentPage,
      totalPages,
      queryType,
      collections
    } = this.state;

    if (error) {
      return "Error ...";
    }
  
    console.log(collections, photos, queryType);
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

            {
              queryType === "photos" ?
                <Photos photos={photos}/> :
                <Collections collections={collections} />
            }
            <PaginationContainer>
              <Pagination
                boundaryRange={0}
                defaultActivePage={currentPage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1} 
                totalPages={totalPages}
                onPageChange={(_, {activePage}) => {
                  window.scroll(0,0);
                  this.setState({currentPage: activePage});
                }}
              />
            </PaginationContainer>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

}

export default App;
