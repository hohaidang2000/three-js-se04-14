"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ok = ok;

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");

function ok(url) {
  function LoadModel(url) {
    return new Promise(function (resolve) {
      new _GLTFLoader.GLTFLoader().load(url, resolve);
    });
  }

  var parrot;
  var lo = LoadModel(url).then(function (result) {
    console.log(result.scene.children[0]);
    parrot = result.scene.children[0];
    return {
      parrot: parrot
    };
  }); //var parrot = loadModel(url).then(result => {  parrot = result.scene.children[0]; });
  //console.log(lo);
  //return {lo};
}