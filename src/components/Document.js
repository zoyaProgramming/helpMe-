import { useState } from "react"
import { useStuffHook } from "../customFunctions/blabla";
export function MainDocument({fontOptions, setFontOptions, data, dispatchData}){
  const [changedVal, setChangedVal] = useState("");
  const [tempVal, setTempVal] = useState("");
  const setThing = useStuffHook(tempVal, fontOptions, setTempVal);
  return(
    <>
      <div id="document-main-writing-area" className="document-main-writing-area"  contentEditable="true"
       onChange={(event) => {
        const maxLength = Math.max(event.target.value.length, tempVal.length, changedVal);
        setTempVal(tempVal + event.target.data);
      }}
      onBlur={(event)=>{
        
      }}
      >
      </div>
    </>
  )
}