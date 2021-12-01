import React from "react";

const Media = (props) => {
  // the favourite components get passed from App component as a prop
  const FavouriteComponent = props.favouriteComponent;

  return (
    <div>
      <div className="search-container">
        {props.data.map((item, index) => (
          <div className="image-container">
            <img
              className="thumbnail"
              src={item.artworkUrl100}
              alt="Thumbnail"
            />
            <h3 className="item-name">{item.trackName}</h3>
            <div
              onClick={() => props.handleImageClick(item)}
              className="overlay"
            >
              <FavouriteComponent />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
