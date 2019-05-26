import Unsplash from "unsplash-js";
import config from "../../config/Unsplash";

class UNSPLASH {
    constructor() {
        this._unsplash = new Unsplash({
            applicationId: config.ACCESS_KEY,
            secret: config.SECRET_KEY
        });
    }

    async getPhotos(page, perPage = 20, orderBy = "latest") {
        const response = await this._unsplash.photos.listPhotos(page, perPage, orderBy);
        const photos = await response.json();

        return photos;
    };

    async getPhotoById(id) {
        const response = await this._unsplash.photos.getPhoto(id);
        const photo = await response.json();

        return photo;
    };
    
    async getPhotosByTerm(term, page = 1, per_page = 20) {
        const response = await this._unsplash.search.photos(term, page, per_page);
        const photos = await response.json();

        return photos;
    };

    async getCollectionById(id) {
        const response = await this._unsplash.collections.getCollection(id);
        const collection = await response.json();

        return collection;
    };

    async getCollectionsByTerm(term, page = 1, per_page = 20) {
        const response = await this._unsplash.search.collections(term, page, per_page);
        const collections = await response.json();

        return collections;
    };
};

export default UNSPLASH;