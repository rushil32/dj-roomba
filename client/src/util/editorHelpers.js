import { convertToRaw } from 'draft-js';

export function getRawState(editorState) {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
}

export function editorHasText(editorState) {
  const contentState = editorState.getCurrentContent();
  return contentState.hasText();
}
