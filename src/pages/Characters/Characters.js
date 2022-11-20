//Import
import "./Characters.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Character from "../../components/Character/Character";
import SearchBar from "../../components/SearchBar/SearchBar";
import Paginate from "../../components/Paginate/Paginate";

const Characters = ({ search, setSearch, favorites, setFavorites }) => {
  //State to store the data from the backend
  const [data, setdata] = useState(null);
  //State to notify when the data is received
  const [isLoading, setIsLoading] = useState(true);
  //State for the paginate component
  const [activePageCharacters, setActivePageCharacters] = useState(1);
  const limit = 100;
  let skip = (activePageCharacters - 1) * limit;

  //UseEffect required to fecth the data when to component is mount
  useEffect(() => {
    //scroll to the top (for the pagination)
    window.scrollTo(0, 0);
    const fetchData = async () => {
      //Request to get the data from the backend
      try {
        const response = await axios.get("http://localhost:4000/characters", {
          params: {
            name: search,
            skip: skip,
            limit: limit,
          },
        });
        // console.log("search=>", search);
        if (response.data) {
          //store the response in the state Data
          setdata(response.data);
          //change bool isLoading to true
          setIsLoading(false);
        }
        // console.log("data=>", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, skip]);
  return (
    <div>
      {isLoading ? (
        <p>waiting for data</p>
      ) : (
        <>
          <div className="container">
            <SearchBar search={search} setSearch={setSearch} />
            <div className="characters-results">
              <span>{data.count} RESULTS</span>
            </div>
            <div className="container characters-container">
              {data.results.map((character) => {
                if (!character.thumbnail.path.includes("image_not_available")) {
                  return (
                    <Character
                      key={character._id}
                      character={character}
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                  );
                } else return null;
              })}
            </div>
          </div>
          <Paginate
            activePage={activePageCharacters}
            setActivePage={setActivePageCharacters}
            totalItemsCount={data.count}
            itemsCountPerPage={limit}
          />
        </>
      )}
    </div>
  );
};

export default Characters;
