import React from "react";
import { mount } from "enzyme";
import { assert } from "chai";
import sinon from "sinon";

import Photo from "../../../components/photos/Photo";
import { Image } from "semantic-ui-react";

describe("PhotosList", function() {
    let sandbox;
    let wrapper;

    const defaultProps = {
        photo: {
            title: "Photo Title",
            urls: {
                regular: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
            }
        }
    };

    const renderPhoto = (props) => mount(
        <Photo {...props} />
    );

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("renders `Photos` component", () => {
        wrapper = renderPhoto(defaultProps);

        assert.equal(wrapper.length, 1);
    });

    it("renders a Semantic UI `Image` component", () => {
        wrapper = renderPhoto(defaultProps);

        assert.equal(wrapper.find(Image).length, 1);
    });

    it("passes props properly to `Image` component", () => {
        wrapper = renderPhoto(defaultProps);
        const ImageComponent = wrapper.find(Image);

        assert.equal(ImageComponent.props().alt, defaultProps.photo.title);
        assert.equal(ImageComponent.props().src, defaultProps.photo.urls.regular);
    });
});