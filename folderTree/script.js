const fs = require("fs");

//UGLY: Maybe I should've take only the last element here, but whatever :D
const basePath = process.argv[2]; //Getting the path
const result = {};

//Function to check my path is exist and it's a directory
const isDirectory = async path => {
  try {
    const stats = await fs.promises.lstat(path); //Used istat to get access to the "isDirectory()" method
    return stats.isDirectory();
  } catch (error) {
    throw new Error("No such file or Directory");
  }
};

//Recursive function that should create the object tree of the file system
const createTree = async (path, target) => {
  try {
    const list = await fs.promises.readdir(path);
    for (const item of list) {
      const currentLocation = `${path}/${item}`;
      const isDir = await isDirectory(currentLocation);
      //If it's a file, then assign it to true
      //Otherwise create object of that directory and do the same for it
      if (!isDir) {
        target[item] = true;
      } else {
        target[item] = {};
        await createTree(currentLocation, target[item]);
      }
    }
  } catch (err) {
    console.log("Somthing went wrong while getting the list of files");
  }
};

//Consuming the createTree function
(async () => {
  try {
    await createTree(basePath, result);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
})();
