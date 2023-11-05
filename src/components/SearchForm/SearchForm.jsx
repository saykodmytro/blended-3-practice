import { Component } from "react";

import { FiSearch } from "react-icons/fi";
import { FormBtn, InputSearch, SearchFormStyled } from "./SearchForm.styled";

export class SearchForm extends Component {
  state = {
    query: "",
  };
  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === "") {
      return alert("Sorry can not be empty");
    }
    this.props.onSubmit(query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          value={query}
          onChange={this.handleChange}
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
