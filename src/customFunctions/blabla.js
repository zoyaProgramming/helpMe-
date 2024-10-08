import { useEffect, useState } from "react";

export function useStuffHook(originalValue, stateOfOtherThingThatIForgot, setOriginalValue) {
  console.log(stateOfOtherThingThatIForgot)
  useEffect(() => {
    document.getElementById("document-main-writing-area").focus();
    switch(stateOfOtherThingThatIForgot.fontStyle){
      case 'bold_false':
      case 'bold':
        document.execCommand('bold');
        break;
      
      case 'italic_false':  
      case 'italic':
        document.execCommand('italic');
        break;
      case 'underline_false':
      case 'underline': 
        document.execCommand('underline');
        break;
    }
  }, [stateOfOtherThingThatIForgot.fontStyle]);
  useEffect(()=>{
    document.execCommand('fontName', stateOfOtherThingThatIForgot.fontName);
  }, [stateOfOtherThingThatIForgot.fontName]);
  useEffect(() => {
    document.execCommand('fontSize', stateOfOtherThingThatIForgot.fontSize);
  }, [stateOfOtherThingThatIForgot.fontSize]);
  

}