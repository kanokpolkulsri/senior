import React from 'react'
import StarRatings from 'react-star-ratings';

// var Template = require('./Review.jsx')
import '../css/Review.css';

class Review extends React.Component {
   
    render() {
        return (
        
            <div class="row">
                <div class="col-3 col-search-filter">
                    <span class="search-filter-header"><i class="fa fa-search"></i>  Search</span>
                    <div class="search-filter-content"><input type="keyword" class="col-11 form-control" id="exampleInputKeyword1" aria-describedby="keywordHelp" placeholder="Enter any keyword"/></div>
                    <span class="search-filter-header"><i class="material-icons">tune</i>  Filter</span>
                    <div class="search-filter-content">
                        <span class="filter-topic">Job Description</span>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label class="form-check-label" for="defaultCheck1">
                                Frontend Development
                            </label>
                        </div>
                        <span class="filter-topic">Payment Range</span>
                        <select>
                            <option> 0-100 THB </option>
                        </select>
                        <span class="filter-topic">Transportation options</span>
                        <span class="trans-tag">Bus</span>
                        <span class="trans-tag">BTS</span>
                        <span class="trans-tag">MRT</span>
                    </div>
                  

                </div>
                <div class="col-9 container review-container">
                    <div class="row justify-content-end">
                        <div class="sort col-4 offset-8">
                            <span>Sort By: </span>
                            <select class="sort-select sort-name"> 
                                <option>
                                    Name
                                </option>
                            </select>
                            <select class="sort-select sort-asending">
                                <option>
                                    Ascending
                                </option>
                            </select>
                        </div>
                    </div>
                    <br/>
                <div class="row company">
                    <div class="company-logo"></div>
                    <div class="company-detail row col-12">
                        <div class="col-10">
                            <h5>Company Name</h5>
                            <p> Job description: <br/>
                                Payment:    <br/>
                                Transportation option:
                            </p>
                        </div>
                        <div class="star-ratings col-2">  <StarRatings
                            // rating={this.state.rating}
                            rating={3}
                            starRatedColor={"#F7CD1F"}
                            numberOfStars={3}
                            name='rating'
                            isSelectable='false'
                            starDimension="15px"
                            starSpacing="0px"
                            />
                        </div>
                      
                    </div>
                    </div>

                </div>
            </div>
            )
    }
}

export default Review