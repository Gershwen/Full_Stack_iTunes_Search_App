import "./App.css";
import InputForm from "./components/Form";
import React from "react";
import Media from "./components/Media";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      favourites: [],
      searchValue: "",
      selectValue: "",
    };

    //binding handlers
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAddToFavourites = this.handleAddToFavourites.bind(this);
  }

  //Below function handles search input
  handleSearchChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  //Below function handles select options
  handleSelectChange(event) {
    this.setState({ selectValue: event.target.value });
  }

  //Below function handles search submit

  handleSearchSubmit(e) {
    //prevent default of refreshing the page
    e.preventDefault();

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: this.state.searchValue,
        select: this.state.selectValue,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          data: result.results,
        });
      })
      .catch((error) => console.log("Error:", error));
  }

  //Below function handles the add to favourites button
  handleAddToFavourites(item) {
    const newFavouriteList = [...this.state.favourites, item];

    this.setState({
      favourites: newFavouriteList,
    });
  }

  //Below function handles the remove from favourites button
  handleRemoveButton(item) {
    const newFavouriteList = this.state.favourites.filter(
      (favourite) => favourite.collectionId !== item.collectionId
    );

    this.setState({
      favourites: newFavouriteList,
    });
  }

  render() {
    const { error, data, favourites } = this.state;

    if (error) {
      return <div>Error: {error.data}</div>;
    } else
      return (
        <div className="App">
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
          />
          <h1 className="heading">
            Look up your favourite song, movie, book or podcast!
          </h1>
          {/* InputForm component gets imported from Form.js */}
          <InputForm
            handleSearchSubmit={this.handleSearchSubmit}
            handleSearchChange={this.handleSearchChange}
            handleSelectChange={this.handleSelectChange}
            selectValue={this.state.selectValue}
          />
          {/* Passing the data array to the Media component */}
          <Media
            favourites={favourites}
            data={data}
            favouriteComponent={AddFavourites}
            handleImageClick={this.handleAddToFavourites}
          />

          <div>
            <h2 className="favouriteHeading">Favourites:</h2>
          </div>

          {/* Passing favourites array to below media component */}
          <Media
            data={favourites}
            favouriteComponent={RemoveFavourites}
            handleImageClick={this.handleRemoveButton}
          />
        </div>
      );
  }
}

export default App;
