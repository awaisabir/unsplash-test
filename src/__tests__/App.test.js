import React from 'react';
import sinon from "sinon";
import { mount } from "enzyme";
import { assert } from "chai";

import App, {
  SearchContainer,
  ErrorMessageContainer,
  LoadingContainer,
  PaginationContainer
} from '../components/App';
import Unsplash from "../components/helpers/Unsplash";

describe("App", function() {
  let wrapper;

  const renderApp = () => (
    mount(<App />)
  );

  describe("App", () => {
    beforeEach(() => {
      /* stubs */
      sinon.stub(Unsplash.prototype, "getPhotosByTerm").returns({
        results: [{
          links: {
            html: "https://google.com"
          },
          id: "1",
          title: "Photo Title",
          urls: {
            regular: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
          }
        }],
        total_pages: 350
      });

      sinon.stub(Unsplash.prototype, "getPhotos").returns([{
          links: {
            html: "https://google.com"
          },
          id: "2",
          title: "Photo Title",
          urls: {
            regular: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
          }
        }
      ]);

      sinon.stub(Unsplash.prototype, "getCollectionsByTerm").returns({
        results: [{
          links: {
            html: "https://google.com"
          },
          id: "3",
          cover_photo: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image",
          title: "Photo Title",
        }],
        total_pages: 500
      });
    
    });

    afterEach(() => {
      sinon.restore();
    })

    it("getsPhotosByTerm", async () => {
      wrapper = renderApp();
      await wrapper.instance().fetchPhotos("term", 1);

      wrapper.update();

      assert.equal(wrapper.instance().state.photos.length, 1);
      assert.equal(wrapper.instance().state.photos[0].id, 1);
    });

    it("getsPhotos", async () => {
      wrapper = renderApp();
      await wrapper.instance().fetchPhotos("", 1);

      wrapper.update();

      assert.equal(wrapper.instance().state.photos.length, 1);
      assert.equal(wrapper.instance().state.photos[0].id, 2);
    });

    it("gets photos on initial mount", async () => {
      wrapper = renderApp();
      await wrapper.update();

      assert.equal(wrapper.instance().state.photos.length, 1);
      assert.equal(wrapper.instance().state.photos[0].id, 2);
    });

    it("fetchesCollections", async () => {
      wrapper = renderApp();
      await wrapper.instance().fetchCollections("term", 1);

      assert.equal(wrapper.instance().state.collections.length, 1);
      assert.equal(wrapper.instance().state.collections[0].id, 3);
    });

    it("renders `SearchContainer`", () => {
      wrapper = renderApp();

      assert.equal(wrapper.find(SearchContainer).length, 1);
    });

    it("renders `LoadingContainer` when state is loading", () => {
      wrapper = renderApp();

      wrapper.setState({loading: false});
      wrapper.update();
      assert.equal(wrapper.find(LoadingContainer).length, 0);

      wrapper.setState({loading: true});
      wrapper.update();

      assert.equal(wrapper.find(LoadingContainer).length, 1);
    });

    it("renders `ErrorMessageContainer` when there is an error", () => {
      wrapper = renderApp();

      wrapper.setState({error: true, errorMessage: "test"});
      wrapper.update();

      assert.equal(wrapper.find(ErrorMessageContainer).length, 1);
      assert.equal(wrapper.find(ErrorMessageContainer).text(), "test");
    });

    it("renders `PaginationContainer`", () => {
      wrapper = renderApp();

      wrapper.setState({
        loading: false
      });
      wrapper.update();

      assert.equal(wrapper.find(PaginationContainer).length, 1);

      const pagination = wrapper.find(PaginationContainer);
    });
  });
});