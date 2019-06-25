import { isNumber, isArray, isPlainObject, isUndefined } from "lodash";

export function prettify(str) {
  if (isNumber(str)) {
    // If there are more than 2 decimals round it to two
    if ((str * 100) % 1 === 0) {
      return "" + str;
    } else {
      return parseFloat(Math.round(str * 100) / 100).toFixed(2);
    }
  }

  if (isArray(str)) {
    return str
      .map(function(s) {
        return prettify(s);
      })
      .join(", ");
  }

  if (isPlainObject(str)) {
    if (isUndefined(str.toString)) {
      return JSON.stringify(str);
    }

    return str.toString();
  }

  // Ensure the string is actually a string
  str = "" + str;

  return (
    str
      // Splits keys separated by periods
      .replace(/([^\s])\.([^\s])/g, "$1 $2")
      // Removes backslashes
      .replace(/\\+/g, "")
      // Replaces - and - with space
      .replace(/[_-]/g, " ")
      // Splits camel cased words
      .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
        return "" + m1 + " " + m2.toLowerCase();
      })
      .toLowerCase()
  );
}
