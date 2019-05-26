import React from "react";
import { Image } from "semantic-ui-react";

export default ({photo}) => (
    <Image
        alt={photo.title}
        style={{width: "100%"}}
        src={`${photo.urls.regular}`}
        size={"small"}
    />
);