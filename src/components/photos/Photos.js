import React from "react";
import PropTypes from "prop-types";
import StyledComponents from "styled-components";
import Photo from "./Photo";

const propTypes = {
  photos: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export const MasonryLayout = StyledComponents.div`
  column-count: 4;
  margin: 1.5em;
  padding: 0;
  column-gap: 1.5em;
`;

export const MasonryBrick = StyledComponents.div`
  display: inline-block;
  margin: 0 0 1.5em;
  width: 100%;
`;

const Photos = ({photos}) => {
    const renderPhotos = () => {
      let itemToMap = photos.results ? photos.results : photos;
  
      return itemToMap.map((photo) => (
        <MasonryBrick key={photo.id}>
          <Photo 
            photo={photo}
          />
        </MasonryBrick>
      ));
    };

    return (
        <MasonryLayout>
            {renderPhotos()}
        </MasonryLayout>
    );
};

Photos.propTypes = propTypes;
Photos.displayName = "Photos";
export default Photos;