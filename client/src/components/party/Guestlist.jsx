import React from 'react';
import PropTypes from 'prop-types';

function Guestlist({ guests = [] }) {
  const guestBlock = guest => (
    <li>
      <img src={guest.image} alt={guest.name} />
      <p>{guest.name}</p>
    </li>
  );

  return (
    <div className="guestlist">
      <ul>
        {guests.map(guest => guestBlock(guest))};
      </ul>
    </div>
  );
}

Guestlist.propTypes = {
  guests: PropTypes.array,
};

export default Guestlist;
