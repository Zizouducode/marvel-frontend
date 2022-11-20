import "./Character.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";
const Character = ({ character, favorites, setFavorites }) => {
  const { name, description, _id } = character;
  //Check if the comic is already in the favorites to set the state isPresent at the right state
  let bool = false;
  for (let i = 0; i < favorites.length; i++) {
    if (character._id === favorites[i]._id) {
      bool = true;
    }
  }
  const [isPresent, setisPresent] = useState(bool);

  // if (!thumbnail.path.includes("image_not_available")) {
  //Bool to check if the character is present in Fav
  const handleClick = (character) => {
    const newFavorites = [...favorites];
    if (!isPresent) {
      newFavorites.push(character);
      setFavorites(newFavorites);
      setisPresent(true);
      Cookies.set("favorites", JSON.stringify(newFavorites), {
        expires: 7,
      });
    } else {
      for (let i = 0; i < newFavorites.length; i++) {
        if (newFavorites[i]._id === character._id) {
          newFavorites.splice(i, 1);
          setFavorites(newFavorites);
          setisPresent(false);
          Cookies.set("favorites", JSON.stringify(newFavorites), {
            expires: 7,
          });
          break;
        }
      }
    }
    // let cookies = Cookies.get("favorites");
    // // console.log("cookies=>", cookies);
  };

  return (
    <div className="character-container">
      <Link to={`/character/${_id}`}>
        <div className="character-img-container">
          <img
            className="character-img"
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={`super hero : ${name}`}
          />
        </div>
      </Link>
      <div className="character-red-line"></div>
      <div className="character-name-description-container">
        <div className="character-name-icon-container">
          <div className="character-name">{name}</div>
          <FontAwesomeIcon
            className={
              isPresent
                ? "character-heart-icon-red"
                : "character-heart-icon-white"
            }
            icon="fa-heart"
            onClick={() => {
              handleClick(character);
            }}
          />
        </div>

        <div className="character-description">{description}</div>
      </div>
    </div>
  );
  // }
};

export default Character;
