import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// This component renders the search and select fields as well as search submit

const InputForm = ({
  handleSearchSubmit,
  handleSearchChange,
  handleSelectChange,
  selectValue,
}) => {
  return (
    <Form className="searchForm" onSubmit={handleSearchSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          onChange={handleSearchChange}
          type="text"
          placeholder="Enter song/movie/book title..."
          name="search"
          id="search"
        />
      </Form.Group>

      <Form.Select
        onChange={handleSelectChange}
        value={selectValue}
        aria-label="Default select example"
        name="select"
        id="select"
      >
        <option value="all">All</option>
        <option value="music">Music</option>
        <option value="movie">Movies</option>
        <option value="audiobook">Audiobooks</option>
        <option value="podcast">Podcast</option>
      </Form.Select>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default InputForm;
