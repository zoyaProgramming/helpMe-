import { useEffect, useReducer, useState } from "react";
const firstData = {
  folders: {}
}

export function dataDispatch(data = firstData, action){
  const clone = {...data};
  switch(action.type){
    case "load_folders":
      return {...action.data};
    case "change_folder_name":
      console.log("new name")
      Object.assign(clone.folders, {[action.new_name]: clone.folders[action.old_name]});
      delete clone.folders[action.old_name];
      console.log(clone)
      return clone;
      break;
    case "add_folder":
      let name = action.folder_name
      if(name == undefined){
        const c = {...data};
        console.log(Object.keys(data));
        name = "untitled" + Object.keys(data.folders).length;
      }
      const dataClone = {...data};
      const foldersClone = {...dataClone.folders}
      foldersClone[name] = action.folder_contents!== undefined?action.folder_contents:{};
      dataClone.folders=foldersClone;
      return dataClone;

      break;
    case "delete_folder":
      delete clone.folders[action.folder_name];
      return clone;
    case "add_note":
      clone.folders[action.folder_name][action.note_title!==undefined?action.note_title:"untitled"]="";
  }

}


export function useLocalStorage(wantedFolder){
  const [data, dispatchData] = useReducer(dataDispatch,{folders: {}});
  useEffect(()=>{
    const folders = localStorage.getItem("folders");
    const finalDict = {}
    function e() {

      if(folders !== null || undefined){
         for (const key in folders[wantedFolder]){
          finalDict[key] = folders[wantedFolder][key];
         }
         for(const key in folders){
          finalDict[key] = folders[key];
         }
      } 
      else{
        finalDict = {folders :  {test: "test1"}}
      }


      dataDispatch({type: "load_folders", data: finalDict});
      // window.removeEventListener("storage", e);
    }
    window.addEventListener("storage",e);
  },[data])
  return [data, dispatchData];
}
export function clickMe(event, data, setData, key, value){
  localStorage.setItem("folders", {"me": "i am lots of text", "x": Math.random()});
  const clone = {...data};
  console.log(setData)
  clone["folders"][key] = value
  setData(clone);
}