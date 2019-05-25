import React, { useEffect } from 'react';
import Unsplash from "./helpers/Unsplash";

function App() {
  useEffect(() => {
    // Unsplash.getPhotos(1, 10, "latest")
    //   .then((photos) => console.log(photos))
    //   .catch((err) => console.log(`err ${err}`));
  }, []);

  return (
    <React.Fragment>

    </React.Fragment>
  );
}

export default App;
