import React, { Component } from 'react'
import { Article } from '../index'

import { Footer } from '../../components/index'
import { loadArticle, loadThisPageAction } from '../../actions'
import { Link } from 'react-router-dom'
import './index.less'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.EVENT_LISTEN = true
    this.NOW_PAGE = 1
    this.MAX_PAGE = Math.ceil(this.props.articleLen / 5)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    alert('home')
  }

  render() {
    let { articles, articleLen, dispatch } = this.props
    let msg = ['hello', ' ', 'world']
    console.log('render home -->')
    if (articles) {
      return (
        <div className="right-area" id="right-area" ref="loader" onWheel={this.loadMoreArticles.bind(this)}>
          <div className="right-area-wrap">

            <div onClick={this.handleClick}>home1</div><br />
            <ul>
              {msg.map((m, idx) => <li key={idx}>{m}</li>)}
            </ul>
          </div>
          <Footer />
        </div>
      )
    } else {
      return (


        <div><div onClick={this.handleClick}>Index</div></div>
      )
    }
  }

  loadMoreArticles(event) {
    if (this.EVENT_LISTEN && this.NOW_PAGE) {
      let loader = this.refs['loader']
      let body = document.body
      let { dispatch } = this.props
      if (loader.scrollHeight - body.scrollTop <= window.innerHeight + 200) {
        this.EVENT_LISTEN = false
        dispatch(loadThisPageAction(++this.NOW_PAGE))
        this.EVENT_LISTEN = true
      }
    }
  }

  componentDidMount() {
    document.body.scrollTop = 0
  }
}