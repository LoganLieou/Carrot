import './App.css';

import React, { useCallback, useState } from "react";
// Import the dropzone component
import Dropzone from "./Dropzone";
import Prediction from './Prediction';

import "./App.css";

function App() {

   const [uploaded, setUploaded] = useState(false);
   const [pred, setPred] = useState([]);

   // onDrop function  
   const onDrop = useCallback(acceptedFiles => {
      // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
      console.log(acceptedFiles);

      // create form data
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      // send a synchronus POST request
      /*
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/upload");
      let res = xhr.send(formData);
      */

      // send asynchronus post request
      fetch("https://6c30-2600-1700-1682-4a50-00-2e.ngrok.io/upload", {
         method: "POST",
         body: formData
      })
      .then(res => res.text())
      .then(dat => setPred(dat))
      .then(_ => setUploaded(true))
      .catch(e => console.log(e));
   },[]);

   // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
   return (
      <main className="App">
         {uploaded ? (
            <Prediction pred={pred}/>
         ) : (
            <div>
               <h1>Drag CAPTCHA Image Here</h1>
               <Dropzone onDrop={onDrop}/>
            </div>
         )}
      </main>
   );
}

export default App;
