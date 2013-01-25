# Query.js

 Iterates through a given, or current query string and 
 caches the results from both the parser and the decoder.
 
## Features:

1. Caching on both decoding and parameters
2. Supports passing custom queries
2. Supports Array / Object Parameters `user[]="jim"&user[]="bob"`
3. Supports empty management `&&`
4. Supports declaration paramaters `name&hello="world"`
5. Clean and readable source

## Examples:

### Building

`query.build` *Builds parameter storage cache, ability to take custom parameters, name, and rebuild storage*
- **param** `Object` **opts** *Optional options object*
  - **option** `Boolean` **rebuild** *Forces parser to rebuild storage and decode cache objects*
  - **option** `String` **query** *Custom query string*
  - **option** `String` **name** *Parameter to look for in storage cache*
- **return** *if **name** option is missing, it will return entire storage object*

```javascript
  query.build();
```

### Fetching Parameter

`query.get` *Fetch parameter from cache, or build current page query string and return parameter*
- `param` `String` **name** *Paramater to look for in storage cache*
- `param` `Boolean` **rebuild** *Tells builder to force rebuilding storage and decode cache objects*

```javascript
  // Build and fetch specific name assumes query.build was never ran.
  query.get('param');
  query.get('anotherParam'); // This will be cached result.
```

### Rebuilding

  Maybe you've already built and wish to rebuild, you can do this two different ways:

```javascript
  // First is through the builder
  query.build({ rebuild: true });
  
  // Second is through the sugar `get` method
  query.get('param', true);
```

### Custom Query String

  Maybe you wish to parse a custom query string, to do this use `query.build`:

```javascript
  query.build({ rebuild: true, query: 'param=not+again&timestamp=250826092386' });
  query.get('param');
```

### All in one

  Returns parameter requested, rebuilds, and has a custom query in one call.

```javascript
  query.build({ name: 'param', rebuild: true, query: 'param=not+again&timestamp=250826092386' });
```

# Copyright & License

  **The MIT License (MIT)**

    Copyright (c) <2013> <Nijiko Yonskai>

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
