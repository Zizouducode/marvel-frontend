import Character from "../../components/Character/Character";
import Comic from "../../components/Comic/Comic";
import "./MyFavorites.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const MyFavorites = ({ favorites, setFavorites, token }) => {
  let boolCharacter = false;
  let boolComic = false;
  const [characInFav, setCharacInFav] = useState(boolCharacter);
  const [comicInFav, setComicInFav] = useState(boolComic);
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].name) {
      boolCharacter = true;
    } else if (favorites[i].title) {
      boolComic = true;
    }
  }

  useEffect(() => {
    setCharacInFav(boolCharacter);
    setComicInFav(boolComic);
  }, [boolCharacter, boolComic]);

  return token ? (
    <div className="container">
      <>
        {!characInFav && !comicInFav ? (
          <div>
            <h2 className="my-favorites-h2">
              You don't have any Super Hero or Comic in your fav
            </h2>
          </div>
        ) : (
          <div></div>
        )}
      </>
      {characInFav ? (
        <div>
          <div className="my-favorites-h2-container">
            <h2 className="my-favorites-h2">My Favorites Characters</h2>
          </div>
          <div className="my-favorites-container">
            {favorites.map((favorite) => {
              if (favorite.name) {
                return (
                  <Character
                    key={favorite._id}
                    character={favorite}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                );
              } else return null;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <>
        {comicInFav ? (
          <div>
            <div className="my-favorites-h2-container">
              <h2 className="my-favorites-h2">My Favorites Comics</h2>
            </div>
            <div className="my-favorites-container">
              {favorites.map((favorite) => {
                if (favorite.title) {
                  return (
                    <Comic
                      key={favorite._id}
                      comic={favorite}
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                  );
                } else return null;
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default MyFavorites;
