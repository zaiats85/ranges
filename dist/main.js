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

eval("// Task: Implement a class named 'RangeList'\n// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.\n// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)\n\n/**\n *\n * NOTE: Feel free to add any extra member variables/functions you like.\n */\n\nconst rangeArray = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);\nconst checkType = arr => {\n    if (!Array.isArray(arr)) {\n        throw \"wrong input\";\n    }\n};\nconst getMax = (arr) => Math.max(...arr);\nconst getMin = (arr) => Math.min(...arr);\n\nSet.prototype.isSuperset = function(subset) {\n    for (var elem of subset) {\n        if (!this.has(elem)) {\n            return false;\n        }\n    }\n    return true;\n};\n\nSet.prototype.union = function(setB) {\n    let union = new Set(this);\n    for (let elem of setB) {\n        union.add(elem);\n    }\n    return union;\n};\n\nSet.prototype.nextTo = function(setB) {\n    for (let elem of setB) {\n        if (this.has(elem + 1) || this.has(elem - 1)) {\n            return true;\n        }\n    }\n    return false;\n};\n\nSet.prototype.intersection = function(setB) {\n    let intersection = new Set();\n\n    for (let elem of setB) {\n        if (this.has(elem)) {\n            intersection.add(elem);\n        }\n    }\n    return intersection;\n};\n\nSet.prototype.difference = function(setB) {\n    var difference = new Set(this);\n    for (var elem of setB) {\n        difference.delete(elem);\n    }\n    return difference;\n};\n\n\nclass RangeList {\n    /**\n     * Adds a range to the list\n     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.\n     */\n\n    constructor() {\n        this.rangeList = [];\n    }\n\n    checkToRemove(min, max){\n        let k = this.rangeList;\n        let m = k.length;\n        let i = 0;\n        if(max - min <= 0) return;\n\n        let testSet = rangeArray(min, max);\n        let result = [];\n\n        while(i < m){\n\n            if(k[i].intersection(new Set(testSet)).size){\n\n                let range = [...k[i]];\n                let upperBound = getMax(range) + 1;\n\n                let f1 = rangeArray(getMin(range), min);\n                let f2 = rangeArray(max, upperBound);\n\n                if(f1.length > 1){\n                    result.push(new Set(f1));\n                }\n                if(f2.length > 1){\n                    result.push(new Set(f2));\n                }\n\n            } else {\n                result.push(k[i]);\n            }\n\n            i++;\n        }\n\n        this.rangeList = result;\n    }\n\n    checkToAdd(min, max){\n        let k = this.rangeList;\n        let m = k.length;\n        let i = 0;\n\n        if(max - min <= 0) return;\n        let testSet = new Set(rangeArray(min, max));\n\n        while(i < m){\n            if(k[i].isSuperset(testSet)){\n                return false;\n            } else if(k[i].nextTo(testSet)){\n                return k[i] = k[i].union(testSet);\n            }\n            i++;\n        }\n\n        this.rangeList.push(testSet);\n    }\n\n    // TODO: implement this\n    add(range) {\n\n        try {\n            checkType(range)\n        } catch (e) {\n            console.warn(e);\n            return\n        }\n\n        this.checkToAdd(range[0], range[1]);\n\n    }\n\n    /**\n     * Removes a range from the list\n     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.\n     */\n    // TODO: implement this\n    remove(range) {\n        try {\n            checkType(range)\n        } catch (e) {\n            console.warn(e);\n            return\n        }\n\n        this.checkToRemove(range[0], range[1]);\n\n    }\n\n    /**\n     * Prints out the list of ranges in the range list\n     */\n    // TODO: implement this\n    print() {\n        let str = \"\";\n        this.rangeList.forEach(set => {\n            let max = getMax(set) + 1;\n            let min = getMin(set);\n            str += `[${min},${max}) `;\n        });\n        console.log(str);\n    }\n}\n\n// Example run\nconst rl = new RangeList();\n\nrl.add([1, 5]);\n//rl.print();\n// Should display: [1, 5)\n\nrl.add([10, 20]);\n//rl.print();\n// Should display: [1, 5) [10, 20)\n\nrl.add([9, 10]);\n//rl.print();\n// Should display: [1, 5) [9, 20)\n\nrl.add([20, 20]);\n//rl.print();\n// Should display: [1, 5) [9, 20)\n\nrl.add([20, 21]);\n//rl.print();\n// Should display: [1, 5) [9, 21)\n\nrl.add([2, 4]);\n//rl.print();\n// Should display: [1, 5) [9, 21)\n\nrl.add([3, 8]);\n//rl.print();\n// Should display: [1, 8) [9, 21)\n\nrl.remove([10, 10]);\nrl.print();\n// Should display: [1, 8) [9, 21)\n\nrl.remove(\"asdfasdfasdf\");\n// Should throw: wrong input\n\nrl.remove([9, 11]);\nrl.print();\n// Should display: [1, 8) [11, 21)\n\nrl.remove([15, 17]);\nrl.print();\n// Should display: [1, 8) [11, 15) [17, 21)\n\n\nrl.add('asdfasd');\n// Should throw: wrong input\n\nrl.remove([3, 19]);\nrl.print();\n// Should display: [1, 3) [19, 21)\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });