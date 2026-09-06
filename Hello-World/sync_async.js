import fs from 'fs';
import os from 'os';
// to know the threads or available cpu's
console.log(os.cpus().length);



// // Blocking Request
// console.log("1");

// const result = fs.readFileSync('contacts.txt', 'utf-8');
// console.log(result);

// console.log("2");
// console.log("3");
// console.log("4");


// Non - Blocking Request

console.log("1");

fs.readFile('contacts.txt', 'utf-8', (err, result) => {
    console.log(result);
});

