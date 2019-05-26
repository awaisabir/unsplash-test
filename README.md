# Unsplash Full-Script

Video: https://gfycat.com/spotlessglaringatlanticblackgoby-dog

My submission for the Full-Script Unsplash test

Please do let me know if there is stuff I can improve on with regards to code quality.

## Startup instructions:

- Please have your Unsplash Access and Secret Keys handy and copy paste them into `src/config/Unsplash.js`.

- Run:
```js
    npm install && npm run start
```

- The app will be live on `localhost:3000`.


## Tests:

- The test are in the `__tests__` folder in the `src/` directory.

- To execute the testing suite, run:
```js
    npm run test
```


*Notes*:

- Used **Enzyme** for unit-testing components, **Chai** as the assertion Library, **Jest** as the test-runner and **Sinon** for stubbing and spies.

- Used **Semantic-UI** as the UI Library.

- Decided not to create some type of component for a visualization for a single Photo, so that I could focus on re-factoring and writing better code; and also due to time constraints and prior commitments for the weekend. If there was a bit more time, I would probably use Suspense/Lazy for loading states, add more user data, have some sort of visualization for individual photos/collections with likes.

- Decided not to use hooks (although I used it in one component), because I wasn't really comfortable with testing a component that uses hooks via Enzyme.

- Decided not to use Redux/Context. Didn't seem like a big enough structure for me to use those technologies (would just add more bloat).

Created by [@awaisabir](https://github.com/awaisabir)