import React, { Component } from 'react';

class Book extends Component {
  render() {
    const url = this.props.book.imageLinks ? this.props.book.imageLinks.smallThumbnail : '';
    //console.log(url);

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: url ? `url("${url}")` : 'none' }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={(e) => { this.props.handleChangeShelf(e, this.props.book) }}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    );
  }
}

export default Book;