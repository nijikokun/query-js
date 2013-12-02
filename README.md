# Query.js

 Small, compact, and efficient query string parser library that is packed with features and two layers of caching.
 
## Features:

1. Caching on both decoding and parameters
2. Supports hash query string `#hello?page=3`
3. Supports passing custom query strings
4. Supports Array / Object Parameters `user[]="jim"&user[]="bob"`
5. Supports empty management `&&`
6. Supports declaration parameters without values `name&hello="world"`
7. Supports repeated parameters `param=1&param=2`
8. Clean and readable source
9. Supports building queries using simple object notation.

## Examples:

### Building

`query.build`
- `data` `Object` Query Data in Object Notation.

To create the query `?name=Query.js&tags=query&tags=string&tags=encode&tags=builder` we invoke `query.build` like so:

```javascript
query.build({ name: 'Query.js', tags: [ 'query', 'string', 'encode', 'builder' ]});
```

### Parsing

`query.parse` *Parses current or given query string, building both the query and decoding cache objects.*
- `param` `Object` **opts** *Optional options object*
  - `option` `Boolean` **rebuild** *Forces parser to rebuild storage and decode cache objects*
  - `option` `String` **query** *Custom query string*
  - `option` `String` **name** *Parameter to look for in storage cache*
- `return` `Mixed` If **name** option exists returns `String` or `undefined`, otherwise returns `Object`, or `undefined`

```javascript
  query.parse();
```

  View example on jsfiddle: http://jsfiddle.net/xvd5d/3/

### Fetching Parameter

`query.get` *Sugar syntax for `query.parse` fetching of specific parameter*
- `param` `String` **name** *Paramater to look for in storage cache*
- `param` `Boolean` **rebuild** *Tells builder to force rebuilding storage and decode cache objects*

```javascript
  // Build and fetch specific name assumes query.build was never ran.
  query.get('param');
  query.get('anotherParam'); // This will be cached result.
```

  View example on jsfiddle: http://jsfiddle.net/xvd5d/4/

### Rebuilding

  Maybe you've already parsed a query and wish to parse a new query or rebuild the cache,
  you can do this two different ways:

```javascript
  // First is through the builder
  query.parse({ rebuild: true });
  
  // Second is through the sugar `get` method
  query.get('param', true);
```

  View example on jsfiddle: http://jsfiddle.net/VbM7M/2/

### Custom Query String

  Maybe you wish to parse a custom query string, to do this use `query.build`:

```javascript
  query.parse({ rebuild: true, query: 'param=not+again&timestamp=250826092386' });
  query.get('param');
```

### All in one

  Returns specific parameter requested, rebuilds current cache, and has a custom query in one call.

```javascript
  query.parse({ name: 'param', rebuild: true, query: 'param=not+again&timestamp=250826092386' });
```

  View example on jsfiddle: http://jsfiddle.net/VbM7M/3/

## License

  **The MIT License (MIT)**

  Copyright (c) 2013 Nijiko Yonskai <nijikokun@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
