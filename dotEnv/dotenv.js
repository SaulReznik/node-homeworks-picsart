const fs = require("fs");

//Exporting the object with "config" method
//To make it possible to call the "config" method like in the example
module.exports = {
  config: () => {
    //UGLY: In the example there was no place for "path" prop
    //So I just hardcoded it
    const data = fs.readFileSync("./.env");
    //Making the data string from buffer and spliting them by new line sign
    const varsArr = data.toString().split(/\n/);
    //Removing comments and empty lines
    const filteredVars = varsArr.filter(v => !(!v || v[0] === "#"));
    //Our result object, which will be spreaded to our "process.env"
    const varsObj = {};

    filteredVars.forEach(v => {
      //Spliting our variables into keys and values
      const arr = v.split("=");
      //Triming our keys and values
      const key = arr[0].trim();
      const value = arr[1].trim();

      //If key is empty or has spaces between wards, then skip it
      if (!key || key.includes(" ")) return;

      varsObj[key] = value;
    });

    //Adding new environmental variables to "process.env" object
    process.env = {
      ...process.env,
      ...varsObj
    };
  }
};
