"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findParent = findParent;
function findParent(el, class_name) {
    if (el.className && el.className.indexOf && el.className.indexOf(class_name) !== -1) return el;
    if (el.parentNode) return findParent(el.parentNode, class_name);
    return null;
}
//# sourceMappingURL=DomUtils.js.map