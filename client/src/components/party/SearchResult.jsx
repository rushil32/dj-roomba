import React from 'react';

const searchResult = ({ isSelected, handleClick, trackData  }) => {
  return (
    <li 
      className={isSelected ? 'selected' : ''} 
      onClick={() => handleClick(trackData)}
    >
      <div>
        <h3>{trackData.name}</h3> 
        <p>{trackData.artist}</p>
      </div>
      { isSelected && (
        <div>
          <i class="material-icons">check_circle</i>
        </div>
      )}
    </li>
  );
};

export default searchResult;
