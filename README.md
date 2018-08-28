# ecs

**Work in progress, not published yet.**

> Entity Component System

[![Travis](https://img.shields.io/travis/gakimball/ecs.svg?maxAge=2592000)](https://travis-ci.org/gakimball/ecs) [![npm](https://img.shields.io/npm/v/ecs.svg?maxAge=2592000)](https://www.npmjs.com/package/ecs)

## Installation

```bash
npm install ecs
```

## Usage

Create a new ECS:

```js
const System = require('ecs');

const sys = new System();
```

Create components:

```js
function Living() {
  this.health = 5;
}

function Location() {
  this.x = 0;
  this.y = 0;
}
```

Create entity templates:

```js
const Player = [
  [Living, {
    health: 100,
  }],
  Location,
];

const Gremlin = [
  Living,
  Location,
];
```

Create entities:

```js
const player = sys.create(Player);
const gremlin = sys.create(Gremlin, [[Location, { x: 5, y: 5 }]]);
```

Query entities:

```js
const player = sys.getSingle(Player);
const alive = sys.get(Living);
const existing = sys.get(Living, Gremlin);
```

Inspect entities:

```js
const player = sys.getSingle(Player);
player.has(Living); // => true
player.has(Living, Evil); // => false
player.get(Living).health;
```

Modify entities:

```js
function OnFire() {};

const player = sys.getSingle(Player);
player.add(OnFire);
player.remove(OnFire);
```

Destroy entities:

```js
const player = sys.getSingle(Player);
sys.destroy(player);
```

## API

## Local Development

```bash
git clone https://github.com/gakimball/ecs
cd ecs
npm install
npm test
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
