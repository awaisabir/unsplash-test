import React from 'react';
import StyledComponents from "styled-components";
import Unsplash from "./helpers/Unsplash";

import { Segment, Dimmer, Loader, Pagination } from "semantic-ui-react";

import Photos from "./photos/Photos";
import SearchBar from "./search/Search";
import Collections from './collections/Collections';

/**
 * Styled Components
 */
export const SearchContainer = StyledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const ErrorMessageContainer = StyledComponents.div`
  color: #9f3a38;
  font-weight: bold;
`;

export const LoadingContainer = StyledComponents.div`
  height: 100vh;
`;

export const PaginationContainer = StyledComponents.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const NoResultsContainer = StyledComponents.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 50px;
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

    this.unsplash = new Unsplash();
  }

  /**
   * Fetch random images on inital mount
   */
  componentDidMount() {
    this.setState({loading: true});
    this.fetchPhotos();
  }

  /**
   * check if the page changes. If it does then make a request based on 
   * whether there was a previous query ran, or if it's random photos
   */
  componentDidUpdate(_, prevState) {
    const { queriedTerm, currentPage, queryType } = this.state;

    if (currentPage !== prevState.currentPage) {
      if (queryType === "photos" || !queriedTerm) {
        this.fetchPhotos(queriedTerm, currentPage);
      } else {
        this.fetchCollections(queriedTerm, currentPage);
      }
    }
  }

  /**
   * render photos
   */
  renderPhotos = (photos, queryType) => {
    return photos.length > 0 ? <Photos photos={photos}/> : <NoResultsContainer>No {queryType} found 😅</NoResultsContainer>
  }

  /**
   * render collections
   */
  renderCollections = (collections, queryType) => {
    return collections.length > 0 ? <Collections collections={collections}/> : <NoResultsContainer>No {queryType} found 😅</NoResultsContainer>
  }

  /**
   * Function to fetch photos and set state with necessary data
   */
  fetchPhotos = (queriedTerm, currentPage) => {
    this.setState({loading: true});

    (async () => {
      if (queriedTerm) {
        const { results, total_pages } = await this.unsplash.getPhotosByTerm(queriedTerm, currentPage, 20);
        
        this.setState({
          photos: results,
          totalPages: total_pages,
          loading: false
        });
      } else {
        const photos = await this.unsplash.getPhotos(currentPage);

        this.setState({
          photos: photos,
          totalPages: 350,
          loading: false
        });
      }
    })();
  };

  /**
   * Function to fetch collections and set state with necessary data
   */
  fetchCollections = (queriedTerm, currentPage) => {
    this.setState({loading: true});

    (async () => {
      try {
        const { results, total_pages } = await this.unsplash.getCollectionsByTerm(queriedTerm, currentPage, 10);

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
    })();
  };

  /**
   * Function to update the term every time a user types
   */
  onSearch = (term) => {
    this.setState({
      currentTerm: term,
      error: false
    });
  };

  /**
   * Function to handle the sumbission of the search bar
   */
  onSubmit = (currentOption) => {
    // if the term in empty then we need to inform the user
    if (this.state.currentTerm === "") {
      this.setState({
        error: true,
        errorMessage: "You need to enter a phrase to search for."
      });

      return;
    }
    
    // fetch based on the type of query
    if (currentOption === "collections") {
      this.fetchCollections(this.state.currentTerm, 1);
    } else {
        this.fetchPhotos(this.state.currentTerm, 1);
    }

    this.setState({
      queryType: currentOption,
      queriedTerm: this.state.currentTerm,
      currentPage: 1
    });
  };

  render() {
    const {
      loading,
      error,
      errorMessage,
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
          <ErrorMessageContainer>
            {error && errorMessage}
          </ErrorMessageContainer>

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
            {queryType === "photos" ?
                <>{this.renderPhotos(photos, queryType)}</> :
                <>{this.renderCollections(collections, queryType)}</>
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
