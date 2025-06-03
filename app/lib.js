import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const lib = { numbers: () => {}, array: () => {}, baseDir: "", data:()=>{} };
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
lib.baseDir = path.join(__dirname, ".././data");

lib.numbers.duplicateNumber = (number) => {
  if (typeof number == "number") {
    return 2 * number;
  } else {
    return false;
  }
};

lib.numbers.isDivisible = (number, divider) => {
  if (typeof number == "number" && typeof divider == "number") {
    const result = number / divider;
    if (Number.isInteger(result)) {
      return true;
    } else {
      return false;
    }
  } else {
    // One of the parameters is not a number.
    return false;
  }
};

lib.array.sumOfElements = (array) => {
  if (Array.isArray(array)) {
    let sum = 0;
    let error = false;
    for (let element of array) {
      if (typeof element == "number") {
        sum += element;
      } else {
        error = true;
      }
    }
    if (error) {
      // One of the parameters is not a number.
      return false;
    } else {
      return sum;
    }
  } else {
    // The parameter is not an array!
    return false;
  }
};

lib.array.duplicatedPrimitives = (array) => {
  if (Array.isArray(array)) {
    let duplicated = [];
    let error = false;
    array.reduce((acc, curr) => {
      if (typeof curr == "object" && curr !== null) {
        error = true;
      }
      let key = curr;
      key = typeof curr == "string" ? key + "-s" : key;
      if (typeof acc[key] == "undefined") {
        return { ...acc, [key]: 1 };
      } else {
        duplicated.push(curr);
        return { ...acc, [key]: acc[key] + 1 };
      }
    }, {});
    if (error) {
      // One the parameters is not primitive!
      return false;
    }
    return duplicated;
  } else {
    // The parameter is not an array!
    return false;
  }
};

lib.data.readAccount = (accountId,callback) => {
  fs.readFile(`${lib.baseDir}/accounts.json`, (err, data) => {
    if (!err && data) {
      data = JSON.parse(data);
      const { items } = data;
      let account={};
      for (const item of items) {
        if (item.id==accountId) {
          account={...item};
        }
      }
      if (account.id) {
        callback(200,account);
      } else {
        callback(404,'The account does not exist.')
      }
   
    } else {
      callback(404,err);
    }
  });
};
