import React, { useEffect } from "react";
import { useState} from "react";
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState("");
  const [response, setResponse] = useState([]);
  const [fact, setFact] = useState();
useEffect(()=>{
  axios.get('https://catfact.ninja/fact')
  .then(response=>{
            console.log(response);
            console.log(response.data);
            console.log(response.data.fact);
            setFact(response.data.fact);
        })
},[]);

//fetchImageRequest  function will get the images from the api and store those values in the response state  
  const fetchImageRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${image}&client_id=PNRP0FIbuNLJ51f9XpGQXUdoLUVKBHfIoSMTJfGu-_k&per_page=9`
    );
    const dataJSON = await data.json();
    const result = dataJSON.results;
    console.log(result);
    setResponse(result);
  };


  //Once the submit button is clicked, Submit function will call the fetchImageRequest  function
   const Submit = () => {
    fetchImageRequest();
    setImage("");
    console.log("search");
  }


  return (
    <>
      <div align="center">
            <input
              type="text"
              placeholder="...Search Images..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button
              type="submit"
              onClick={Submit}
            >
              Search
            </button>
      </div>
{fact}
      <div>
        {response.map((val) => {
          return (
            <img  key={val.id} src={val.urls.small}/>
          );
        })}
      </div>;
    </>
  );
};
export default App;