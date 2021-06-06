import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [name, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [favLang, setFavLang] = useState("");
  const [error, seterror] = useState(null);

  return (
    <div>
      <h1>Hi rafa</h1>
    </div>
  );
}

export default App;
