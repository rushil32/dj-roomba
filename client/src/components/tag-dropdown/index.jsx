import React from 'react';
import TagInput from './TagInput';
import tagColors from '../../util/tagColors';


function TagDropdown({ handleClick, active = '', tags }) {
  function itemClasses(value) {
    const classes = 'dropdown-item color-item';
    return value === active ? `${classes} active` : classes;
  }

  function dropdownItem(value, color) {
    return (
      <button className={itemClasses(value)} type="button" onClick={() => handleClick(value)}>
        <div
          className="color-item__icon"
          style={{ backgroundColor: color }}
        />
        <span>{value || 'No Tag'}</span>
      </button>
    );
  }

  function dropdown() {
    return (
      <div>
        { dropdownItem('', '#e5e5e5') }
        {tags.map((tag, i) => dropdownItem(tag, tagColors[i]))}
      </div>
    );
  }

  return (
    <div className="dropdown toolbar__dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        { active || 'Tag' }
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu">
        <TagInput handleInput={handleClick} />
        { dropdown() }
      </div>
    </div>
  );
}

export default TagDropdown;
