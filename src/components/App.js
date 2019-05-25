import React, { useEffect, useState } from 'react';
import StyledComponents from "styled-components";
import Unsplash from "./helpers/Unsplash";

import { Segment, Dimmer, Loader } from "semantic-ui-react";

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

const options = [
  { key: "photos", text: "Photos", value: "photos" }
];

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [option, setOption] = useState("Photos");
  const [term, setTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    Unsplash.getPhotos(1, 20, "latest")
    .then((photos) => {
      setPhotos(photos);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  const renderPhotos = () => {
    // if it is a search query
    if (photos.results) {
      return photos.results.map((photo) => (
        <MasonryBrick key={photo.id}>
          <Photo 
            photo={photo}
          />
        </MasonryBrick>
      ));
      }

    // if it is a get by latest
    return (
      photos.map((photo) => (
        <MasonryBrick key={photo.id}>
          <Photo 
            photo={photo}
          />
        </MasonryBrick>
      ))
    );
  };

  const onSearch = (term) => {
    setTerm(term);
  };

  const onSubmit = (currentOption) => {
    setLoading(true);
    setOption(currentOption);
    
    if (currentOption === "Photos") {
      Unsplash.getPhotosByTerm(term, 1, 20)
      .then((photos) => {
        setPhotos(photos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    }
  };

  if (error) {
    return "Error ...";
  }

  if (loading) {
    return (
      <LoadingContainer>
        <Segment style={{height: "100%"}}>
          <Dimmer active inverted>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
        </Segment>
      </LoadingContainer>
    );
  }

  return (
    <React.Fragment>
      <SearchContainer>
        <SearchBar 
          onSearch={onSearch}
          onSubmit={onSubmit}
          options={options}
          currentOption={option}
        />
      </SearchContainer>

      <MasonryLayout>
        {renderPhotos()}
      </MasonryLayout>
    </React.Fragment>
  );
}

export default App;
