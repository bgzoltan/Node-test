import { unit } from "./unit.js"; // importing tests
import { appConfig } from "./config.js";

export const app = {};

// * app colors
app.colors = {...appConfig.colors}

app.getRealLength = (str) => {
  const regex = /\x1b\[[0-9;]*m/g;
  const cleanedStr = str.replace(regex, "");
  return cleanedStr.length;
};

app.print = (color, text, title) => {
  if (title) {
    console.log("---------------------------------------------------------------------------------------------");
  }

  console.log(color + text + app.colors.reset);
  if (title) {
    console.log("---------------------------------------------------------------------------------------------");
  }
};

// * Tests container
app.tests = {};
app.tests.unit = { ...unit };

// * Return the nymber of tests
app.countTests = () => {
  let counter = 0;
  for (let key in app.tests) {
    if (app.tests.hasOwnProperty(key)) {
      let subtests = app.tests[key];
      for (let subtest in subtests) {
        if (subtests.hasOwnProperty(subtest)) {
          counter++;
        }
      }
    }
  }
  return counter;
};

// * Iterating on tests and run them
app.runTests = () => {
  let errors = []; // * Collecting errors
  let successes = 0; // * Number of successfull tests
  let counter = 0; // * Counting the tests
  let limit = app.countTests(); // * Number of tests

  // * Title
  app.print(app.colors.yellow, "TESTS",true);

  // * Iterating on all tests
  for (let key in app.tests) {
    if (app.tests.hasOwnProperty(key)) {
      let subTest = app.tests[key];

      // * Iterating on the subtests
      for (let testName in subTest) {
        if (subTest.hasOwnProperty(testName)) {
          // IIFE is not necessary because I use let instead of var
          try {
            // * Creating testCallback closure
            // * Passing done (test has run) and err (asynchronous error has occured) to handle asynchronous errors inside the test
            const testCallback = (done, asyncErr) => {
              if (done && !asyncErr) {
                // * Print successfull test details
                counter++;
                successes++;
                const text = "\u221A " + counter + ". Function: " + testName;
                app.print(app.colors.green, text,false);
              } else {
                // * Print not successfull test details
                errors.push({ name: testName, error: asyncErr });
                counter++;
                const text = "X " + counter + ". Function: " + testName;
                app.print(app.colors.red, text,false);
              }

              // * If all test has done create a test report
              if (counter == limit) {
                app.produceTestReport(limit, successes, errors);
              }
            };
            // * Call the actual test
            subTest[testName](testCallback);
          } catch (e) {
            // * Catch synchronous errors and print it
            errors.push({ name: testName, error: e });
            counter++;
            const text = "X " + counter + ". Function: " + testName;
            app.print(app.colors.red, text,false);
            // * If all test has done create a test report
            if (counter == limit) {
              app.produceTestReport(limit, successes, errors);
            }
          }
        }
      }
    }
  }
};

app.produceTestReport = (limit, successes, errors) => {
  console.log("");
  let text = "TEST REPORT";
  app.print(app.colors.yellow, text,true);
  console.log("Total tests: ", limit);
  console.log("Succesfull tests: ", successes);
  console.log("Failed tests: ", errors.length);
  console.log("");

  if (errors.length > 0) {
    text = "ERROR DETAILS";
    app.print(app.colors.yellow, text,true);
    errors.forEach((error, index) => {
      let counter = index + 1;
      text = counter + ". Function: " + error.name;
      app.print(app.colors.red, text,false);
      text = "   Error: " + error.error;
      app.print(app.colors.red, text,false);
    });
  }
  console.log("");
  text = "END OF REPORT";
  app.print(app.colors.yellow, text,true);
};

app.runTests();
