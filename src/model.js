export class Model {
  constructor() {
    this.tags = JSON.parse(localStorage.getItem('tags')) || [];
  }

  bindTagsListChanged(cb) {
    this.onTagsListChanged = cb;
  }

  addTag(inputData) {
    if (inputData === '') {
      return;
    }

    let tagsArr = inputData.replace(/\s/g, ',').split(',');
    let idx = this.tags.length > 0 ? this.tags.length + 1 : 1;

    tagsArr.forEach((tag) => {
      if (tag !== '') {
        const newTag = { id: idx++, text: tag };
        this.tags.push(newTag);
      }
    });

    this._commit(this.tags);
  }

  deleteTag(id) {
    this.tags = this.tags.filter((tag) => tag.id !== id);
    this._commit(this.tags);
  }

  // --- receive all tags
  get _getAllTags() {
    return this.tags;
  }

  // --- set new tag list
  set _setTags(newTagsList) {
    this.tags = [];
    localStorage.clear();
    this.addTag(newTagsList);
  }

  _commit(tags) {
    this.onTagsListChanged(tags);
    localStorage.setItem('tags', JSON.stringify(this.tags));
  }
}
