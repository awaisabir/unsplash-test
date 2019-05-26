import React from "react";
import PropTypes from "prop-types";
import StyledComponents from "styled-components";

import Collection from "./Collection";

const propTypes = {
    collections: PropTypes.array.isRequired
};

const CollectionsContainer = StyledComponents.div`
    justify-content: space-evenly;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
`;

const Collections = ({collections}) => {
    const renderCollections = () => (
        collections.map((collection) => {
            const url = collection.cover_photo ? collection.cover_photo.urls.regular : "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image";
            
            return (
                <Collection
                    key={collection.id}
                    collection={collection}
                    url={url}
                />
            );
        })
    );

    return (
        <CollectionsContainer>
            {renderCollections()}
        </CollectionsContainer>
    );
}

Collections.propTypes = propTypes;
Collections.displayName = "CollectionsList";
export default Collections;