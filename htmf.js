export class HTMF {
  constructor() {
    this.elements = [];
    this.currentElement = null;
    this.templates = {};
  }

  element(tag, innerText = "") {
    const el = {
      tag,
      children: [],
      attributes: {},
      innerText,
      events: [],
      isTemplate: false,
      templateCallback: null,
    };
    if (this.currentElement) {
      this.currentElement.children.push(el);
    } else {
      this.elements.push(el);
    }
    this.currentElement = el;
    return this;
  }

  h1(innerText = "") {
    return this.element("h1", innerText);
  }

  div(innerText = "") {
    if (typeof innerText === "function") {
      const currentElement = this.currentElement;
      currentElement.templateCallback = innerText;
      currentElement.isTemplate = true;
    } else {
      this.element("div", innerText);
    }
    return this;
  }

  css(classes) {
    const currentElement = this.currentElement;
    currentElement.attributes["class"] = classes;
    return this;
  }

  id(id) {
    const currentElement = this.currentElement;
    currentElement.attributes["id"] = id;
    return this;
  }

  text(innerText) {
    const currentElement = this.currentElement;
    currentElement.innerText = innerText;
    return this;
  }

  get(url) {
    const currentElement = this.currentElement;
    currentElement.events.push(
      `onclick="fetch('${url}').then(response => response.json()).then(data => this.updateTemplate('${currentElement.attributes.hyTargetId}', data))"`
    );
    return this;
  }

  updateTemplate(templateId, data) {
    const templateElement = document.getElementById(templateId);
    const template = this.templates[templateId];
    const result = data.map((item) => template(item)).join("");
    templateElement.innerHTML = result;
  }

  target(templateId) {
    const currentElement = this.currentElement;
    currentElement.attributes["hyTargetId"] = templateId;
    return this;
  }

  template(templateId) {
    const currentElement = this.element("template").id(templateId);
    currentElement.attributes["id"] = templateId;
    currentElement.isTemplate = true;
    return this;
  }

  _end() {
    const parent = this.findParent(this.currentElement);
    if (parent) {
      this.currentElement = parent;
    } else {
      this.currentElement = null;
    }
    return this;
  }

  _close() {
    this.currentElement = null;
    return this;
  }

  findParent(child) {
    const findInTree = (element, target) => {
      for (const el of element.children) {
        if (el === target) {
          return element;
        } else {
          const found = findInTree(el, target);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    for (const el of this.elements) {
      const parent = findInTree(el, child);
      if (parent) {
        return parent;
      }
    }
    return null;
  }

  _h1() {
    return this._end();
  }

  _div() {
    return this._end();
  }

  render() {
    return this.elements.map((el) => this.renderElement(el)).join("");
  }

  renderElement(element) {
    const {
      tag,
      attributes,
      children,
      innerText,
      events,
      isTemplate,
      templateCallback,
    } = element;

    const attrString = Object.keys(attributes)
      .map((key) => `${key}="${attributes[key]}"`)
      .join(" ");

    const eventString = events.join(" ");

    const openTag = `<${tag}${attrString ? " " + attrString : ""}${
      eventString ? " " + eventString : ""
    }>`;

    const closeTag = `</${tag}>`;

    let childrenString = "";
    if (isTemplate && templateCallback) {
      this.templates[attributes.id] = templateCallback;
    } else {
      childrenString = children
        .map((child) => this.renderElement(child))
        .join("");
    }

    return `${openTag}${innerText}${childrenString}${closeTag}`;
  }
}
