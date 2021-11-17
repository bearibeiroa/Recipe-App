import React from 'react';
import PropTypes from 'prop-types';

function VideoCard({ data: { strYoutube } }) {
  function embedVideo() {
    if (strYoutube) {
      const embedString = strYoutube.split('=')[1];
      return `https://www.youtube.com/embed/${embedString}`;
    }
  }

  return (
    <section>
      <h5>Video</h5>
      <iframe
        data-testid="video"
        width="420"
        height="315"
        src={ embedVideo() }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </section>
  );
}

VideoCard.propTypes = {
  data: PropTypes.shape({
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCard;
