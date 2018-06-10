import React from 'react';
import PropTypes from 'prop-types';

function BannerCta({ header, subheader, cta, handleClick }) {
  return (
    <div className="banner-cta animated fadeIn">
      <h2>{header}</h2>
      <p>{subheader}</p>
      <button className="btn btn-primary" onClick={handleClick}>{cta}</button>
    </div>
  );
}

BannerCta.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  handleClick: PropTypes.func,
  cta: PropTypes.string,
};

BannerCta.defaultProps = {
  header: '',
  subheader: '',
  handleClick: () => {},
  cta: '',
};

export default BannerCta;
