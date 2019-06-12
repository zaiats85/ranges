// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

const rangeArray = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
const lastItem = (arr) => {
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    }
};


class RangeList {
    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */

    constructor() {
        this.rangeList = [];
    }

    static lastItem(arr) {
        return arr[arr.length - 1];
    };

    checkRemove(min, max){
        let k = this.rangeList;
        let m = k.length;
        if(!m) return;

        for(let i = 0; i < m; i++){
            let range = k[i];

            if(range.includes(min) && range.includes(max)){
                console.log("swallow");
                return;
            } else if(range.includes(min) && max > RangeList.lastItem(range)){

                console.log("extend max");

            } else if(range.includes(max) && min < range[0]){

                console.log(min + " " + range[0]);

                console.log("extend min");

            }

        }

    }

    checkIncludes(min, max){
        let k = this.rangeList;
        let m = k.length;

        if( Math.abs(max - min) <= 0) return;

        for(let i = 0; i < m; i++){
            let range = k[i];

            if(range.includes(min) && range.includes(max)){
                console.info("swallow");
                return;
            } else if(range.includes(min-1) && max > RangeList.lastItem(range)){
                console.log("extend max " + RangeList.lastItem(range) + " to " + max);
                k[i] = range.concat(rangeArray(min, max));
                return;
            } else if(range.includes(max) && min < range[0]){
                console.log("extend min " + range[0] + " to " + min);
                k[i] = range.concat(rangeArray(min, range[0]));
                return;
            }
        }

        this.rangeList.push(rangeArray(min, max));
    }

    // TODO: implement this
    add(range) {
        if (!Array.isArray(range)) {
            console.warn("wrong input");
        }

        this.checkIncludes(range[0], range[1]);

    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        // TODO: implement this
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        // TODO: implement this
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

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.add([21, 22]);
rl.add([24, 28]);
rl.add([24, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

/*rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.add('asdfasd');

rl.remove([3, 19]);
rl.print();*/

console.log(rl);
// Should display: [1, 3) [19, 21)
