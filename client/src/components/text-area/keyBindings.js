import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

export default function customKeyBinding(e) {
  const { hasCommandModifier } = KeyBindingUtil;

  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'myeditor-save';
  }

  if (e.keyCode === 9 /* TAB */) {
    return 'tab-space';
  }

  return getDefaultKeyBinding(e);
}
