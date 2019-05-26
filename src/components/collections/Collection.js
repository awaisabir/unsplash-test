import React from "react";
import { Image , Card, Label } from "semantic-ui-react";

class Collection extends React.Component {
    render() {
        const {
            collection,
            url
        } = this.props;

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
    }
};

export default Collection;
