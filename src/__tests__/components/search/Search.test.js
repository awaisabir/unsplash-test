import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import { assert } from "chai";

import Search from "../../../components/search/Search";
import { Select, Image, Button, Input } from "semantic-ui-react";

describe("Collections", function() {
    let sandbox;
    let wrapper;

    const defaultProps = {
        currentOption: "collections",
        onSearch: sinon.spy(),
        onSubmit: sinon.spy(),
        options: [
            { key: "photos", text: "Photos", value: "photos" },
            { key: "collections", text: "Collections", value: "collections" }
        ],
        error: false
    };

    const renderSearch = (props) => shallow(
        <Search {...props} />
    );

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Search", function() {
        it("renders the correct Semantic UI components", () => {
            wrapper = renderSearch(defaultProps);

            assert.equal(wrapper.find(Input).length, 1);
            assert.equal(wrapper.find(Select).length, 1);
            assert.equal(wrapper.find(Button).length, 1);
        });

        it("calls `onSearch` when value in `Input` is changed", () => {
            wrapper = renderSearch(defaultProps);

            wrapper.find(Input).simulate("change", {target: {value: "test"}});
            assert.equal(defaultProps.onSearch.callCount, 1);
        });

        it("changes options when `onChange` is called on `Select`", () => {
            wrapper = renderSearch(defaultProps);

            wrapper.find(Select).simulate("change", {target: {innerText: "Collections"}});
            wrapper.find(Button).simulate("click");
            assert.equal(defaultProps.onSubmit.args[0][0], "collections");
        });

        it("calls `onSubmit` when `Button` is clicked", () => {
            defaultProps.onSubmit = sinon.spy();
            wrapper = renderSearch(defaultProps);

            wrapper.find(Button).simulate("click");
            assert.equal(defaultProps.onSubmit.callCount, 1);
        });
    });
});