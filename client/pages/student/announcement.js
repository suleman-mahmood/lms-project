import React from "react";
import { Component } from 'react';
import axios from 'axios';

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats.js";
import Announcementlist from './Announcementlist.js';


// layout for page

import Student from "layouts/Student.js";

class announcement extends Component {
    constructor() {
      super();
      this.state = {
        x:[1,2,3]
      };
    }
  
  
  
  

  

  
    render() {
      const books = this.state.x;
      console.log("PrintBook: " + books);
      let bookList;
  
      if(!books) {
        bookList = "there is no book recored!";
      } else {
          
        bookList = books.map((book, k) =>
          <Announcementlist book={book} key={k} />
        );
      }
      
  return (
      
    <>

    <div>
    {bookList}

    </div>
    </>
  );
}}
export default announcement;

announcement.layout = Student;
