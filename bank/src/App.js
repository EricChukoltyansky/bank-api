import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((serverData) => setData(serverData));
  },[]);

  const renderData = () => {
    console.log(data);
    const users = data.map((user) => {
      return (
        <div>
          <p>{user.cash}</p>
          <p>{user.id}</p>
          <p>{user.credit}</p>
        </div>
      );
    });
    return users;
  };

  return <div>{renderData()}</div>;
}

export default App;
