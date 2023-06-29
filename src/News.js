import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

   capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirst(this.props.category)} - NewsMonkey`;
   }
     async UpdateNews() {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b90e193b8144094bbca4d3d32c7bf47&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({articles: parsedData.articles, 
        totalResults: parsedData.totalResults, 
        loading: false
      })
     }
   async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b90e193b8144094bbca4d3d32c7bf47&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults, 
    //   loading: false
    // })
    this.UpdateNews();
   }

   handlePrevclick = async ()=>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b90e193b8144094bbca4d3d32c7bf47&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({ 
    //   page: this.state.page -1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page - 1});
    this.UpdateNews();
   }
  
   handleNextclick = async()=>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b90e193b8144094bbca4d3d32c7bf47&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({ 
    //   page: this.state.page +1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
  //  }
  this.setState({page: this.state.page + 1});
  this.UpdateNews();
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:"30px"}}>NewsMonkey - Top Headlines on {this.capitalizeFirst(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
             <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}> &larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr; </button>
      </div>
        </div>
    );
  }
}

export default News;
