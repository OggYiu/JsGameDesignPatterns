const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require('chai');
const { Tuple } = require("../../out/tuple");
const { Point } = require("../../out/point");
const { Vector } = require("../../out/vector");
const { Color } = require("../../out/color");
const { Canvas } = require("../../out/canvas");
const { Matrix } = require("../../out/matrix");

let variables = {};

Given('{word} ← tuple\\({float}, {float}, {float}, {float}\\)', function (word, float, float2, float3, float4) {
  variables[word] = new Tuple(float, float2, float3, float4);
});

Given('{word} ← vector\\({float}, {float}, {float}\\)', function (word, float, float2, float3) { 
  variables[word] = new Vector(float, float2, float3);
});

Given('{word} ← point\\({float}, {float}, {float}\\)', function (word, float, float2, float3) { 
  variables[word] = new Point(float, float2, float3);
});

Given('{word} ← color\\({float}, {float}, {float}\\)', function (word, float, float2, float3) { 
  variables[word] = new Color(float, float2, float3);
});

Given('{word} ← canvas\\({float}, {float}\\)', function (variableName, width, height) {
    variables[variableName] = new Canvas(width, height);
}); 

Then('{word} is a point', function (word) {
  expect(variables[word].isPoint()).to.be.true;
});

Then('{word} is not a vector', function (word) {
  expect(variables[word].isVector()).to.be.false;
});

Then(/^(\-)?(\w)+ = tuple\((\-?\d)+, (\-?\d)+, (\-?\d)+, (\-?\d)+\)$/, function (sign, word, float, float2, float3, float4) {
  let v = variables[word];
  if(sign != null) {
    v = v.negative();
  } 
  expect(v.equal(new Tuple(float, float2, float3, float4))).to.be.true;
});

// Then(/^(\w+) ([*]) (\w+)$/, function(w, w1, w2){
// });

