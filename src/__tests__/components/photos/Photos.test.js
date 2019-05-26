import React from "react";
import { shallow } from "enzyme";
import { assert } from "chai";
import sinon from "sinon";

import Photos, { MasonryBrick, MasonryLayout } from "../../../components/photos/Photos";

describe("PhotosList", function() {
    let sandbox;
    let wrapper;
    let props;

    const defaultProps = {
        photos: [
            {
                id: "eIEFWf9923r2fwejkf2h43ugirejdmlkfwemkjio4t39uhgernj",
            }
        ]
    };

    const renderPhotos = (props) => shallow(
        <Photos {...props} />
    );

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("renders `MasonryLayout`", () => {
        wrapper = renderPhotos(defaultProps);

        assert.equal(wrapper.find(MasonryLayout).length, 1);
    });

    it("renders `MasonryBrick`", () => {
        wrapper = renderPhotos(defaultProps);

        assert.equal(wrapper.find(MasonryBrick).length, 1);
    });

    describe("When results exist", () => {
        props = {
            photos: {
                results : [{id: "eIEFWf9923r2fwejkf2h43ugirejdmlkfwemkjio4t39uhgernj"}]
            }
        };

        wrapper = renderPhotos(props);
        assert.equal(wrapper.find(MasonryLayout).length, 1);
        assert.equal(wrapper.find(MasonryBrick).length, 1);
    })
});