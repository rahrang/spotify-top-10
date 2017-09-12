/***
 * Six Degrees of Spotify
 * This is the entry point of the app.
 * author: @rahrang
*/

import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import Home from './components/Home.jsx';

class App extends React.Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <Home />
      </div>
    );
  }
}

export default App;

const styles = StyleSheet.create({

  app: {
    fontSize: '100%',
    margin: '0',
    padding: '0',
    minHeight: '100vh',
    width: '100%',
  }

})
