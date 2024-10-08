import { useState } from "react";
import '../stylesheets/mathStylesheet.css'
export function Math(){
  const [mathValue, setMathValue] = useState(null);
  const parsedVersion = parseMath(mathValue);
  const parseExp = mathValue!==null&&mathValue.length>1?parseExpression(mathValue):null;
  
  return(
    <>
    <div>
      <input onChange={(event)=>{
        setMathValue(event.target.value);
      }}></input>
      <p>{parseExp}</p>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
      {parsedVersion}
      
      </div>
    </div>
    </>
  )
}

function parseMath(input1){
  let input = input1;
  if(input==null){
    return "";
  }

  const parenthesesMatches = [...input.matchAll(/\((.*)\)/g)];
  let myArray  = [];
  if(parenthesesMatches.length>=1){
    let i = 0;
    myArray = parenthesesMatches.map((val)=>{
      input = input.replace(val[0],"replaced" + i);
      i = i+1;
      return (val.length>1?parseMath(val[1]):null);
      
    })
  }
  
  const exponentMatches = [...input.matchAll(/([A-z0-9]*?)\^([0-9]+)/g)];
  let myResult = [];
  if(exponentMatches.length>=1){
    let i = 0;
    exponentMatches.map((val) => {
      if(val.length>2){
        if(val[1].match(/replaced[0-9]+/g)!=null){ 

          // doesn't have support for parenthesis in the exponent
          const d = parseInt(val[1].match(/[0-9]+/g)[0]);
        //  const firstHalfOfArraySplit = myArray.slice(0, d);
       //   const secondHalfOfArraySplit = myArray.slice(d, myArray.length);
          const myExponent = <span className="exponent--power">{val[2]}</span>
          myArray[d] = <>{myArray[d]}{myExponent}</>
          //myArray=firstHalfOfArraySplit.concat(myExponent, secondHalfOfArraySplit);
        } else {
          input = input.replace(val[0],"exponent" + i);
          //const firstHalfOfArraySplit = myArray.slice(0, i);
         // const secondHalfOfArraySplit = myArray.slice(i, myArray.length);
          const myExponent = <><span className="exponent--base">{val[1]}</span><span className="exponent--power">{val[2]}</span></>
          myResult[i] = myExponent;
          i = i + 1;
          //myArray=firstHalfOfArraySplit.concat(myExponent, secondHalfOfArraySplit);
        }
        
      }
    })
  }
  const myTerms = [];
  const multiplicationDivisionMatches = [...input.matchAll(/([A-z0-9]+)([\*\/])([a-z0-9]+)/g)];
  console.log(input)
  if(multiplicationDivisionMatches.length >= 1){
    console.log('yessss');
    let i = 0;
  
      multiplicationDivisionMatches.map((val)=>{
        console.log(val)
        if(val.length>=4){
          console.log(val[3])
          const stringVal3 = val[3]
          if(stringVal3.match(/replaced[0-9]+/g)){
            const myIndex = parseInt(stringVal3.match(/[0-9]*/g));
            const myBestie = myArray[myIndex];
            const myNewVersion = <><span>{val[3]}</span><span>{val[2]}</span>{myBestie}</>
            myArray[myIndex] = myNewVersion;
          } else if(stringVal3.match(/exponent[0-9]+/g)){
            const myIndex = parseInt(stringVal3.match(/[0-9]/g)[0]);
            const myBestie = myResult[myIndex];
            myResult[myIndex] = <><span className="term">{val[1]}</span><span>{val[2]}</span>{myBestie}</>

          } else{
            input = input.replace(val[0], val[2]==="*"?"mult":"div" + i);
            myTerms[i] = <><span className="term">{val[1]}</span><span>{val[2]}</span><span className="term">{val[3]}</span></>

            i+=1;
          }

        }
        /**/
      })
  }


  const additionSubtractionMatches = [...input.matchAll(/([A-z0-9]*?)([\+\-])([0-9A-z]+)/g)];
  input =input.replace(/(replaced|exponent|mult|div)([0-9])?/g, "");
  console.log(input)
  let firstTermExists = input.match(/.*/g);
  let constantsAndExes = [...input.matchAll(/[-0-9A-z]+/g)];
  console.log(constantsAndExes)
  let finalResult = [];
  finalResult = constantsAndExes.map((constant) => {
    console.log(constant[0])
    return(<span className="term">{constant[0]}</span>)
  })

  console.log(firstTermExists)
  
  

  finalResult = finalResult.concat(myArray, myResult, myTerms);
  finalResult= finalResult.map((thing) =>{
    return(
    <>
    {thing}
    <span className="term">+</span>
    </>)

  })
  //finalResult[finalResult.length] = <>{input}</>
  console.log(finalResult)
  console.log(myResult)
  return finalResult;
}

  

function parseExpression(input) {
  let tokens = null
  tokens = tokenize(input);
  function factor(index){
    // handles numbers and parentheses
    if(tokens[index] === '('){ 
      index +=1;
      let [result, index1] = expr(index);
      index = index1;
      index += 1;
      return[result, index]

    } else{ // the first token should be in this category
      let num = tokens[index]; // it will find the value of the token
      index += 1;
      return [num, index]; // it will return the number and its index
    }

  }
  function term(index){
    // handles multiplication and division
    let [left, index1] = factor(index);
    index=index1;
    const myRegex = new RegExp(/[/*]/, 'g');
    while(index < tokens.length && myRegex.test(tokens[index])){
      let operator = tokens[index];
      index += 1;
      let [right, index2] = factor(index);
      index = index2;
      left = `\(${left} ${operator} ${right}\)`;
    }
    return [left, index]


  }
  function expr(index){
    //
    // handles addition and subtraction
    let [left, index2] = term(index);// index starts at 0, so it should call term of 
    index=index2;
    const myRegex = new RegExp(/[+-]/, 'g');
    while(index<tokens.length && myRegex.test(tokens[index])){
      let operator = tokens[index];
      index += 1;
      let [right, index1] = term(index); // 
      index=index1;
      left = `\(${left} ${operator} ${right}\)`; // 
    }
    return [left, index];

  }
  
  let [result, $] = expr(0);
  console.log(result)
  return result;

}
function tokenize(input){
  input = input.replace(' ', "").replace("(", " ( ").replace(")", " ) ").split()
  return input;
}

// I love hot chips
class Node{
  constructor(data){
    this.data = data;
    this.children  = [];

  }
  add(data){
    this.children.push(new Node(data));
  }
  remove(data){
    this.children = this.children.filter((node) => {
      return node.data !== data; // removes all the children where the data is equal to the data
    })
  }
}

class Tree{
  constructor(){
    this.root = null;
  }
  traverseBF(fn){
    const arr = [this.root];
    while(arr.length){
      const node = arr.shift();
      arr.push(...node.children);
      fn(node);
    }
  }
  traverseDF(fn){
    const arr = [this.root];
    while(arr.length){
      const node = arr.shift();
      arr.unshift(...node.children);
      fn(node);
    }
  }
}