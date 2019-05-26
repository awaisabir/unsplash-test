import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";

const propTypes = {
    photo: PropTypes.object.isRequired
};

const PhotoItem = ({photo}) => (
    <Image
        alt={photo.title}
        style={{width: "100%"}}
        src={`${photo.urls.regular}`}
        size={"small"}
    />
);

PhotoItem.propTypes = propTypes;
PhotoItem.displaName = "PhotoItem";
export default PhotoItem;