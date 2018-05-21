import React from 'react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

import GoogleLogin from './GoogleLogin';
import tagColors from '../../util/tagColors';

class Nav extends React.Component {
  static propTypes = {
    userData: PropTypes.object,
    usedFilters: PropTypes.array
  }

  static defaultProps = {
    userData: {},
    usedFilters: []
  }

  NavItem = (icon, tooltip, modalName) => (
    <li className="nav-item">
      <div data-toggle="modal" data-target={`#${modalName}`}>
        <span 
          className="nav-link"
          data-toggle="tooltip"
          data-placement="bottom"
          title={tooltip}
        >
          <MaterialIcon icon={icon} />
        </span>
      </div>
    </li>
  )

  UserImage = () => (
    <li className="nav-item">
      <img alt="User" src={this.props.userData.image} />
    </li>
  )
  
  NewNoteButton = () => (
    <li>
      <button className="btn btn-block btn-primary" onClick={() => this.props.setActiveNote(-1)}>
        <i className="material-icons">create</i>
      </button>
    </li>
  )

  TagList = (allTags=[], usedTags=[]) => {
    return usedTags.map(tag => {
      const color = tagColors[allTags.indexOf(tag)];
      
      return (
        <li 
          onClick={() => this.props.toggleFilter(tag)}
          className={this.props.usedFilters.indexOf(tag) > -1 ? 'active' : ''}
        >
          <span style={{backgroundColor: color}} />
        </li>
      ) 
    })
  }

  render() {
    const { userData, allTags, usedTags } = this.props;

    return (
      <div className="navbar">
        <ul className="navbar-nav">
          { this.NewNoteButton() }
          { this.UserImage() }
          { this.NavItem('share', 'Share note', 'shareModal') }
          { this.NavItem('delete', 'Delete note', 'deleteModal') }
        </ul>
        <ul className="navbar-tags">
          { this.TagList(allTags, usedTags) }
        </ul>
      </div>
    );
  }
}

export default Nav;