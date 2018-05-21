export function uniqueElements(value, index, self) {
  return self.indexOf(value) === index;
}

export function getUsedTags(notes) {
  return notes
    .map(note => note.tag)
    .filter(tag => tag)
    .filter(uniqueElements);
}

export function getTagList(notes) {
  const tags = notes.map(note => note.tag);

  return ['Work', 'Personal', ...tags]
    .filter(tag => tag)
    .filter(uniqueElements);
}
