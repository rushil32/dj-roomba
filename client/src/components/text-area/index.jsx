import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import blockStyles from './blockStyles';
import keyBindings from './keyBindings';
import TagDropdown from '../tag-dropdown';
import HeaderInput from './HeaderInput';
import { getRawState, editorHasText } from '../../util/editorHelpers';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
import logo from '../../assets/origami-logo.svg';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.setDomEditorRef = ref => this.domEditor = ref;
  }

  static propTypes = {
    note: PropTypes.object,
    updateNote: PropTypes.func,
    tags: PropTypes.array
  }

  static defaultProps = {
    note: {},
    tags: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const editorState = EditorState.createEmpty();
    
    if (!nextProps.note.text) return { editorState };

    return {
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.note.text)))
    }
  }

  componentDidMount(){ this.focusEditor(); }

  focusEditor = () => { this.domEditor.focus(); }

  onChange = (editorState) => {
    this.setState({ editorState });

    if (editorHasText(editorState)) {
      this.props.updateNote({
        text: getRawState(editorState) 
      });
    }
  };

  onUnderlineClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));

  onBoldClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  
  onToggleCode = () => this.onChange(RichUtils.toggleCode(this.state.editorState));

  toolBar = () => (
    <div className="toolbar">
      <a className="toolbar__logo" href="/">
        <img src={logo} alt="Pigeon" />
      </a>
      <button onClick={this.onUnderlineClick}><u>U</u></button>
      <button onClick={this.onBoldClick.bind(this)}><b>B</b></button>
      <button onClick={this.onToggleCode}>&lt;&nbsp;&gt;</button>
      <TagDropdown handleClick={this.props.setTag} tags={this.props.tags} active={this.props.note.tag} />
    </div>
  )

  render() {
    const { updateNote, note } = this.props;

    return (
      <div className="text-area">
        <this.toolBar />
        <HeaderInput value={note.title} handleInput={updateNote} />
        <div className = "text-area__input" onClick={this.focusEditor}>
          <Editor
            editorState={this.state.editorState}
            keyBindingFn={keyBindings}
            onChange={this.onChange}
            blockStyleFn={blockStyles}
            ref={this.setDomEditorRef}
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
