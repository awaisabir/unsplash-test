import React from "react";
import PropTypes from "prop-types";
import { Image , Card, Label } from "semantic-ui-react";

const propTypes = {
    collection: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired
};

const Collection = ({collection, url}) => {
    const renderTags = () => {
        if (collection.tags) {
            return (
                collection.tags.map((tag, i) => (
                    <Label key={i} style={{marginTop: "5px"}}>
                        {tag.title}
                    </Label>
                ))
            );
        }
    };

    return(
        <Card>
            <Image
                as="a"
                target="_blank"
                href={`${collection.links.html}`}
                src={url}
                size={"small"}
                style={{width: "100%"}}
            />
            <Card.Content>
                <Card.Header>{collection.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>Created in {new Date(collection.published_at).getFullYear()}</span>
                </Card.Meta>
                {renderTags()}
                <Card.Description style={{marginTop: "5px"}}>
                    {collection.description}
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

Collection.propTypes = propTypes;
Collection.displayName = "CollectionListItem";
export default Collection;
