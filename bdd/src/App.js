import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  const getBDD = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8000'
    }).then(res => {
      console.log(res);
      setData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getBDD()
  }, [])

  return (
    <div>
      <h1>Base de Données</h1>
      <ul>
        {data.map((post) => (
         <p>{post}</p>
        ))}
      </ul>
    </div>
  );
}

export default App;
