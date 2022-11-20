import "./App.css";
import Header from "./components/Header/Header";
//Import routing system and react
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
//Imports Components and pages
import Characters from "./pages/Characters/Characters";
import CharacterComics from "./pages/CharcterComics/CharacterComics";
import Comics from "./pages/Comics/Comics";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
//Import Cookies
import Cookies from "js-cookie";
//Import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
library.add(faMagnifyingGlass, faHeart);

function App() {
  //state for the search bar
  const [search, setSearch] = useState("");
  //state for the fav
  const [favorites, setFavorites] = useState(
    Cookies.get("favorites") ? JSON.parse(Cookies.get("favorites")) : []
  );
  //State for the token
  const [token, setToken] = useState(Cookies.get("token") || null);

  //Function to handle the token
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          favorites={favorites}
        ></Header>
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                search={search}
                setSearch={setSearch}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          ></Route>
          <Route
            path="/character/:id"
            element={
              <CharacterComics
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                search={search}
                setSearch={setSearch}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          ></Route>
          <Route
            path="/myfavorites"
            element={
              <MyFavorites
                favorites={favorites}
                setFavorites={setFavorites}
                token={token}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          ></Route>
          <Route
            path="/login"
            element={<Login handleToken={handleToken} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
