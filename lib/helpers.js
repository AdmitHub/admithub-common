/**
 * Return a sluggified version of the given name, suitable for use in a URL.
 * @param {string} name - The name to slugify.
 * @return {string} The name lowercased with spaces and un-URL-friendly chars removed.
 */
slugify = function(name) {
  return name.toLowerCase().replace(/[^-a-z0-9]+/g, "-").replace(/-*$/, "");
};

/**
 * Look up the value specified by the dotpath on the given object.
 * @param {Object} object - The object to look things up on.
 * @param {string} dotpath - A mongo-style dotted path (e.g. "prop1.subdoc.0.foo").
 * @return {*|undefined} The value at the given path, or ``undefined`` if not found.
 */
dotGet = function(object, dotpath) {
  var parts = dotpath.split(".");
  var obj = object;
  for (var i = 0; i < parts.length; i++) {
    if (/^\d+/.test(parts[i])) {
      obj = obj[parseInt(parts[i])];
    } else {
      obj = obj[parts[i]];
    }
    if (typeof obj === "undefined") {
      return undefined;
    }
  }
  return obj;
};
/**
 * Set the value given by the specified dotpath on the given object, creating
 * any intermediate objects or arrays as needed.
 * @param {Object} object - The object to set things on.
 * @param {String} dotpath - The path to set.
 * @param {*} value - The value to set.
 * @return {Object} The given object, modified in place.
 */
dotSet = function(object, dotpath, value) {
  // Given a mongo-style dotted path, set val to that path on obj.
  var parts = dotpath.split(".");
  var obj = object;
  for (var i = 0; i < parts.length - 1; i++) {
    var nextObj;
    if (/^\d+$/.test(parts[i + 1]) || parts[i + 1] === "$") {
      nextObj = [];
    } else {
      nextObj = {};
    }
    if (_.isArray(obj)) {
      var index = parts[i] === "$" ? obj.length : parseInt(parts[i]);
      obj = obj[index] ? obj[index] : (obj[index] = nextObj);
    } else {
      obj = obj[parts[i]] ? obj[parts[i]] : (obj[parts[i]] = nextObj);
    }
  }
  obj[parts[parts.length - 1]] = value;
  return obj;
};
/**
 * Clear (delete) the value in object indicated by the given dotpath.
 * @param {Object} object - the object to delete things on
 * @param {String} dotpath - The path to clear (e.g. "field.subfield.0.gone")
 * @return {*|undefined} The value that was cleared, or undefined if the path
 * was already clear.
 */
dotClear = function(object, dotpath) {
  var parts = dotpath.split(".");
  var obj = object;
  for (var i = 0; i < parts.length - 1; i++) {
    if (_.isArray(obj)) {
      obj = obj[parseInt(parts[i])];
    } else {
      obj = obj[parts[i]];
    }
    if (typeof obj === "undefined") {
      return;
    }
  }
  var val;
  var index = parts[parts.length - 1];
  if (_.isArray(obj)) {
    val = obj.splice(parseInt(index), 1)[0];
  } else {
    val = obj[index];
    delete obj[index];
  }
  return val;
};
/**
 * Given a nested object, return a single-level object where all keys are
 * dotted paths.
 * @param {Object} obj - An object to flatten
 * @return {Object} A one-level (non-nested) object where all keys are dotted
 * paths.
 * @example
 *  dotFlatten({
 *    simple: "arg",
 *    array: [
 *      {one: 1, two: 2},
 *      {three; 3, four: 4}
 *    ],
 *    deep: {
 *      deeper: {
 *        deepest: "still"
 *      }
 *    }
 *  })
 *  // yields:
 *  {
 *    "array.0.one": 1,
 *    "array.0.two": 2,
 *    "array.1.three": 3,
 *    "array.1.four": 4,
 *    "deep.deeper.deepest": "still",
 *    "simple": "arg"
 *  }
 */   
dotFlatten = function(obj) {
  function _flatten(obj, res, accumulatedKey) {
    if (_.isArray(obj)) {
      accumulatedKey = accumulatedKey ? accumulatedKey + "." : "";
      for (var i = 0; i < obj.length; i++) {
        _flatten(obj[i], res, accumulatedKey + i);
      }
    } else if (_.isObject(obj)) {
      accumulatedKey = accumulatedKey ? accumulatedKey + "." : "";
      for (var key in obj) {
        _flatten(obj[key], res, accumulatedKey + key);
      }
    } else {
      res[accumulatedKey] = obj;
    }
    return res; 
  }
  return _flatten(obj, {}, undefined);
};
/**
 * Helper to allow "replacement" style updates on the client, which autoform
 * doesn't support <https://github.com/aldeed/meteor-simple-schema/issues/175>
 * and Meteor doesn't allow on the client <http://docs.meteor.com/#/full/allow>
 *
 * Returns a mongo-style modifier that, if applied, would make ``change`` into
 * ``keep``, using $set and $unset.
 *
 * @example
 *  var modifier = mongoReplacementModifier(
 *    latestDoc, collection.findOne(latestDoc._id)
 *  );
 *  collection.update(latestDoc._id, modifier);
 *
 * @param {Object} keep - The object to turn ``change`` into.
 * @param {Object} change - The object to be modified into ``keep``.
 * @return {Object} A mongo-style modifier document with $set and $unset.
 */
mongoReplacementModifier = function(keep, change) {
  var $unset = {};
  for (var key in change) {
    if (keep[key] === undefined) {
      $unset[key] = "";
    }
  }
  var copy = _.clone(keep);
  delete copy._id;
  return {$set: copy, $unset: $unset}
};
/**
 * Return true or false for given textual yes-ish and no-ish values. Returns
 * null if the input is not recognized as a yes-ish or no-ish value.
 * @param {string} txt - The yes-ish or no-ish value.
 * @return {true|false|null} True if yes-ish, false if no-ish, null if
 * unrecognized.
 */
yesOrNo = function(txt) {
  if (_.contains(["yes", "yeah", "y", "true"], txt.toLowerCase())) {
    return true;
  } else if (_.contains(["no", "n", "nope", "false"], txt.toLowerCase())) {
    return false;
  }
  return null;
};

/**
 * Quote given string so it can safely be used as a regex.
 * @param {string} str - The string to quote
 * @return {string} The quoted string, with backslashes added for all special
 * regex chars.
 */
quoteRe = function(str) {
  // Quote "str" so it can safely be used as a regex.
  // http://stackoverflow.com/a/2593661
  return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

