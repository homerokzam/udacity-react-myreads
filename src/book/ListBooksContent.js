import React, { Component } from 'react';

import Book from './Book';

class ListBooksContent extends Component {
  render() {
    return(

      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">

              {this.props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} handleChangeShelf={(e, book) => {this.props.handleChangeShelf(e, book)}} />
              </li>
              ))}

            </ol>
          </div>
        </div>
      </div>

    );
  }
}

export default ListBooksContent;