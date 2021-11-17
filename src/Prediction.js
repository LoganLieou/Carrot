import "./App.css";

export default function Prediction(props) {
   return (
      <div>
         <h1>Predicted Value</h1>
         <hr className="sep"/>
         <p>{props.pred}</p>
      </div>
   )
}
