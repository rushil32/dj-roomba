import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextArea from '../text-area';
import NoteList from '../note-list';
import Nav from '../nav';
import ShareModal from './ShareModal';
import DeleteModal from './DeleteModal';

import * as noteUtil from '../../util/noteHelpers';
import { getTagList, getUsedTags } from '../../util/generalHelpers';
import { getRawState, editorHasText } from '../../util/editorHelpers';

class Editor extends Component {
  state = {
    notes: [],
    activeNote: -1,
    filters: []
  }

  static propTypes = {
    userData: PropTypes.object,
    setUserData: PropTypes.func
  }

  static defaultProps = {
    userData: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.userData.notes) return prevState;
    
    let notes = nextProps.userData.notes;
    let activeNote = -1;

    if (notes.length) activeNote = 0;
    
    return {
      activeNote,
      notes
    }
  }

  setActiveNote = (index) => this.setState({ activeNote: index });

  setNoteValue = (index, key, value) => {
    const { notes } = this.state;
    notes[index][key] = value;
    this.setState({ notes });
  }

  setTag = (tag) => {
    const { notes, activeNote } = this.state;
    const noteId = notes[activeNote]._id;
    
    noteUtil.setTag(noteId, tag)
      .then(res => {
        notes[activeNote] = res;
        this.setState({ notes });
      });
  }

  getNote = (index) => {
    const { notes } = this.state;
    const noteId = notes[index]._id;

    noteUtil.getNote(noteId)
      .then(res => {
        notes[index] = res;

        this.setState({
          activeNote: index,
          notes
        })
      });
  }

  deleteNote = () => {
    const { notes, activeNote } = this.state;
    
    noteUtil
      .deleteNote(notes[activeNote]._id)
      .then(res => this.setState({ notes: res }));
  }

  createNote = (note) => {
    this.setState(prevState => { notes: prevState.notes.unshift(note) });
    this.setState({ activeNote: 0 });

    noteUtil
      .createNote(note)
      .then(res => this.setNoteValue(0, '_id', res._id));
  }

  updateNote = (updates) => {
    const { notes, activeNote } = this.state;
    const noteUpdate = notes[activeNote] || {};

    for (let field in updates) {
      noteUpdate[field] = updates[field];
    }

    if (activeNote !== -1) {
      noteUtil.updateNote(notes[activeNote]._id, noteUpdate);
    } else { 
      this.createNote(noteUpdate);
    }
  }

  filterNotes = (notes) => notes.filter(note => 
    this.state.filters.length === 0 || this.state.filters.indexOf(note.tag) > -1
  );

  toggleFilter = (tag) => {
    const { filters } = this.state;
    const newFilterList = filters.indexOf(tag) === -1 
      ? [...filters, tag] 
      : filters.filter(item => item !== tag); 

    this.setState({ filters: newFilterList });
  }
  
  render() {
    const { userData, setUserData } = this.props;
    const { notes, activeNote, filters } = this.state;
    const tags = getTagList(notes);

    return (
      <div className="editor">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-lg-3">
              <div className="sidebar animated slideInLeft">
                <Nav 
                  userData={userData}
                  setActiveNote={this.setActiveNote}
                  setUserData={setUserData}
                  allTags={tags}
                  usedTags={getUsedTags(notes)}
                  usedFilters={filters}
                  toggleFilter={this.toggleFilter}
                />
                <NoteList
                  notes={this.filterNotes(notes)}
                  activeNote={activeNote}
                  getNote={this.getNote}
                  setActiveNote={this.setActiveNote}
                  tags={tags}
                />
              </div>
            </div>
            <div className="col">
              <TextArea 
                note={notes[activeNote]} 
                updateNote={this.updateNote} 
                setTag={this.setTag} 
                tags={tags}
              />
            </div>
          </div>
        </div>
        <ShareModal updateNotes={this.props.updateNotes} />
        <DeleteModal handleClick={this.deleteNote} />
      </div>
    );
  }
}

export default Editor;
