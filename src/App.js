import logo from './logo.svg';
import './App.css';
import './stylesheets/mainStylesheet.css';
import Header from './reusable/components/Header';
import { MainDocument } from './components/Document';
import { useReducer, useState } from 'react';
import { Sidebar } from './reusable/components/Sidebar';
import { fontReducer } from './customFunctions/fontReducer';
import { useLocalStorage } from './customFunctions/useLocalStorage';
import { Math } from './components/Math';

function App() {
  const [fontOptions, setFontOptions] = useReducer( fontReducer, {fontName: 'Calibri', fontStyle: "", fontSize: '12px'});
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [data, dispatchData] = useLocalStorage();
  //const [fontOptions, setFontOptions] = useState({fontFamily: 'Calibri'});
  return (
    <div className="App">
      <div className="div--side-by-side"> 
        <Sidebar selectedFolder={selectedFolder} setSelected={setSelectedFolder} data={data} dispatchData={dispatchData}/>
      
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh', flexGrow: '1'}}>
          <Header selectedFolder={selectedFolder} fontOptions={fontOptions} setFontOptions={setFontOptions}></Header>
          <body>
            {true?<Math></Math>:<MainDocument selectedFolder={selectedFolder} fontOptions={fontOptions} setFontOptions={setFontOptions}
            data = {data} dispatchData={dispatchData}
            ></MainDocument>}
          </body>
        </div>
      </div>
      
     
    </div>
  );
}

export default App;
