# async-aggregator

[![Travis branch](https://img.shields.io/travis/nomocas/async-aggregator/master.svg)](https://travis-ci.org/nomocas/async-aggregator)
[![bitHound Overall Score](https://www.bithound.io/github/nomocas/async-aggregator/badges/score.svg)](https://www.bithound.io/github/nomocas/async-aggregator)
[![npm-downloads](https://img.shields.io/npm/dm/async-aggregator.svg)]()
[![dependecies](https://img.shields.io/david/nomocas/async-aggregator.svg)]()
[![bitHound Dev Dependencies](https://www.bithound.io/github/nomocas/async-aggregator/badges/devDependencies.svg)](https://www.bithound.io/github/nomocas/async-aggregator/master/dependencies/npm)
[![npm](https://img.shields.io/npm/v/async-aggregator.svg)]()
[![licence](https://img.shields.io/npm/l/async-aggregator.svg)](https://spdx.org/licenses/MIT)

Asynchroneous "events" aggregator (e.g. promise and setTimeout calls).

Useful to centralised things to wait for...

## Usage

```javascript
import AsyncAggregator from 'async-aggregator';

const aa = new AsyncAggregator();

const p = Promise.resolve(true);

aa.waiting(p);

aa.delay(callback, ms, ...args); // call callback in x ms with ...args 

...

aa.whenStabilised().then((s) => { ... }).catch((e) => { ... })
```


Parent forwarding : 
```javascript
import AsyncAggregator from 'async-aggregator';

const parent = new AsyncAggregator();
const child = new AsyncAggregator(parent);

const p = Promise.resolve(true);

child.waiting(p);

child.delay(callback, ms, ...args); // call callback in x ms with ...args 

...

parent.whenStabilised().then((s) => { ... }).catch((e) => { ... })
```



## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright 2017 (c) Gilles Coomans

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
