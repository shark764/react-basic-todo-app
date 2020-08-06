import React from 'react';

const Home = () => (
  <div className="App-main">
    <div className="App-list">
      <h1>Welcome to our APP</h1>
      <div style={{ maxWidth: 550, textAlign: 'justify' }}>
        <p>
          Contentful is a CMS tool to easily produce, manage and publish content on any website. Based on the cloud, it
          allows any user, whether they are developers or content publishers, to work together to make their tasks
          easier and more agile.
        </p>
      </div>

      <a href="https://www.contentful.com/" target="_blank" rel="noopener noreferrer">
        Visit Contentful
      </a>
    </div>
  </div>
);

export default Home;
