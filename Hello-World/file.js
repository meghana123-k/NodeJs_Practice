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
