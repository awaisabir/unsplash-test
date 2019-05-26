import React from "react";
import StyledComponents from "styled-components";
import Photo from "./Photo";


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

class Photos extends React.Component {
    renderPhotos = () => {
        const { photos } = this.props;
    
        let itemToMap = photos.results ? photos.results : photos;
    
        return itemToMap.map((photo) => (
          <MasonryBrick key={photo.id}>
            <Photo 
              photo={photo}
            />
          </MasonryBrick>
        ));
      };

    render() {
        return (
            <MasonryLayout>
                {this.renderPhotos()}
            </MasonryLayout>
        )
    }
};

export default Photos;