import "./Comic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";

const Comic = ({ comic, favorites, setFavorites }) => {
  const { thumbnail, title } = comic;
  //Check if the comic is already in the favorites to set the state isPresent at the right state
  let bool = false;
  for (let i = 0; i < favorites.length; i++) {
    if (comic._id === favorites[i]._id) {
      bool = true;
    }
  }
  const [isPresent, setisPresent] = useState(bool);
  const handleClick = (comic) => {
    const newFavorites = [...favorites];
    if (!isPresent) {
      newFavorites.push(comic);
      setFavorites(newFavorites);
      setisPresent(true);
      Cookies.set("favorites", JSON.stringify(newFavorites), {
        expires: 7,
      });
    } else {
      for (let i = 0; i < newFavorites.length; i++) {
        if (newFavorites[i]._id === comic._id) {
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
    let cookies = Cookies.get("favorites");
    console.log("cookies=>", cookies);
  };
  // console.log("comic=>", comic);
  // if (!thumbnail.path.includes("image_not_available")) {
  return (
    <div className="comic-container">
      <div className="comic-img-container">
        <img
          className="comic-img"
          src={thumbnail.path + "." + thumbnail.extension}
          alt={`comic title : ${title}`}
        />
      </div>

      <div className="comic-title comic-title-heart-container">
        <p>{comic.title}</p>
        <FontAwesomeIcon
          className={
            isPresent ? "comic-heart-icon-red" : "comic-heart-icon-white"
          }
          icon="fa-heart"
          onClick={() => {
            handleClick(comic);
          }}
        />
      </div>
    </div>
  );
  // }
};

export default Comic;
