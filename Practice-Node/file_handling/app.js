const fs = require("fs");

fs.readFile("data.txt", "utf-8", (err, data) => {
    if(err) {console.log("File Not Found");
    } else {
        console.log(data);
        console.log("Characters: "+data.length);  
    }
})

fs.writeFile("users.txt", "Meghana \nRahul \nAnil \nPriya", (err) => {});

fs.appendFile("users.txt", `\nKiran\n`, (err)=> {});


// Error Handling

fs.readFile("unknown.txt", "utf-8", (err, data) => {
    if(err) {
        console.log("File Not Found");
    } else {
        console.log(data);
    }
})