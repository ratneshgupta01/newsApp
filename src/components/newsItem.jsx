import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, time, source } =
      this.props;
    return (
      <div className="card-deck my-3 mx-auto">
        <div className="card" style={{ width: "18rem" }}>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
            {/* <span class="visually-hidden">unread messages</span> */}
          </span>
          <img className="card-img-top" src={imageUrl} alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text">
              <small className="text-muted">
                Written by {author} on {new Date(time).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn  btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
