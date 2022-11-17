import "./App.css";
import Header from "./components/Header/Header";
//Import routing system and react
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
//Imports Components and pages
import Characters from "./pages/Characters/Characters";
import CharacterComics from "./pages/CharcterComics/CharacterComics";
import Comics from "./pages/Comics/Comics";
//Import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  //state for the search bar
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={<Characters search={search} setSearch={setSearch} />}
          ></Route>
          <Route path="/character/:id" element={<CharacterComics />} />
          <Route
            path="/comics"
            element={<Comics search={search} setSearch={setSearch} />}
          ></Route>
          <Route path="/myfavorites"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
