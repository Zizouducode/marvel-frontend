//Import
import "./Comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Comic from "../../components/Comic/Comic";
import SearchBar from "../../components/SearchBar/SearchBar";
import Paginate from "../../components/Paginate/Paginate";
const Comics = ({ search, setSearch, favorites, setFavorites }) => {
  //State to store the data from the backend
  const [data, setData] = useState(null);
  //State to notify when the data is received
  const [isLoadding, setIsLoadding] = useState(true);
  //State for the paginate component
  const [activePageComics, setActivePageComics] = useState(1);
  const limit = 100;
  let skip = (activePageComics - 1) * limit;
  // console.log("skip=>", skip);

  //UseEffect required to fetch the data when the component is mount
  useEffect(() => {
    //scroll to the top (for the pagination)
    window.scrollTo(0, 0);
    const fecthData = async () => {
      //Request to get the data from the backend
      try {
        const response = await axios.get("http://localhost:4000/comics", {
          params: {
            title: search,
            limit: limit,
            skip: skip,
          },
        });
        if (response.data) {
          //store the response in the state data
          setData(response.data);
          //change bool isLoading to false
          setIsLoadding(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    // console.log("data=>", data);
    fecthData();
  }, [search, skip]);

  return (
    <div>
      {isLoadding ? (
        <p>waiting for data</p>
      ) : (
        <>
          <div className="container">
            <SearchBar search={search} setSearch={setSearch} />
            <div className="comics-results">
              <span>{data.count} RESULTS</span>
            </div>
            <div className="container comics-container">
              {data.results.map((comic) => {
                if (!comic.thumbnail.path.includes("image_not_available")) {
                  return (
                    <Comic
                      key={comic._id}
                      comic={comic}
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                  );
                } else return null;
              })}
            </div>
          </div>
          <Paginate
            activePage={activePageComics}
            setActivePage={setActivePageComics}
            totalItemsCount={data.count}
            itemsCountPerPage={limit}
          />
        </>
      )}
    </div>
  );
};

export default Comics;
