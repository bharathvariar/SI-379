/**
 * SI 379: JavaScript Practice
 * 
 * Load "379-js-practice-tests.html" in your browser to view the results.
 */

/**
 * Define `addOne` as a function that expects one argument (a number)
 * and returns that argument's value plus one.
 */

function addOne(x) {
    return x + 1;
}


/**
 * Define `largest` as a function that expects one argument (an array of numbers)
 * and returns the largest item in that array.
 */

function largest(lst) {
    if (lst.length === 0) { return undefined }
    let largest_num = lst[0];
    for (const elem of lst) {
        if (elem > largest_num) {
            largest_num = elem;
        }
    }
    return largest_num;
}

/**
 * The *factorial* of a number n is denoted as: n! === n * (n-1) * (n-2) * ... * 1
 * 
 * For example, 4! === 4 * 3 * 2 * 1 === 24
 * Another example: 6! === 6 * 5 * 4 * 3 * 2 * 1 === 720
 * 
 * Define a function `fact` that accepts one argument (a positive integer n) and returns n!
 * 
 * Note: 0! is 1
 */

function fact(n) {
    let factorial = n;
    if (n === 0) {
        return 1;
    } else if (n === 1) {
        return 1;
    } else {
        factorial = factorial * fact(n - 1);
    }
    return factorial;
}