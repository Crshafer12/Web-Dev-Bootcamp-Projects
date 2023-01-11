const superheroes = require("superheroes");
superheroes.all;
var mySuperheroName = superheroes.random();

const supervillains = require("supervillains");
supervillains.all;
var mySupervillainName = supervillains.random();

console.log(mySuperheroName);
console.log("vs.");
console.log(mySupervillainName);
