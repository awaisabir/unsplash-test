import React from "react";
import StyledComponents from "styled-components";

import Collection from "./Collection";

const CollectionsContainer = StyledComponents.div`
    justify-content: space-evenly;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
`;

class Collections extends React.Component {
    renderCollections = () => (
        this.props.collections.map((collection) => {
            const url = collection.cover_photo ? collection.cover_photo.urls.regular : "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image";
            
            return (
                <Collection
                    key={collection.renderCollections}
                    collection={collection}
                    url={url}
                />
            );
        })
    );

    render() {
        return (
            <CollectionsContainer>
                {this.renderCollections()}
            </CollectionsContainer>
        );
    }
}

export default Collections;