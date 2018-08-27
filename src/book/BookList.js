import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import ListBooksContent from './ListBooksContent';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.handleChangeShelf = this.handleChangeShelf.bind(this);
  }

  state = {
    books: []
  };

  handleChangeShelf(e, book) {
    const shelf = e.target.value;
    console.log(shelf);
    console.log(book);

    BooksAPI.update(book, shelf)
      .then(() => { this.refresh() });
  };

  refresh() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  };

  componentWillMount() {
    this.refresh();
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
          <Link to={ {pathname: 'search', params: this.state.books} }>Add a book</Link>
        </div>
      </div>
    );
  };
}

export default BookList;