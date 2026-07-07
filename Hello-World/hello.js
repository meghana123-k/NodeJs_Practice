// const math = require("./math");
// console.log(add); // add function

// console.log(math.add(5, 6));
// console.log(math.sub(5, 6));

// const { add, sub } = require("./math");

// console.log(add); // anonymous function

// console.log(add(5, 2));
// console.log(sub(5, 2));

import { add, sub } from "./math.js";
import { createSyncFile, createFile, readFileFn, readFileAsync } from "./file.js";
console.log(add(20, 3));
console.log(sub(22, 3));
createSyncFile();
createFile();
readFileFn();
readFileAsync();