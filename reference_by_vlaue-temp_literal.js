
let pershendetje = ["Hi", "Hello"];
let pershendetjeSq = ["Ckemi", "Pershendetje"];
//test references value of pershendetje (memory add of pershendetje)
let test = pershendetje;
//every change to test will be reflected in pershendetje dhe vice-versa
pershendetje.push("hjello");

console.log(pershendetje);
console.log(test);
//template literal
console.log(`This is a template literal: ${pershendetjeSq[0]}`)


let test2 = [];
for(i=0;i<=1;i++){
    test2[i] = pershendetjeSq[i];
}
test2.push("c'a ban e la")

console.log(pershendetjeSq);
console.log(test2)



