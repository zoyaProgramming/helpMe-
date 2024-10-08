
import { clickMe, useLocalStorage } from "../../customFunctions/useLocalStorage";
import { useState } from "react";






function SelectFolder({selected, name, setSelected, data, dataDispatch, fnc, params}) {
  const [isEditable, setIsEditable]= useState(false);
  const [a, setA] = useState(name);
  if(isEditable){
    return(
      <input className = "bttn--folder "onBlur={(event)=>{
        dataDispatch({type: "change_folder_name", new_name: event.target.value, old_name: name});
        setIsEditable(!isEditable);
      }} value={a} onChange={(event) => {
        setA(event.target.value);
        //dataDispatch({type: "change_folder_name", new_name: event.target.value, old_name: name});
      }}></input >
    )
  }
    return( 
      <button className={  "bttn--folder ".concat((selected===name)?" selected": "")}
        onClick={(event) => {
          setSelected(name);
          if(fnc !== undefined){
            fnc(params);
          }
        }} onDoubleClick={(event)=>{
          setIsEditable(!isEditable);}}>
        {name} 
        <button className="material-symbols-outlined delete-bttn" style={{marginLeft: 'auto', marginRight: '0'}}
        onClick={() => {dataDispatch({type: "delete_folder", folder_name: name})}}
        >delete</button>
      </button>
    )
}
export function Sidebar({selectedFolder, setSelected, data, dispatchData}) {
 // const {data, dispatchData} = useLocalStorage();
  const [visualState, setVisualState] = useState({bttn: ''});
  console.log(typeof data.folders)
  console.log( data.folders)
  console.log(data.folders)
  
  const folders = typeof data.folders=="object"? Object.keys(data.folders).map((key)=>{
    //blabbalsdaf
    return(
      <>
      <SelectFolder name={key} selected={selectedFolder} setSelected={setSelected} data={data} dataDispatch={dispatchData}></SelectFolder>
      </>
    );
  }): "yes";
  return(
    <div className="div--container-resize" onClickCapture={() => {setSelected("")}}>
      <button onClick={() => {setSelected("yes")}}> a</button>
      <span style={{display: 'flex', lineHeight: '4vh', fontSize: '4vh', alignItems: 'center', justifyContent: 'center'}} className="material-symbols-outlined">folder
        <span style= {{fontFamily: 'Times New Roman, serif'}}>new folder</span>  
        <span style={{fontSize: '3vh'}}>add</span>
        </span>
      {folders}
      <button className={"bttn--folder "} onClick={() => {
        dispatchData({type: 'add_folder'});
      }}> add folder</button>
      
    </div>
    
  )
}