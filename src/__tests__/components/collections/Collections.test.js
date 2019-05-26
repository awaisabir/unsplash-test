import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import { assert } from "chai";

import Collections, { CollectionsContainer } from "../../../components/collections/Collections";
import Collection from "../../../components/collections/Collection";

describe("Collections", function() {
    let sandbox;
    let wrapper;
    let props;

    const defaultProps = {
        collections: [{
            id: "e2933JEFWINJwnjejoiOIENWGEGWEnewioiooi",
            cover_photo: {
                urls : {
                    regular: "https://www.lifewire.com/thmb/GGQdFhKxulx9XEdR5c1OD4Gw7Y8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg"
                }
            }
        }]
    };

    const renderCollections = (props) => shallow(
        <Collections {...props} />
    );

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("renders a `CollectionsContainer", () => {
        wrapper = renderCollections(defaultProps);

        assert.equal(wrapper.find(CollectionsContainer).length, 1);
    });

    it("passes the regular url to `Collection`", () => {
        wrapper = renderCollections(defaultProps);

        assert.equal(wrapper.find(Collection).length, 1);
        assert.equal(wrapper.find(Collection).props().url, defaultProps.collections[0].cover_photo.urls.regular);
    });

    it("passes the placeholder url to `Collection`", () => {
        props = {
            collections: [{
                id: "e2933JEFWINJwnjejoiOIENWGEGWEnewioiooi"
            }]
        };
        wrapper = renderCollections(props);

        assert.equal(wrapper.find(Collection).length, 1);
        assert.equal(wrapper.find(Collection).props().url, "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image");
    });
});