/**
 * Return a sluggified version of the given name, suitable for use in a URL.
 * @param {string} name - The name to slugify.
 * @return {string} The name lowercased with spaces and un-URL-friendly chars removed.
 */
slugify = function(name) {
  return name.toLowerCase().replace(/[^-a-z0-9]+/g, "-").replace(/-*$/, "");
};

/**
 * Un-camel-case, underscore, dash, etc. the name, and title-case it.
 */
unslugify = function(name) {
  // un-camel-case
  name = name.replace(/(.)([A-Z][a-z]+)/g, '$1 $2');
  // un-underscore/dash/dot
  name = name.replace(/[-_\.]/g, ' ')
  // title caseify
  name = name.replace(/\w\S*/g, function(t) {
    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
  });
  return name;
};

/**
 * Return true or false for given textual yes-ish and no-ish values. Returns
 * null if the input is not recognized as a yes-ish or no-ish value.
 * @param {string} txt - The yes-ish or no-ish value.
 * @return {true|false|null} True if yes-ish, false if no-ish, null if
 * unrecognized.
 */

var yesPrimary = ["yes", "yeah", "y", "ya", "yea", "yup", "yep", "true", "sure", "gladly", "absolutely", "totally", "totes", "got it", "ok", "k", "kk", "umkay", "sounds good", "indeed", "yes", "no problem", "not a problem"];
var noPrimary = ["no", "n", "nope", "false", "na", "not", "pass", "nah", "nay", "dont", "do not", "not cool", "definitely not", "def not", "defs not", "certainly not", "course not", "absolutely not", "not ready", "have not"];
var yesSecondary = ["right", "cool", "definitely", "def", "defs", "certainly", "course", "absolutely", "ready", "do", "start", "started", "have"];
var noSecondary = ["not"];

yesOrNo = function(txt) {
  txt = txt.trim().toLowerCase().replace(/[^a-z ]/g, "");
  function containsWord (word) {
    var regex = new RegExp("\\b" + word + "\\b");
    return regex.test(txt);
  }

  if (_.some(yesPrimary, containsWord)) {
    return true
  } else if (_.some(noPrimary, containsWord)) {
    return false;
  } else if (_.some(yesSecondary, containsWord)) {
    return true;
  } else if (_.some(noSecondary, containsWord)) {
    return false;
  }

  //Maybe track when not understood with analytics?
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

/**
 * Return a number formatted in a US-ish fashion.
 */
formatPhone = function(num) {
  return (num || '').replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};


