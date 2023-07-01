import React, { Component } from "react";
import NewsItem from "./newsItem";
import { Fade } from "react-reveal";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    // console.log("constructor from new commp.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updatePage() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7a0480ef8efc49248ed03b618797836f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.setState({
      page: this.state.page + 1,
    });
    this.updatePage();
  }

  setNextPage = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({
        page: this.state.page + 1,
      });
      this.updatePage();
    }
  };

  setPrevPage = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updatePage();
  };
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  render() {
    return (
      <div className="container my-3 center">
        <h2 className="text-center">{`NewMonkey- Top ${this.capitalize(
          this.props.category
        )} Headlines`}</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element, index) => {
              return (
                <Fade bottom delay={20 * index} behavior="smooth">
                  <div className="card-deck col-md-4 mx-auto" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://gumlet.assettype.com/freepressjournal/2023-02/7df4f790-8ecd-4c75-88a8-a8923bad3b44/_23874c74_3a5e_11eb_a935_67a6702b164e.webp"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      time={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                </Fade>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page === 1 ? true : false}
            type="button"
            className="btn btn-dark"
            onClick={this.setPrevPage}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.setNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
