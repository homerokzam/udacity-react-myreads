import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DebounceInput from 'react-debounce-input';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class BookSearch extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    console.log(this.props);
    //console.log(this.props.location);
    this.state.books = this.props.location.params ? this.props.location.params : [];
    //console.log(this.state.books);
  }

  state = {
    books: [],
    searchResults: [],
    query: ''
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({...this.state, query: value});
    this.searchBooks(value);
  }

  searchBooks(query) {
    if (!query) {
      this.setState({...this.state, searchResults: []});
      return;
    }

    BooksAPI.search(query, 20)
      .then((searchResults) => {
        if (!searchResults || searchResults.error) {
          this.setState({...this.state, searchResults: []});
          return;
        }

        searchResults = searchResults.map((book) => {
          const bookOnShelf = this.state.books.find(b => b.id === book.id);
          book.shelf = bookOnShelf ? bookOnShelf.shelf : "none";
          return book;
        });

        this.setState({...this.state, searchResults});
      });
  }

  componentDidMount() {
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <DebounceInput type="text" placeholder="Search by title or author" minLength={3} debounceTimeout={350} value={this.state.query} onChange={this.handleChange}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.searchResults && this.state.searchResults.map((book, index) => (
              <li key={book.id + index}>
                <Book book={book} handleChangeShelf={(e, book) => {
                  this.props.location.handleChangeShelf(e, book);
                  this.setState({...this.state, searchResults: this.state.searchResults.filter(b => { return b.id !== book.id })});
                }} />
              </li>
            ))
          }
          </ol>
        </div>
      </div>
    );
  };
}

export default BookSearch;