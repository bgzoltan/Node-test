import { lib } from "../app/lib.js";
import { appConfig } from "./config.js";
import assert from "assert"; // module provides a set of assertion functions for verifying invariant

// * UNIT tests

export const unit = {};

const createTestName = (functionName, parameters, returnValue) => {
  return (
    functionName + ' - '+
    appConfig.colors.reset +
    "parameter(s): " +
    appConfig.colors.yellow +
    parameters +
    appConfig.colors.reset +
    " ; should return: " +
    appConfig.colors.yellow +
    returnValue +
    appConfig.colors.reset
  );
};

unit[createTestName("duplicateNumber", "2", "4 as a number")] = (done) => {
  const result = lib.numbers.duplicateNumber(2);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, 4);
  done(true, false);
};

unit[createTestName("duplicateNumber", "2", "5")] = (done) => {
  const result = lib.numbers.duplicateNumber(2);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, 5);
  done(true, false);
};

unit[createTestName("isDivisible", "9,3", "true")] = (done) => {
  const result = lib.numbers.isDivisible(9, 3);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.ok(result);
  done(true, false);
};

unit[createTestName("isDivisible", "9,2", "false")] = (done) => {
  const result = lib.numbers.isDivisible(9, 2);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, false);
  done(true, false);
};

unit[createTestName("isDivisible", "'a',2", "true")] = (done) => {
  const result = lib.numbers.isDivisible("a", 2);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.ok(result);
  done(true, false);
};

unit[createTestName("isDivisible", "101,2", "false")] = (done) => {
  const result = lib.numbers.isDivisible(102.3, 2);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, false);
  done(true, false);
};

unit[createTestName("sumOfElements", "[1,2,3,4,5]", "15 as a number")] = (
  done
) => {
  const result = lib.array.sumOfElements([1, 2, 3, 4, 5]);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, 15);
  done(true, false);
};

unit[createTestName("sumOfElements", "1", "false")] = (done) => {
  const result = lib.array.sumOfElements(1);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, false);
  done(true, false);
};

unit[createTestName("sumOfElements", "1", "1")] = (done) => {
  const result = lib.array.sumOfElements(1);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, 1);
  done(true, false);
};

unit[createTestName("sumOfElements", "[2.2,2,2]", "6.2")] = (done) => {
  const result = lib.array.sumOfElements([2.2, 2, 2]);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, 6.2);
  done(true, false);
};

unit[createTestName("sumOfElements", "['a',1,2]", "false")] = (done) => {
  const result = lib.array.sumOfElements(["a", 1, 2]);
  assert.ok(typeof result == "number" || typeof result == "boolean");
  assert.equal(result, false);
  done(true, false);
};

unit[createTestName("duplicatedPrimitives", "[1,2,3,4,5,1]", "[1]")] = (
  done
) => {
  const result = lib.array.duplicatedPrimitives([1, 2, 3, 4, 5, 1]);
  assert.ok(Array.isArray(result) || typeof result == "boolean");
  assert.deepStrictEqual(result, [1]);
  done(true, false);
};

unit[
  createTestName("duplicatedPrimitives", "[1,2,3,4,5,null,false]", "[]")
] = (done) => {
  const result = lib.array.duplicatedPrimitives([1, 2, 3, 4, 5, null, false]);
  assert.ok(Array.isArray(result) || typeof result == "boolean");
  assert.deepStrictEqual(result, []);
  done(true, false);
};

unit[createTestName("duplicatedPrimitives", "[1,2,{'2':2}]", "[]")] = (
  done
) => {
  const result = lib.array.duplicatedPrimitives([1, 2, { 2: 2 }]);
  assert.ok(Array.isArray(result) || typeof result == "boolean");
  assert.deepStrictEqual(result, [], `Received ${result} instead of []`);
  done(true, false);
};

unit[
  createTestName("readAccount", "'00001'", "data as an account object with the id")
] = (done) => {
  lib.data.readAccount("00001", (err, data) => {
    // Because of the asyncronus operation this try is necessary not to catch assertion error inside
    try {
      assert.ok(data && err === 200, "Should receive data and a 200 status");
      assert.equal(typeof data,'object');
      assert.equal(data.id, "00001", "Account ID should be '00001'");
      done(true, false);
    } catch (err) {
      done(false, err);
    }
  });
};

unit[
  createTestName("readAccount", "'00004'", "id does not exist, so error  404")
] = (done) => {
  lib.data.readAccount("00004", (err, data) => {
    // Because of the asyncronus operation this try is necessary not to catch assertion error inside
    try {
      done(true, false);
    } catch (err) {
      done(false, false);
    }
  });
};