Then(/^([_a-zA-Z]\w*) ([+*-]+) ([_a-zA-Z]\w*) = (\w+)\(([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*)[, +]?([+-]?[0-9]+.?[0-9]*)?\)$/, function(word, operator, word2, word3, float, float2, float3, float4) {
  float = parseFloat(float);
  float2 = parseFloat(float2);
  float3 = parseFloat(float3);
  float4 = parseFloat(float4);
  
  let result;
  switch(operator)
  {
    case '+': {
      result = variables[word].add(variables[word2]);
    }
    break;
    case '-': {
      result = variables[word].subtract(variables[word2]);
    }
    break;
    case '*': {
      result = variables[word].multiply(variables[word2]);
    }
    break;
    default:
      expect(`unhandled operator ${operator}`).to.be.true;
      break;
  }

  switch(word3)
  {
    case 'tuple':{
      expect(result.equal(new Tuple(float, float2, float3, float4))).to.be.true;
    }
    break;
    case 'vector':{
      expect(result.equal(new Vector(float, float2, float3))).to.be.true;
    }
    break;
    case 'point':{
      expect(result.equal(new Point(float, float2, float3))).to.be.true;
    }
    break;
    case 'color':{
      expect(result.equal(new Color(float, float2, float3))).to.be.true;
    }
    break;
    default:
      expect(`unhandled class ${word3}`).to.be.true;
      break;
  }
});

Then(/^(\w+) ([*/]) ([+-]?[0-9]+.?[0-9]*) = (\w+)\(([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*),? ?([+-]?[0-9]+.?[0-9]*)?\)$/, function(variableName, operator, float, className, vx, vy, vz, vw){
  float = parseFloat(float);
  vx = parseFloat(vx);
  vy = parseFloat(vy);
  vz = parseFloat(vz);

  let result;
  switch(operator)
  {
    case '*': {
      result = variables[variableName].multiply(float);
    }
    break;
    case '/': {
      result = variables[variableName].divide(float);
    }
    break;
    default:
      expect(`unhandled operator ${operator}`).to.be.true;
      break;
  }

  switch(className)
  {
    case 'tuple':{
      expect(result.equal(new Tuple(vx, vy, vz, vw))).to.be.true;
    }
    break;
    case 'color':{
      expect(result.equal(new Color(vx, vy, vz))).to.be.true;
    }
    break;
    default:
      expect(`unhandled class ${className}`).to.be.true;
      break;
  }
});

Then(/^(\w+)\((\w+)\) = (\√?)([+-]?[0-9]+.?[0-9]*)$/, function(methodName, word, operator, float) {
  float = parseFloat(float);

  switch(operator)
  {
    case '√': {
      float = Math.sqrt(float);
    }
    break;
  }
  
  switch(methodName)
  {
    case 'magnitude': {
        let v = variables[word].length();
        expect(v).to.be.equal(float);
      }
      break;
    default:
      expect(false).to.be.true;
      break;
  }
});

// Then normalize(v) = vector(1, 0, 0)
Then(/^(\w+)\((\w+)\) = vector\(([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*)\)$/, function(methodName, variableName, vx, vy, vz) {
  switch(methodName)
  {
    case 'normalize': {
        let v = variables[variableName].normalize();
        expect(v.equal(new Vector(vx, vy, vz))).to.be.true;
      }
      break;
    default:
      expect(false).to.be.true;
      break;
  }
});

When(/^(\w+) ← normalize\((\w+)\)$/, function (variableName01, variableName02) {
  variables[variableName01] = variables[variableName02].normalize();
});

Then(/^dot\((\w+), (\w+)\) = ([+-]?[0-9]+.?[0-9]*)$/, function(variableName01, variableName02, value) {
  value = parseFloat(value);
  let result = variables[variableName01].dot(variables[variableName02]);
  expect(result).to.be.equal(value);
});

Then(/^cross\((\w+), (\w+)\) = vector\(([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*), ([+-]?[0-9]+.?[0-9]*)\)$/, function(variableName01, variableName02, vx, vy, vz) {
  vx = parseFloat(vx);
  vy = parseFloat(vy);
  vz = parseFloat(vz);
  
  let result = variables[variableName01].cross(variables[variableName02]);
  expect(result.equal(new Vector(vx, vy, vz))).to.be.true;
});

Then(/^(\w+).(\w+) = ([+-]?[0-9]+.?[0-9]*)$/, function(variableName, memberVariableName, float) {
  float = parseFloat(float);

  expect(variables[variableName][memberVariableName]).to.be.equal(float);
});

Then('every pixel of {word} is color\\({float}, {float}, {float}\\)', function (variableName, r, g, b){
    let color = new Color(r, g, b);
    let canvas = variables[variableName];
    let width = canvas.width;
    let height = canvas.height;
    for(let j = 0; j < height; ++j) {
      for(let i = 0; i < width; ++i) {
            let c = canvas.getColorAt(i, j);
            expect(c.equal(color)).to.be.true;
        }
    }
});

When('every pixel of {word} is set to color\\({float}, {float}, {float}\\)', function (variableName, r, g, b) {
  const color = new Color(r, g, b);
  const canvas = variables[variableName];
  const width = canvas.width;
  const height = canvas.height;
  for(let j = 0; j < height; ++j) {
    for(let i = 0; i < width; ++i) {
      canvas.setColorAt(i, j, color);
    }
  }
});

When('write_pixel\\({word}, {float}, {float}, {word}\\)', function (canvasName, x, y, colorVariableName) {
  let canvas = variables[canvasName];
  let color = variables[colorVariableName];
  canvas.setColorAt(x, y, color);
});

Then('pixel_at\\({word}, {float}, {float}\\) = {word}', function (canvasName, x, y, colorVariableName) {
  let canvas = variables[canvasName];
  let color = variables[colorVariableName];
  let checkColor = canvas.getColorAt(x, y);
  expect(color.equal(checkColor)).to.be.true;
});

When('{word} ← canvas_to_ppm\\({word}\\)', function (variableName, canvasName) {
  let canvas = variables[canvasName];
  let pmm = canvas.toPMM();
  variables[variableName] = pmm;
});

Then('lines {int}-{int} of {word} are', function (lineStart, lineEnd, variableName, docString) {
  let pmm = variables[variableName];
  const lines = pmm.split("\n");
  let targetStr = '';

  for(let i = (lineStart - 1); i < lineEnd; ++i)
  {
    if(targetStr.length > 0) {
      targetStr += "\n";
    }
    targetStr += lines[i];
  }
  expect(targetStr).to.be.equal(docString);
});

Then('{word} ends with a newline character', function (variableName) {
  const pmm = variables[variableName];
  expect(pmm[pmm.length-1]).to.be.equal('\n');
});

const fs = require('fs');
When('{word} save to file {word}', function (variableName, fileName) {
  const pmm = variables[variableName];
  fs.writeFile(fileName, pmm, function (err) {
    if (err) return console.log(err);
    // console.log(`ppm file saved to ${fileName}`);
  });
});

Given('the following {int}x{int} matrix {word}:', function (row, column, matrixVarName, dataTable) {
  for(let y = 0; y < dataTable.rawTable.length; ++y)
  {
    for(let x = 0; x < dataTable.rawTable[y].length; ++x)
    {
      dataTable.rawTable[y][x] = parseFloat(dataTable.rawTable[y][x]);
    }
  }
  variables[matrixVarName] = new Matrix(dataTable.rawTable);
});

Then('{word}[{int},{int}] = {float}', function (matrixVarName, row, column, value) {
  const matrix = variables[matrixVarName];
  expect(matrix.getValueAt(row, column)).to.be.equal(value);
});

Given('the following matrix {word}:', function (matrixVarName, dataTable) {
  variables[matrixVarName] = new Matrix(dataTable.rawTable);
});

Then('matrix {word} = {word}', function (matrixVarName01, matrixVarName02) {
  const matrix1 = variables[matrixVarName01];
  const matrix2 = variables[matrixVarName02];
  expect(matrix1.equal(matrix2)).to.be.true;
});

Then('matrix {word} != {word}', function (matrixVarName01, matrixVarName02) {
  const matrix1 = variables[matrixVarName01];
  const matrix2 = variables[matrixVarName02];
  expect(matrix1.equal(matrix2)).to.be.false;
});

Then('{word} * {word} is the following {int}x{int} matrix:', function (matrixVarName01, matrixVarName02, row, column, dataTable) {
  const matrix1 = variables[matrixVarName01];
  const matrix2 = variables[matrixVarName02];
  const result = matrix1.multiply(matrix2);
  expect(result.equal(new Matrix(dataTable.rawTable))).to.be.true;
  return 'pending';
});