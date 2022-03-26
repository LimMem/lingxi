"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  requireOrImport: true
};
Object.defineProperty(exports, "requireOrImport", {
  enumerable: true,
  get: function get() {
    return _requireOrImport.requireOrImport;
  }
});

var _common = require("./common");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _common[key];
    }
  });
});

var _requireOrImport = require("./requireOrImport");