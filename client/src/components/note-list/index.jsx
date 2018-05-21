import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tagColors from '../../util/tagColors';

class Sidebar extends Component {
  parseNoteText = (content) => {
    if (!content) return '';

    const noteContent = JSON.parse(content);
    return noteContent.blocks[0].text;
  }
  
  isActiveNote = (id) => id === this.props.activeNote;

  noteItem = (note, index, parse = true) => {
    const createdOn = new Date(note.createdOn);
    const tagColor = tagColors[this.props.tags.indexOf(note.tag)];

    return (
      <li key={note._id} className={ index === this.props.activeNote ? 'active' : ''}>
        <div onClick={() => this.props.getNote(index)}>
          <div className="note-list__item__header">
            <h3>{ note.title }</h3>
            { note.tag && (<span style={{ backgroundColor: tagColor }} />) }
          </div>
          <p>{ parse ? this.parseNoteText(note.text) : note.text }</p>
          <p className="timestamp">{ createdOn.toDateString() }</p>
        </div>
      </li>
    )
  }

  noteList = (notes) => notes.map((note, index) => this.noteItem(note, index));

  render() {
    const { notes } = this.props;
    const today = new Date();
    
    return (
      <div className="note-list">
        <ul>
          { notes.length > 0 && (this.noteList(notes)) }
          { (notes.length === 0) && (this.noteItem({
              title: 'New note',
              text: 'Your first note',
              createdOn: today,
          }, -1, false))}
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  notes: PropTypes.array,
  activeNote: PropTypes.number,
  selectNote: PropTypes.func,
  tags: PropTypes.array
}

Sidebar.defaultProps = {
  notes: [],
  tags: [],
  activeNote: -1,
}

export default Sidebar;
