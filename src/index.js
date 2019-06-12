// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

const rangeArray = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
const checkType = arr => {
    if (!Array.isArray(arr)) {
        throw "wrong input";
    }
};
const getMax = (arr) => Math.max(...arr);
const getMin = (arr) => Math.min(...arr);

Set.prototype.isSuperset = function(subset) {
    for (var elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
};

Set.prototype.union = function(setB) {
    let union = new Set(this);
    for (let elem of setB) {
        union.add(elem);
    }
    return union;
};

Set.prototype.nextTo = function(setB) {
    for (let elem of setB) {
        if (this.has(elem + 1) || this.has(elem - 1)) {
            return true;
        }
    }
    return false;
};

Set.prototype.intersection = function(setB) {
    let intersection = new Set();

    for (let elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
};

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
};


class RangeList {
    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */

    constructor() {
        this.rangeList = [];
    }

    checkToRemove(min, max){
        let k = this.rangeList;
        let m = k.length;
        let i = 0;
        if(max - min <= 0) return;

        let testSet = rangeArray(min, max);
        let result = [];

        while(i < m){

            if(k[i].intersection(new Set(testSet)).size){

                let range = [...k[i]];
                let upperBound = getMax(range) + 1;

                let f1 = rangeArray(getMin(range), min);
                let f2 = rangeArray(max, upperBound);

                if(f1.length > 1){
                    result.push(new Set(f1));
                }
                if(f2.length > 1){
                    result.push(new Set(f2));
                }

            } else {
                result.push(k[i]);
            }

            i++;
        }

        this.rangeList = result;
    }

    checkToAdd(min, max){
        let k = this.rangeList;
        let m = k.length;
        let i = 0;

        if(max - min <= 0) return;
        let testSet = new Set(rangeArray(min, max));

        while(i < m){
            if(k[i].isSuperset(testSet)){
                return false;
            } else if(k[i].nextTo(testSet)){
                return k[i] = k[i].union(testSet);
            }
            i++;
        }

        this.rangeList.push(testSet);
    }

    // TODO: implement this
    add(range) {

        try {
            checkType(range)
        } catch (e) {
            console.warn(e);
            return
        }

        this.checkToAdd(range[0], range[1]);

    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    // TODO: implement this
    remove(range) {
        try {
            checkType(range)
        } catch (e) {
            console.warn(e);
            return
        }

        this.checkToRemove(range[0], range[1]);

    }

    /**
     * Prints out the list of ranges in the range list
     */
    // TODO: implement this
    print() {
        let str = "";
        this.rangeList.forEach(set => {
            let max = getMax(set) + 1;
            let min = getMin(set);
            str += `[${min},${max}) `;
        });
        console.log(str);
    }
}

// Example run
const rl = new RangeList();

rl.add([1, 5]);
//rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
//rl.print();
// Should display: [1, 5) [10, 20)

rl.add([9, 10]);
//rl.print();
// Should display: [1, 5) [9, 20)

rl.add([20, 20]);
//rl.print();
// Should display: [1, 5) [9, 20)

rl.add([20, 21]);
//rl.print();
// Should display: [1, 5) [9, 21)

rl.add([2, 4]);
//rl.print();
// Should display: [1, 5) [9, 21)

rl.add([3, 8]);
//rl.print();
// Should display: [1, 8) [9, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [9, 21)

rl.remove("asdfasdfasdf");
// Should throw: wrong input

rl.remove([9, 11]);
rl.print();
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)


rl.add('asdfasd');
// Should throw: wrong input

rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
