import "./Comic.css";

const Comic = ({ comic }) => {
  const { thumbnail, title } = comic;
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
      <div className="comic-title">
        <p>{comic.title}</p>
      </div>
    </div>
  );
  // }
};

export default Comic;
