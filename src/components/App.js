import React from 'react';
import StyledComponents from "styled-components";
import Unsplash from "./helpers/Unsplash";

import { Segment, Dimmer, Loader, Pagination } from "semantic-ui-react";

import Photos from "./photos/Photos";
import SearchBar from "./search/Search";
import Collections from './collections/Collections';

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
      errorMessage: "",
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
          this.photosRequest();
        } else {
          this.collectionsRequest();
        }
      } else {
          this.photosRequest();
      }
    }
  }

  photosRequest = () => {
    const { queriedTerm, currentPage } = this.state;

    this.setState({
      loading: true
    }, async () => {
      try {
        if (queriedTerm) {
          const { results, total_pages } = await Unsplash.getPhotosByTerm(queriedTerm, currentPage, 20);

          this.setState({
            photos: results,
            totalPages: total_pages,
            loading: false
          });
        } else {
          const photos = await Unsplash.getPhotos(currentPage);

          this.setState({
            photos: photos,
            loading: false
          });
        }
      } catch (_) {
        this.setState({
          loading: false,
          error: true
        });
      }    
    });
  };

  collectionsRequest = () => {
    const { queriedTerm, currentPage } = this.state;

    this.setState({
      loading: true
    }, async () => {
      try {
        const { results, total_pages } = await Unsplash.getCollectionsByTerm(queriedTerm, currentPage, 10);

        this.setState({
          collections: results,
          totalPages: total_pages,
          photos: [],
          loading: false
        });
      } catch (_) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  };

  onSearch = (term) => {
    this.setState({
      currentTerm: term,
      error: false
    });
  };

  onSubmit = (currentOption) => {
    if (this.state.currentTerm === "") {
      this.setState({
        error: true,
        errorMessage: "You need to enter a keyword to search with"
      });

      return;
    }
    
    if (currentOption === "collections") {
      (async () => {
        const { results, total_pages } = await Unsplash.getCollectionsByTerm(this.state.currentTerm, 1, 20);
          
        this.setState({
          collections: results,
          totalPages: total_pages,
          loading: false,
          queryType: currentOption,
          queriedTerm: this.state.currentTerm,
          currentPage: 1,
        });
      })();
    } else {
      (async () => {
        const { results, total_pages } = await Unsplash.getPhotosByTerm(this.state.currentTerm, 1, 20);
          
        this.setState({
          photos: results,
          totalPages: total_pages,
          loading: false,
          queryType: currentOption,
          queriedTerm: this.state.currentTerm,
          currentPage: 1
        });
      })();
    }
  };

  render() {
    const {
      loading,
      error,
      photos,
      currentPage,
      totalPages,
      queryType,
      collections
    } = this.state;
  
    return (
      <React.Fragment>
        <SearchContainer>
          <SearchBar 
            onSearch={this.onSearch}
            onSubmit={this.onSubmit}
            options={options}
            currentOption={queryType}
            error={error}
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
