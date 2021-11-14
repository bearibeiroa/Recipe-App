import React from 'react';
import PropTypes from 'prop-types';

function VideoCard({ data: { strYoutube } }) {
  return (
    <section>
      <h5>Video</h5>
      <iframe
        data-testid="video"
        width="420"
        height="315"
        src={ `${strYoutube}` }
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
