export class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.model.bindTagsListChanged(this.onTagsListChanged);

    this.onTagsListChanged(this.model.tags);
    this.view.bindAddTag(this.handleAddTag);
    this.view.bindDeleteTag(this.handleDeleteTag);
  }

  onTagsListChanged = (tags) => {
    this.view.renderTags(tags);
  };

  handleAddTag = (inputData) => {
    this.model.addTag(inputData);
  };

  handleDeleteTag = (id) => {
    this.model.deleteTag(id);
  };
}
