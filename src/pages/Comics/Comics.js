//Import
import "./Comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Comic from "../../components/Comic/Comic";
import SearchBar from "../../components/SearchBar/SearchBar";
const Comics = ({ search, setSearch }) => {
  //State to store the data from the backend
  const [data, setData] = useState(null);
  //State to notify when the data is received
  const [isLoadding, setIsLoadding] = useState(true);

  //UseEffect required to fetch the data when the component is mount
  useEffect(() => {
    const fecthData = async () => {
      //Request to get the data from the backend
      try {
        const response = await axios.get("http://localhost:4000/comics", {
          params: {
            title: search,
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
  }, [search]);

  return (
    <div>
      {isLoadding ? (
        <p>waiting for data</p>
      ) : (
        <div className="container">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="comics-results">
            <span>{data.count} RESULTS</span>
          </div>
          <div className="container comics-container">
            {data.results.map((comic) => {
              if (!comic.thumbnail.path.includes("image_not_available")) {
                return <Comic key={comic._id} comic={comic} />;
              } else return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comics;
