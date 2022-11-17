//Import
import "./Characters.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Character from "../../components/Character/Character";
import SearchBar from "../../components/SearchBar/SearchBar";

const Characters = ({ search, setSearch }) => {
  //State to store the data from the backend
  const [data, setdata] = useState(null);
  //State to notify when the data is received
  const [isLoading, setIsLoading] = useState(true);

  //UseEffect required to fecth the data when to component is mount
  useEffect(() => {
    const fetchData = async () => {
      //Request to get the data from the backend
      try {
        const response = await axios.get("http://localhost:4000/characters", {
          params: {
            name: search,
          },
        });
        console.log("search=>", search);
        if (response.data) {
          //store the response in the state Data
          setdata(response.data);
          //change bool isLoading to true
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // console.log("data=>", data);
  }, [search]);
  return (
    <div>
      {isLoading ? (
        <p>waiting for data</p>
      ) : (
        <div className="container">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="container characters-container">
            {data.results.map((character) => {
              if (!character.thumbnail.path.includes("image_not_available")) {
                return <Character key={character._id} character={character} />;
              } else return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
