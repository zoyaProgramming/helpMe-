import { useRef, useState } from "react";
import '../stylesheets/mathStylesheet.css'
export function Math1(){
  const [mathValue, setMathValue] = useState(null);
  const separateTerms = new Tree();
  separateTerms.root= new Node(0);
  const parsedVersion = parseMath(mathValue, separateTerms);
  const canvasRef = useRef(null);
  //console.log(canvasRef)
  /*const myTree = new Tree();
  const myNode = new Node(0);
  myTree.root = myNode;
  const nodes = [myNode.add(1), myNode.add(2), myNode.add(3), myNode.add(4), myNode.add(5)];*/
 // console.log(nodes)
  /*for(const i of nodes){
    const x = [i.add(1),i.add(2),i.add(3),i.add(4),i.add(5)];
    for(const l of x){
      l.add(1)
      l.add(2)
      l.add(1)
    }
    
    
  }*/
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
    <canvas ref={canvasRef} width={1000} height={1000} onChange={()=>{}}></canvas>
    </>
  )
}

function parseMath(input1, parentTree){
  // Creates a tree which contains all of the "terms" of the expression added together
  // Each term is its own "tree" which contains its factors
  // Ideally, the deepest parts of the tree will be the parts of the expression the user sees
  // WIP 
  let input = input1;
  if(input==null){
    return parentTree;
  }
  // cleans up the input
  input = input.replaceAll(/\s/g,""); 
  input = input.replaceAll(/(?<![-+/*])\(/g, "\* \(");
  const parenthesesMatches = [...input.matchAll(/\((.*)\)/g)];
  let parenthesesArray  = [];
  if(parenthesesMatches.length>=1){
    let i = 0;
    parenthesesArray = parenthesesMatches.map((val)=>{
      input = input.replace(val[0],"replaced" + i);
      i = i+1;
      const parenthesesTree = new Tree();
      const parenthesesNode = new Node();
      parenthesesTree.root=parenthesesNode;
      return (val.length>1?parseMath(val[1]):null, parenthesesTree);
    })
  }
  const exponentMatches = [...input.matchAll(/([A-z0-9]*?)\^([0-9A-z]+)/g)];
  let exponentArray = [];
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
            myTreeOrder[i] = parenthesesArray[i];

          }}
        const newNode = new Node({base: myTreeOrder[0], exponent: myTreeOrder[1]});
        exponentArray[i] = newNode;
        i++;
        input = input.replace(val[0],"exponent" + i);
        return null;
        
      }
    })
  }

  /// Multiplication and Dvision
  const multDivArray = [];
  const multiplicationDivisionMatches = [...input.matchAll(/([A-z0-9]+)([\*\/])([a-z0-9]+)*?/g)];
  if(multiplicationDivisionMatches.length >= 1){
    let i = 0;
      multiplicationDivisionMatches.map((val)=>{
        if(val.length>=4){
          const alreadyChecked = [...val[0].matchAll(/(replaced|exponent)([0-9]+)/g)]
          // Finds all o the matches that have been checked
          // This way, if there's a factor that's in parentheses/has an exponent
          // it is still added to the tree
          //TODO: The factors in parenthesis are added to the tree twice
          // because they are added in the multiplication division matches AND
          // the alreadyChecked
          const multTree = new Tree();
          const multNode = new Node(val);
          multTree.root = multNode;
          if(alreadyChecked.length>0)  {
            for(let m in alreadyChecked){ // obviously all the already parsed
             // for(let k = 2; k< m.length; k++){ // checks  both the word and the number  
              const replacedValue = m[2];
              const d = parseInt(replacedValue);
              switch (m[1]){
                case "replaced":
                  multNode.add(parenthesesArray[d]);
                case "exponent":
                  multNode.add(exponentArray[d]);
              }
            //  }
            }
          }
          for(let j = 0; j< val.length; j++){
              multNode.add(new Node(val[j]));
          }
          multDivArray[i] = multTree;
          input = input.replace(val[0],"mult" + i);
          i++;
        return null;
        }
      })
  }
// doing this again
  const alreadyChecked = [input.matchAll(/(replaced|exponent|mult)([0-9]+)/g)]
  if(alreadyChecked.length>0){
    for(let m in alreadyChecked){
      switch(m[1]){
        case "replaced":
          parentTree.root.add(parenthesesArray[m[2]])
          break;
        case "exponent":
          parentTree.root.add(exponentArray[m[2]])
          break;
        case "mult":
          parentTree.root.add(multDivArray[m[2]])
          break;
      }
      input = input.replace(m[0], "");
    }
  }
  input = input.replaceAll(/(?<=[+-/*])[+-/*]/g, "").replaceAll(/[+-/*](?=[+-/*])/g,"");
  console.log(input)
  
  // todo: Should fix subtraction and division


  const additionSubtractionMatches = [...input.matchAll(/([A-z0-9]*?)([\+\-])([0-9A-z]+)/g)];
  additionSubtractionMatches.map((match) =>{
    parentTree.root.add(match[1]);
    const integerValue = parseInt(match[2]=="-"?"-"+match[3].match(/[0-9]+/g)[1]:match[3]);
    parentTree.root.add(match[3]);
  })
  
  

  //finalResult = finalResult.concat(parenthesesArray, exponentArray, multDivArray);
  //finalResult[finalResult.length] = <>{input}</>
  //console.log(finalResult)
  console.log(exponentArray)

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