// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */


/******* UTILS ********/
const rangeArray = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

const checkType = arr => {
    if (!Array.isArray(arr)) {
        throw "wrong input";
    }
};
const comparator = (a, b) => a - b;

const reducer = (acc, curVal) => {
    const lastSubArray = acc[acc.length - 1];

    if(!lastSubArray || lastSubArray[lastSubArray.length - 1] !== curVal - 1) {
        acc.push([]);
    }

    acc[acc.length - 1].push(curVal);

    return acc;
};

/****** BOOST SET *******/
Set.prototype.union = function(setB) {
    let union = new Set(this);
    for (let elem of setB) {
        union.add(elem);
    }
    return union;
};

Set.prototype.difference = function(setB) {
    let difference = new Set(this);
    for (let elem of setB) {
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
        this.rangeList = new Set();
    }

    // TODO: implement this
    add(range) {

        let min = range[0];
        let max = range[1];

        // (min - max)єN only.
        if(max - min <= 0 || max < 0 || min < 0) return;

        try {
            checkType(range)
        } catch (e) {
            console.warn(e);
            return
        }

        let testSet = new Set(rangeArray(min, max));
        this.rangeList = this.rangeList.union(testSet);

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

        let min = range[0];
        let max = range[1];
        if(max - min <= 0) return;

        let testSet = new Set(rangeArray(min, max));
        this.rangeList = this.rangeList.difference(testSet)

    }

    /**
     * Prints out the list of ranges in the range list
     */
    // TODO: implement this
    print() {
        let str = "";
        let i = 0;
        let arr = [...this.rangeList];
        let res = arr.sort(comparator).reduce(reducer, []);

        while(i < res.length) {

            // since is a consecutive sequence 1st := min, last := max. upperBound limit := max +1
            str += `[${res[i].shift()} ${res[i].pop() + 1}) `;

            i++
        }

        console.log(str);
    }
}

// Example run
const rl = new RangeList();

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([9, 10]);
rl.print();
// Should display: [1, 5) [9, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [9, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [9, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [9, 21)

rl.add([13, 8]);
// Should skip

rl.add([-13, -8]);
// Should skip

rl.add([3, 8]);
rl.print();
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
