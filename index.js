const intersection = require('lodash.intersection');

class Entity {
  constructor(manager) {
    this.manager = manager;
    this.components = new Map();
  }

  set(Component, props) {
    const component = new Component();
    Object.assign(component, props);
    this.components.set(Component, component);
    this.manager.addToCache(Component, this);
  }

  unset(component) {
    this.components.delete(component);
    this.manager.removeFromCache(component.constructor, this);
  }

  get(component) {
    this.components.get(component);
  }

  has(...components) {
    for (const component of components) {
      if (!this.components.has(component)) {
        return false;
      }
    }

    return true;
  }
}

module.exports = class System {
  constructor() {
    this.entities = new Set();
    this.caches = new Map();
  }

  create(template = []) {
    const entity = new Entity(this);

    template.forEach(value => {
      let component;
      const props = {};

      if (typeof value === 'function') {
        component = value;
      } else if (Array.isArray(value)) {
        component = value[0];
        Object.assign(props, value[1]);
      } else {
        throw new TypeError('Expected components passed to create() to be either a function, or an array with a function and an object.');
      }

      entity.set(component, props);
    });

    this.entities.add(entity);
  }

  destroy(entity) {
    this.entities.destroy(entity);
  }

  get(...components) {
    const results = components.map(component => [...this.caches.get(component)]);

    return intersection(results);
  }

  getSingle(...components) {
    return this.get(...components)[0];
  }

  addToCache(component, entity) {

  }

  removeFromCache(component, entity) {

  }
};
