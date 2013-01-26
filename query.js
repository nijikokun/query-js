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
(function (name, definition, context) {
  if (typeof context['module'] !== 'undefined' && context['module']['exports']) context['module']['exports'] = definition()
  else if (typeof context['define'] !== 'undefined' && context['define'] === 'function' && context['define']['amd']) define(name, definition)
  else context[name] = definition()
})('query', function () {
  var $self = {};
  $self.store = {};
  $self.decodeStore = {};
  $self.built = false;
  $self.queryString = undefined;
  $self.re = /([^&=]+)=?([^&]*)/g;
  $self.m = null;

  $self.getQueryString = function () {
    var search = window.location.search.substring(1);
    var hash = window.location.hash.split("?"); hash.shift();
    return (search && search !== "") ? search : (hash.length > 0) ? hash.join("?") : undefined;
  }

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
      $self.queryString = typeof opts.query === 'string' ? opts.query : $self.getQueryString();

      if (typeof $self.queryString === 'string' && $self.queryString.length > 0) {
        var index, aname, pname, $key, $value, $decodeKey, $decodeValue;
        
        if ($self.queryString[0] === "?") 
          $self.queryString = $self.queryString.substring(1);

        $self.store = {};
        $self.decodeStore = {};

        while ($self.m = $self.re.exec($self.queryString)) {
          $key = $self.m[1]; $value = $self.m[2];
          $decodeKey = $self.decode($key); $decodeValue = $self.decode($value);

          if ($self.m[1].indexOf("[") === -1)
            if (!($decodeKey in $self.store))
              $self.store[$decodeKey] = $decodeValue;
            else if (typeof $self.store[$decodeKey] !== 'object')
              $self.store[$decodeKey] = [ $self.store[$decodeKey], $decodeValue ];
            else
              Array.prototype.push.call($self.store[$decodeKey], $decodeValue);
          else {
            index = $key.indexOf("[");
            aname = $self.decode($key.slice(index + 1, $key.indexOf("]", index)));
            pname = $self.decode($key.slice(0, index));

            if (typeof $self.store[pname] !== "object") {
              $self.store[pname] = {};
              $self.store[pname].length = 0;
            }

            if (aname) $self.store[pname][aname] = $decodeValue;
            else Array.prototype.push.call($self.store[pname], $decodeValue);
          }
        }
      } else return undefined;

      $self.built = true;
    }

    return opts.name ? ((opts.name in $self.store) ? $self.store[opts.name] : undefined) : $self.store;
  };

  return $self;
}, this);
