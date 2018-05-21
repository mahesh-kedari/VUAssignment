import React from 'react';
import {connect} from 'react-redux';
import {getPhotoComments} from '../store';

class Photo extends React.Component {
    static getInitialProps ({ reduxStore, req, query }) {
      const isServer = !!req
      getPhotoComments({dispatch, id: this.props.selectedId});
      return {selectedId: query.id, src: query.src}
    }

    componentDidMount() {
      const {dispatch} = this.props;
      //getPhotoComments({dispatch, id: this.props.selectedId});
    }
  
    render () {
      let photosList = this.props.photoComments && this.props.photoComments.map((commentDetails, key) => (
        <div key={key}>
          <span className="userColor">{commentDetails.user} </span>
          <span> {commentDetails.text}</span>
          <style jsx>{`
            .userColor{
              color: #228ae2;
                font-weight: 500;
                text-decoration: underline;
                margin-right: 5px;
            }
          `}</style>
        </div>
      ));
      return (
        <div className= "photoDiv mainImgBox ">
          <div className="imgDiv mainImgDiv noPadding">
              <img height="" width="100%" src={this.props.src}/> 
          </div> 
          <div className="userCommentBox">
            {photosList}
          </div>
          <style jsx>{`
            .imgDiv {
              text-align: center;
              float: left;
              width: 50%;
            } 
            .mainImgDiv img{
              min-height: 500px;
              margin-bottom: 0!important;
            }
            .mainImgDiv img{
              box-shadow:none!important;
              cursor: inherit;
            }
            .mainImgDiv img:hover{
              box-shadow:none!important;
            }
            .noPadding{
              padding: 0!important;                
            }
            .photoDiv {
              margin: 4% 15% 4% 15%;
            }
            .mainImgBox{
              background: #fff;
              box-shadow: 0px 2px 5px rgba(0,0,0,0.1)!important;
              min-height: 78vh;
            }
            .userCommentBox{
              line-height: 1.8em;
              font-size: 15px;
              font-weight: 400;
              padding-top: 30px;
              padding-left: 30px;
              min-height: 480px;          
              width: 45%;
              float: left;
              background: #fff;
              border-left: 1px solid #f1f1f1;
            }
            .userCommentBox h4{
                margin-top: 0;
                margin-bottom: 15px;
                font-weight: 500;
                color: #464646;
            }
          `}</style>
        </div>        
      )
    }
  }

  function mapStateToProps (state) {
    const {photoComments} = state
    return {photoComments}
  }
  
  export default connect(mapStateToProps)(Photo)