import fs from "fs";

// Sync...
export function createSyncFile() {
  fs.writeFileSync("./testSync.txt", "Hello Node JS! I'm Meghana...");
}

// Async... - 3 parameters (filename, data, callback) (must)**
export function createFile() {
  fs.writeFile(
    "./test.txt",
    "Hello Node JS! I'm Meghana... Practising Node JS",
    (err) => {},
  );
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
