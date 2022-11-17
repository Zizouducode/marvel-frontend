import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Character from "../../components/Character/Character";
import "./CharacterComics.css";
import ComicsByCharacter from "../../components/ComicsByCharacter/ComicsByCharacter";

const CharacterComics = () => {
  //Get the id of the character from the params
  const { id } = useParams();

  //State to store the data received from the backend
  const [data, setData] = useState();

  //State to notify when the data is received
  const [isLoading, setisLoading] = useState(true);

  //UseEffect required to fetch the data when the component is mount
  useEffect(() => {
    const fetchData = async () => {
      //Request to get the data from the backend
      try {
        const response = await axios.get(
          `http://localhost:4000/character/${id}`,
          {
            params: {
              characterId: id,
            },
          }
        );
        if (response.status === 200) {
          //store the response in the state Date
          setData(response.data);
          //change bool isLoading to false
          setisLoading(false);
        }
        // console.log("response=>", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p>waiting for data</p>
      ) : (
        <div className=" container character-comics-container">
          <Character character={data} />
          <div>
            <h2 className="character-comics-h2">
              Find <span>{data.name}</span> in :
            </h2>
            <ComicsByCharacter data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterComics;
