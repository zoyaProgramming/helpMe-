import { useState, useEffect } from "react";
export function useLocalFonts(){

  
  const [fonts, setFonts] = useState(null);
  const fontList = {
    "Helvetica" : "sans-serif",
    'Arial' :"sans-serif",
    'Arial Black' :"sans-serif",
    "Verdana" :"sans-serif",
    "Tahoma" :"sans-serif",
    'Trebuchet MS' :"sans-serif",
    "Impact" :"sans-serif",
    'Gill Sans' :"sans-serif",
    "Times New Roman" :"serif",
    "Georgia" :"serif",
    "Palatino" :"serif",
    "Baskerville" :"serif",
    "Andalé Mono" :"monospace",
    "Courier" :"monospace",
    "Lucida" :"monospace",
    "Monaco" :"monospace",
    "Bradley Hand" :"cursive",
    "Brush Script MT" :"cursive",
    "Luminari" :"fantasy",
    "Comic Sans MS" :"cursive"}
  useEffect(() =>{
    async function getFonts(){
      const finalData=[]
      try{
        for (const font in fontList){
          finalData.push(`${font}, ${fontList[font]}`);
        }
        console.log(finalData)
        setFonts(finalData);
  
      }
      catch(e){
        console.log('error getting fonts:');
        console.log(e);
      }
    }
    getFonts();
  }, []);
  return fonts;
}