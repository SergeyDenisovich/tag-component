export class View {
  constructor() {
    this.app = this.getElement('#app');

    this.form = this.createElement('form');

    this.input = this.createElement('input', 'input-elem');
    this.input.type = 'text';
    this.input.placeholder = 'Enter text to add tag';

    this.addTagBtn = this.createElement('button', 'added-btn');
    this.addTagBtn.textContent = 'Add tag';

    this.wrappedElem = this.createElement('p', 'wrapped-elem');

    this.checkbox = this.createElement('input');
    this.checkbox.type = 'checkbox';

    this.modeNotificationText = this.createElement('span');
    this.modeNotificationText.textContent = 'Enable non-editing mode';

    this.tagsList = this.createElement('ul', 'tags-list');

    this.form.append(this.input, this.addTagBtn);
    this.wrappedElem.append(this.checkbox, this.modeNotificationText);
    this.app.append(this.form, this.wrappedElem, this.tagsList);
  }

  createElement(tag, className) {
    const elem = document.createElement(tag);
    if (className) {
      elem.classList.add(className);
    }
    return elem;
  }

  getElement(selector) {
    const elem = document.querySelector(selector);
    return elem;
  }

  get _tagsValue() {
    return this.input.value;
  }

  _resetInputValue() {
    this.input.value = '';
  }

  renderTags(tags) {
    while (this.tagsList.firstChild) {
      this.tagsList.firstChild.remove();
    }

    if (!tags.length) {
      return;
    }

    tags.forEach((tag) => {
      const li = this.createElement('li', 'list-item');
      li.setAttribute('id', `${tag.id}`);

      const span = this.createElement('span');
      span.textContent = tag.text;

      const deleteBtn = this.createElement('button', 'delete-btn');
      deleteBtn.innerHTML = '&times;';

      li.append(span, deleteBtn);
      this.tagsList.append(li);
    });
  }

  bindAddTag(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this._tagsValue) {
        handler(this._tagsValue);
        this._resetInputValue();
      }
    });
  }

  bindDeleteTag(handler) {
    this.tagsList.addEventListener('click', (e) => {
      if (e.target.className == 'delete-btn') {
        const id = e.target.parentElement.id;
        handler(+id);
      }
    });
  }

  // change mode
  _changeMode(mode) {
    const delBtnsArr = Array.from(document.querySelectorAll('.delete-btn'));
    if (mode === 'check') {
      delBtnsArr.forEach((btn) => btn.setAttribute('disabled', true));
    }
    if (mode === 'unckeck') {
      delBtnsArr.forEach((btn) => btn.removeAttribute('disabled'));
    }
  }

  _bindChangeMode() {
    this.checkbox.addEventListener('change', (e) => {
      if (this.checkbox.checked) {
        this.input.setAttribute('disabled', true);
        this.addTagBtn.setAttribute('disabled', true);
        this.modeNotificationText.textContent = 'Disable non-editing mode';
        this._changeMode('check');
      } else {
        this.input.removeAttribute('disabled');
        this.addTagBtn.removeAttribute('disabled');
        this.modeNotificationText.textContent = 'Enable non-editing mode';
        this._changeMode('unckeck');
      }
    });
  }
}
