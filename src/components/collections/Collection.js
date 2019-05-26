import React from "react";
import StyledComponents from "styled-components";
import { Image , Card } from "semantic-ui-react";

const CollectionsContainer = StyledComponents.div`
    justify-content: space-evenly;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
`;

class Collections extends React.Component {
    renderCollections = () => (
        this.props.collections.results.map((collection) => {
            const url = collection.cover_photo ? collection.cover_photo.urls.regular : "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image";
            
            return (
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
                        <Card.Description>
                            {collection.description}
                        </Card.Description>
                    </Card.Content>
                </Card>
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