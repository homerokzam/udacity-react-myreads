import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import ListBooksContent from './ListBooksContent';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.handleChangeShelf = this.handleChangeShelf.bind(this);
  }

  canRefresh = true;

  state = {
    books: []
  };

  handleChangeShelf(e, book) {
    const shelf = e.target.value;
    //console.log(shelf);
    //console.log(book);

    BooksAPI.update(book, shelf)
      .then(() => {
        if (this.canRefresh)
          this.refresh();
      });
  };

  refresh() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  };

  componentWillMount() {
    console.log("componentWillMount");
    this.canRefresh = true;
    this.setState({ books: this.state.books });
    this.refresh();
    console.log(this.canRefresh);
  };

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.canRefresh = false;
    this.setState({ books: this.state.books });
    console.log(this.canRefresh);
  };

  render() {
    const currentlyReadings = this.state.books.filter((book) => book.shelf === 'currentlyReading');
    const wantsToReads = this.state.books.filter((book) => book.shelf === 'wantToRead');
    const reads = this.state.books.filter((book) => book.shelf === 'read');

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ListBooksContent bookShelfTitle="Currently Reading" books={currentlyReadings} handleChangeShelf={this.handleChangeShelf} />
          <ListBooksContent bookShelfTitle="Want to Read" books={wantsToReads} handleChangeShelf={this.handleChangeShelf} />
          <ListBooksContent bookShelfTitle="Read" books={reads} handleChangeShelf={this.handleChangeShelf} />
        </div>
        <div className="open-search">
          <Link to={ {pathname: 'search', params: this.state.books, handleChangeShelf: this.handleChangeShelf} }>Add a book</Link>
        </div>
      </div>
    );
  };
}

export default BookList;