import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import { assert } from "chai";

import Collection from "../../../components/collections/Collection";
import { Card, Image, Label } from "semantic-ui-react";

describe("Collections", function() {
    let sandbox;
    let wrapper;
    let props;

    const defaultProps = {
        collection: {
            title: "Title Collection",
            published_at: "2016-03-02T13:32:54-05:00",
            description: "Dummy description",
            id: "e2933JEFWINJwnjejoiOIENWGEGWEnewioiooi",
            cover_photo: {
                urls : {
                    regular: "https://www.lifewire.com/thmb/GGQdFhKxulx9XEdR5c1OD4Gw7Y8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg"
                }
            }
        },
        url: "https://www.lifewire.com/thmb/GGQdFhKxulx9XEdR5c1OD4Gw7Y8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg"
    };

    const renderCollection = (props) => shallow(
        <Collection {...props} />
    );

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("renders the Semantic UI components with correct title", () => {
        wrapper = renderCollection(defaultProps);

        assert.equal(wrapper.find(Card).length, 1);
        assert.equal(wrapper.find(Card).props().src, defaultProps.collection.url);
        
        assert.equal(wrapper.find(Card.Content).length, 1);

        assert.equal(wrapper.find(Card.Header).length, 1);
        assert.equal(wrapper.find(Card.Header).children().text(), defaultProps.collection.title);

        assert.equal(wrapper.find(Image).length, 1);
        assert.equal(wrapper.find(Label).length, 0);
    });

    it("renders `Label` for tags when they are present", () => {
        props = {
            collection: {
                title: "Title Collection",
                tags: [
                    {title: "Tag 1"},
                    {title: "Tag 2"},
                    {title: "Tag 3"},
                    {title: "Tag 4"}
                ],
                published_at: "2016-03-02T13:32:54-05:00",
                description: "Dummy description",
                id: "e2933JEFWINJwnjejoiOIENWGEGWEnewioiooi",
                cover_photo: {
                    urls : {
                        regular: "https://www.lifewire.com/thmb/GGQdFhKxulx9XEdR5c1OD4Gw7Y8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg"
                    }
                }
            },
            url: "https://www.lifewire.com/thmb/GGQdFhKxulx9XEdR5c1OD4Gw7Y8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg"    
        };

        wrapper = renderCollection(props);

        assert.equal(wrapper.find(Label).length, 4);
    });
});