//Imports
import "./ComicsByCharacter.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Comic from "../Comic/Comic";

const ComicsByCharacter = ({ data, favorites, setFavorites }) => {
  //   console.log("data=>", data);
  const { _id } = data;
  //   console.log("_id=>", _id);
  //State to store the comics
  const [comics, setComics] = useState();
  //State to notify when the data is reiceved
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //For to make the number of request based on the number of comics
      try {
        const response = await axios.get(
          `https://site--backend-marvel--nfqr62d7mh6n.code.run/comics/${_id}`,
          {
            params: {
              characterId: _id,
            },
          }
        );
        if (response.status === 200) {
          //store data in the state data
          setComics(response.data);
          //change state isLoading to false
          setIsLoading(false);
          // console.log("response.data=>", response.data);
          console.log("response.data=>", response.data);
          console.log("comics.length=>", comics.comic.length);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [_id]);

  return (
    <div>
      {isLoading ? (
        <p>waiting for data</p>
      ) : comics.comics.length > 0 ? (
        <div className="comics-by-character-comics-container">
          {comics.comics.map((comic, index) => {
            if (!comic.thumbnail.path.includes("image_not_available")) {
              return (
                <div
                  key={index}
                  className="comics-by-character-comic-container"
                >
                  <Comic
                    comic={comic}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                </div>
              );
            } else return null;
          })}
        </div>
      ) : (
        <div>
          There is no comic with {comics.name} existing in our DataBase{" "}
        </div>
      )}
    </div>
  );
};

export default ComicsByCharacter;
