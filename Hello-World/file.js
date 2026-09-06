import fs from "fs";

// Sync...
export function createSyncFile() {
  fs.writeFileSync("./testSync.txt", "Hello Node JS! I'm Meghana...");
  console.log("Created Sync file - testSync.txt");
}

// Async... - 3 parameters (filename, data, callback) (must)**
export function createFile() {
  fs.writeFile(
    "./test.txt",
    "Hello Node JS! I'm Meghana... Practising Node JS",
    (err) => {},
  );
  console.log("Created ASync file - test.txt");
}

export function readFileFn() {
  const result = fs.readFileSync("./contacts.txt", "utf-8");
  console.log(result);
}
export function readFileAsync() {
  fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
}

export function appendFileSyncFn() {
  fs.appendFileSync("./testSync.txt", `\nHello World\n`);
  console.log("Append \"Hello World\" in testSync.txt file..");
}
