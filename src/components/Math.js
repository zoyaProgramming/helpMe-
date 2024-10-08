import { useRef, useState } from "react";
import '../stylesheets/mathStylesheet.css'
export function Math1(){
  const [mathValue, setMathValue] = useState(null);
  const separateTerms = new Tree();
  separateTerms.root= new Node(0);
  const parsedVersion = parseMath(mathValue, separateTerms);
  const canvasRef = useRef(null);
  //console.log(canvasRef)
  const myTree = new Tree();
  const myNode = new Node(0);
  myTree.root = myNode;
  const nodes = [myNode.add(1), myNode.add(2), myNode.add(3), myNode.add(4), myNode.add(5)];
 // console.log(nodes)
  for(const i of nodes){
    const x = [i.add(1),i.add(2),i.add(3),i.add(4),i.add(5)];
    for(const l of x){
      l.add(1)
      l.add(2)
      l.add(1)
    }
    
    
  }
  //const visualized = myTree.visualize(canvasRef);
 
  return(
    <>
    <button onClick = {() => {parsedVersion.visualize(canvasRef)}}> visula</button>
    <div>
      <input onChange={(event)=>{
        setMathValue(event.target.value);
      }}></input>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
   
      </div>
    </div>
    <canvas ref={canvasRef} width={1000} height={1000} onChange={()=>{myTree.visualize(canvasRef)}}></canvas>
    </>
  )
}

function parseMath(input1, parentTree){
  let input = input1;
  if(input==null){
    return parentTree;
  }

  input = input.replaceAll(/\s/g,"");
  input = input.replaceAll(/(?<![-+/*])\(/g, "\* \(");
  
  // ok so we're breaking it down into trees huh
  // one tree for multiplication
  

  const parenthesesMatches = [...input.matchAll(/\((.*)\)/g)];
  let myArray  = [];
  if(parenthesesMatches.length>=1){
    let i = 0;
    myArray = parenthesesMatches.map((val)=>{
      input = input.replace(val[0],"replaced" + i);
      i = i+1;
      const parenthesesTree = new Tree();
      const parenthesesNode = new Node();
      parenthesesTree.root=parenthesesNode;
      return (val.length>1?parseMath(val[1]):null, parenthesesTree);
    })
  }

  
  const exponentMatches = [...input.matchAll(/([A-z0-9]*?)\^([0-9A-z]+)/g)];
  let myResult = [];
  if(exponentMatches.length>=1){
    let i = 0;
    exponentMatches.map((val) => {

      if(val.length>2){
        const parenthesesReplacedMatches = [...val[0].matchAll(/(?<=replaced)([0-9]+)/g)]
        const myTreeOrder = [val[1], val[2]];
        if(parenthesesReplacedMatches.length>0){
          for(let i = 1; i< parenthesesReplacedMatches.length; i++){
            const replacedValue = parenthesesReplacedMatches[i];
            const d = parseInt(replacedValue);
            myTreeOrder[i] = myArray[i];

          }}
        const newNode = new Node({base: myTreeOrder[0], exponent: myTreeOrder[1]});
        myResult[i] = newNode;
        i++;
        input = input.replace(val[0],"exponent" + i);
        return null;

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

  ///
  const myTerms = [];
  const multiplicationDivisionMatches = [...input.matchAll(/([A-z0-9]+)([\*\/])([a-z0-9]+)*?/g)];
  //console.log(input)
  if(multiplicationDivisionMatches.length >= 1){
   // console.log('yessss');
    let i = 0;
      multiplicationDivisionMatches.map((val)=>{
        console.log(val)
        if(val.length>=4){
          console.log(val[3])
          const stringVal3 = val[3]
          const parenthesesReplacedMatches = [...val[0].matchAll(/(replaced|exponent)([0-9]+)/g)]
          
          const multTree = new Tree();
          const multNode = new Node(val);
          multTree.root = multNode;
          let dontUse = [];
          if(parenthesesReplacedMatches.length>0)  {
            let j = 0;
          
            for(let m in parenthesesReplacedMatches){
              for(let k = 2; k< m.length; k++){
                const replacedValue = m[k];
                const d = parseInt(replacedValue);
                switch (m[1]){
                  case "replaced":
                    multNode.add(myArray[d]);
                  case "exponent":
                    multNode.add(myResult[d]);
                }
                j++;
              //  myTreeOrder[k] = parenthesesMatches;
              }
              j++;
            }
          }
          for(let j = 0; j< val.length; j++){
              multNode.add(new Node(val[j]));
          }
          myTerms[i] = multTree;
       /* const newNode = new Node({base: myTreeOrder[0], exponent: myTreeOrder[1]});
        myTerms[i] = newNode;*/
          input = input.replace(val[0],"mult" + i);
          i++;
          

        // revision
        return null;

          return null;
          // deprecated
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
    parentTree.root.add(thing);

  })
  //finalResult[finalResult.length] = <>{input}</>
  console.log(finalResult)
  console.log(myResult)

  return parentTree;
}

  
// I love hot chips
class Node{
  constructor(data){
    this.data = data;
    this.children  = [];

  }
  add(data){
    const myNode = new Node(data);
    this.children.push(myNode);
    console.log(typeof myNode)
    return myNode;
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
  visualize( canvasRef){
    //console.log( canvasRef)
    
    const arr = [this.root];
    let initialLength = arr.length;
    let initialIndex = 0;
    let lvl = 0;
    let i = 0;
    let len = 1;
    let prevMaxX = 0;
    while(arr.length){
      const node = arr.shift();
       
      // the first time the children are pushed;
      if(i==initialLength){
       // console.log("increase" + (len))
        prevMaxX = initialLength-initialIndex;
        initialIndex = initialLength;// the starting value of this tree level
        initialLength = len; 
        lvl++;
      }
      //console.log(i)
      this.visualizeFunction(canvasRef, lvl, i - initialIndex, initialLength-initialIndex, prevMaxX, node.data);
      len = arr.push(...node.children) + i +1 ;
      i++;

    }
    
    return canvasRef;
  }
  visualizeFunction(canvas, y, x, maxX, prevMaxX, node){
    // maxX is the number of data points on the current line
    //console.log(canvas.current)
    if(canvas.current && canvas.current.getContext){
      //console.log("yippe")
      const context = canvas.current.getContext("2d");
      context.beginPath();
     // context.fillStyle= "red";
      context.strokeStyle = y==1? "red":(y==3)?"green":"blue";
      
      //context.fillRect(10, 10, 1000, 1000)
      //0 : 1 option
      //
      // 1: 3 options
      let width = 25;
      let height = 500;
      
      let y1 = (y*height);
      const lengths = 
      [[30, 30, 30],
      [30, 30, 30],
      [30, 30, 30]

      ]

      //let x1 = x%2==1?(x*50)-(x*50):(x*50)+(x*50);



      let x2 = Math.floor(x/(maxX/prevMaxX) - Math.floor(prevMaxX/2))*width;
  
       // console.log(x + "   " + y +  "    "  + maxX )
         let x1 = (x-  Math.floor(maxX/2))*width;

         let firstY = (1 -Math.pow(2, (-1) * (y-1))) * height;
         let secondY = firstY + Math.pow(2,(-1) * (y))*height;
    context.font = "14px sans-serif";
  
         context.moveTo(x2 + 100, /*(y-1) * height*/ firstY);
     // context.lineTo(100, 100);

      
      context.lineTo(x1 + 100, secondY);

      context.fillText(node,x1 + 100, secondY);
      context.stroke()
    } else{
     // console.log("woops")
    }
      
    
  }

}