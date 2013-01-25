// Query.js
//
// Iterates through a given, or current query string and 
// caches the results from both the parser and the decoder.
//
// Examples:
//
//     // Build the current query string, returns entire object.
//     query.build();
//
//     // Build and fetch specific name
//     // assumes query.build was never ran.
//     query.get('param');
//     query.get('anotherParam'); // This will be cached result.
//
//     // After it has been ran and you wish to rebuild?
//     query.build({ rebuild: true });
//     query.get('param', true);
//
//     // Custom Query String?
//     query.build({ rebuild: true, query: 'param=not+again&timestamp=250826092386' });
//     query.get('param');
//
//     // Return param, with build, and custom query all in one go?
//     query.build({ name: 'param', rebuild: true, query: 'param=not+again&timestamp=250826092386' });
//
// @author Nijiko Yonskai
// @copyright 2013 Nijiko Yonskai
var query = (function () {
  var $self = {};
  $self.store = {};
  $self.decodeStore = {};
  $self.built = false;
  $self.queryString = window.location.search.substring(1);
  $self.re = /([^&=]+)=([^&]*)/g;
  $self.m = null;

  $self.decode = function (str) {
    if (!$self.decodeStore[str])
      $self.decodeStore[str] = decodeURIComponent(str.replace(/\+/g, ' '));

    return $self.decodeStore[str];
  };

  $self.get = function (name, rebuild) {
    name = String(name).replace(/[.*+?|()\[\]{}\\]/g, '\\$&');
    return $self.build({ name: name, rebuild: rebuild });
  };

  $self.build = function (opts) {
    if (!$self.built || opts.rebuild) {
      var index, aname, pname;

      $self.store = {};
      $self.decodeStore = {};
      $self.queryString = typeof opts.query === 'string' ? opts.query : window.location.search.substring(1);

      while ($self.m = $self.re.exec($self.queryString)) {
        if ($self.m[1].indexOf("[") == "-1")
          $self.store[$self.decode($self.m[1])] = $self.decode($self.m[2]);
        else {
          index = $self.m[1].indexOf("[");
          aname = $self.m[1].slice(index + 1, $self.m[1].indexOf("]", index));
          pname = $self.decode($self.m[1].slice(0, index));

          if (typeof $self.store[pname] !== "object") {
            $self.store[$self.decode(pname)] = {};
            $self.store[$self.decode(pname)].length = 0;
          }

          if (aname)
            $self.store[$self.decode(pname)][$self.decode(aname)] = $self.decode($self.m[2]);
          else
            Array.prototype.push.call($self.store[$self.decode(pname)], $self.decode($self.m[2]));
        }
      }

      $self.built = true;
    }

    return opts.name ? ((opts.name in $self.store) ? $self.store[opts.name] : undefined) : $self.store;
  };

  return $self;
})();
