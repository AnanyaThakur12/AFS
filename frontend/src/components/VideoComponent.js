import React from 'react';
import videoSource from "./video/bandicam.mp4"; 

function VideoComponent() {
  return (
    <div>
      <h1>My video </h1>
      <video width="640" height="360" controls>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoComponent;
