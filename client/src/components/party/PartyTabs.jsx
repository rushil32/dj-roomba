import React from 'react';

function PartyTabs({ handleClick, active }) {
  function getClass(value) {
    return active === value ? 'active' : '';
  }

  return (
    <ul className="tabs">
      <li className={getClass('playlist')} onClick={() => handleClick('playlist')}>
        Playlist
      </li>
      <li className={getClass('guestlist')} onClick={() => handleClick('guestlist')}>
        Guests
      </li>
    </ul>
  );
}

export default PartyTabs;
