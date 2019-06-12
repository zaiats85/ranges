/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Task: Implement a class named 'RangeList'\n// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.\n// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)\n\n/**\n *\n * NOTE: Feel free to add any extra member variables/functions you like.\n */\n\nconst rangeArray = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);\nconst lastItem = (arr) => {\n    if (!Array.prototype.last){\n        Array.prototype.last = function(){\n            return this[this.length - 1];\n        };\n    }\n};\n\n\nclass RangeList {\n    /**\n     * Adds a range to the list\n     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.\n     */\n\n    constructor() {\n        this.rangeList = [];\n    }\n\n    static lastItem(arr) {\n        return arr[arr.length - 1];\n    };\n\n    checkRemove(min, max){\n        let k = this.rangeList;\n        let m = k.length;\n        if(!m) return;\n\n        for(let i = 0; i < m; i++){\n            let range = k[i];\n\n            if(range.includes(min) && range.includes(max)){\n                console.log(\"swallow\");\n                return;\n            } else if(range.includes(min) && max > RangeList.lastItem(range)){\n\n                console.log(\"extend max\");\n\n            } else if(range.includes(max) && min < range[0]){\n\n                console.log(min + \" \" + range[0]);\n\n                console.log(\"extend min\");\n\n            }\n\n        }\n\n    }\n\n    checkIncludes(min, max){\n        let k = this.rangeList;\n        let m = k.length;\n\n        if( Math.abs(max - min) <= 0) return;\n\n        for(let i = 0; i < m; i++){\n            let range = k[i];\n\n            if(range.includes(min) && range.includes(max)){\n                console.info(\"swallow\");\n                return;\n            } else if(range.includes(min-1) && max > RangeList.lastItem(range)){\n                console.log(\"extend max \" + RangeList.lastItem(range) + \" to \" + max);\n                k[i] = range.concat(rangeArray(min, max));\n                return;\n            } else if(range.includes(max) && min < range[0]){\n                console.log(\"extend min \" + range[0] + \" to \" + min);\n                k[i] = range.concat(rangeArray(min, range[0]));\n                return;\n            }\n        }\n\n        this.rangeList.push(rangeArray(min, max));\n    }\n\n    // TODO: implement this\n    add(range) {\n        if (!Array.isArray(range)) {\n            console.warn(\"wrong input\");\n        }\n\n        this.checkIncludes(range[0], range[1]);\n\n    }\n\n    /**\n     * Removes a range from the list\n     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.\n     */\n    remove(range) {\n        // TODO: implement this\n    }\n\n    /**\n     * Prints out the list of ranges in the range list\n     */\n    print() {\n        // TODO: implement this\n    }\n}\n\n// Example run\nconst rl = new RangeList();\n\nrl.add([1, 5]);\nrl.print();\n// Should display: [1, 5)\n\nrl.add([10, 20]);\nrl.print();\n// Should display: [1, 5) [10, 20)\n\nrl.add([20, 20]);\nrl.print();\n// Should display: [1, 5) [10, 20)\n\nrl.add([20, 21]);\nrl.add([21, 22]);\nrl.add([24, 28]);\nrl.add([24, 21]);\nrl.print();\n// Should display: [1, 5) [10, 21)\n\nrl.add([2, 4]);\nrl.print();\n// Should display: [1, 5) [10, 21)\n\nrl.add([3, 8]);\nrl.print();\n// Should display: [1, 8) [10, 21)\n\n/*rl.remove([10, 10]);\nrl.print();\n// Should display: [1, 8) [10, 21)\n\nrl.remove([10, 11]);\nrl.print();\n// Should display: [1, 8) [11, 21)\n\nrl.remove([15, 17]);\nrl.print();\n// Should display: [1, 8) [11, 15) [17, 21)\nrl.add('asdfasd');\n\nrl.remove([3, 19]);\nrl.print();*/\n\nconsole.log(rl);\n// Should display: [1, 3) [19, 21)\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });