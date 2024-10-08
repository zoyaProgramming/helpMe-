import { useState } from "react";
import { useLocalFonts } from "../../customFunctions/useLocalFontsHook"

export function Select(){
  const [isOpen, setOpen]=useState(false);
  return(
    <button onClick={()=>{setOpen(!isOpen)}}>select</button>
  );
}
export default function Header({fontOptions, setFontOptions}){
  const systemFonts= useLocalFonts();
  const [mainFonts, setFont] = useState('Calibri');
  
  if(!Array.isArray(systemFonts)){
    return(
      <p>loading fonts....</p>
    )
  }
  const fontsMapped = systemFonts.map((font)=>{
    return(
        <option style={{fontFamily: "Calibri"}}>{font}</option>
    );
  });
  return(
    <header className="div--top-header-main">
      <div className="navbar-horizontal">
        <a>home</a>
        <a>insert</a>
        <a>view</a>
      </div>
      <h1>notes</h1>
      <div className="textOptions">
        <text>fonts:</text>
        <select defaultChecked={true} onChange={(event) => {setFontOptions({
          type:'fontName', value: event.target.value}); console.log(event.target.value)}}>
          {fontsMapped}
        </select>

        <text>size</text>
        <select>
          <option>12px</option>
        </select>
        <div style={{display: "flex", flexDirection: 'row', gap: '1vw', width: "fit-content", margin: "auto", paddingTop: '1vh'}}>
          <button className="button--only-text"
          onClick={()=>{
            setFontOptions({type: 'fontStyle', value: 'bold'})}}><b>b</b></button>
          <button className="button--only-text" onClick={() => {
            setFontOptions({type: 'fontStyle', value: 'italic'})
          }}><i>i</i></button>
          <button className="button--only-text" style={{textDecoration: "underline"}}
          onClick={() => {setFontOptions({type: 'fontStyle', value: 'underline'})}}>u</button>
        </div>
        
    
      </div>
    </header>
  )
}