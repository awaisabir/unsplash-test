import Unsplash from "unsplash-js";
import config from "../../config/Unsplash";

class UnsplashSingleton {
    constructor() {
        if (!UnsplashSingleton.instance) {
            this._unsplash = new Unsplash({
                applicationId: config.ACCESS_KEY,
                secret: config.SECRET_KEY
            });
        }

        UnsplashSingleton.instance = this;
    }

    getPhotos = async (page, perPage = 20, orderBy = "latest") => {
        const response = await this._unsplash.photos.listPhotos(page, perPage, orderBy);
        const photos = await response.json();

        return photos;
    };

    getPhotoById = async (id) => {
        const response = await this._unsplash.photos.getPhoto(id);
        const photo = await response.json();

        return photo;
    };
    
    getPhotosByTerm = async (term, page = 1, per_page = 20) => {
        const response = await this._unsplash.search.photos(term, page, per_page);
        const photos = await response.json();

        return photos;
    };

    getCollections = async (page, perPage = 20, orderBy = "latest") => {
        const response = await this._unsplash.collections.listCollections(page, perPage, orderBy);
        const collections = await response.json();

        return collections;
    };

    getCollectionById = async (id) => {
        const response = await this._unsplash.collections.getCollection(id);
        const collection = await response.json();

        return collection;
    };

    getCollectionsByTerm = async (term, page = 1, per_page = 20) => {
        const response = await this._unsplash.search.collections(term, page, per_page);
        const collections = await response.json();

        return collections;
    };
};

const instance = new UnsplashSingleton();

export default instance;