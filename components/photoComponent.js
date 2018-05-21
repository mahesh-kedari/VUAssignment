import {connect} from 'react-redux'
import Link from 'next/link';

function PhotoComponent ({ photos, count }) {
    let photosList = photos.map((photoDetails, key) => (
      <div key={key} className="imgDiv homeImgBox">
        <Link href={`/photo?id=${photoDetails.code}&src=${photoDetails.display_src}`}>
            <img key={key} src={photoDetails.display_src} alt={key+1} />
        </Link>
        <style jsx>{`
        .homeImgBox{
          float: left;
            width: 30%;
            padding-left: 15px;
            padding-right: 15px;
        }
        .imgDiv {
          text-align: center;
        }
        .imgDiv img {
          background: #fff;
          padding: 5px;
          margin-bottom: 30px;
          max-width: 100%;
          height:auto;
          display: block;
          min-height: 250px;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.1)!important;
          cursor: pointer;
        }
        .imgDiv img:hover{
          box-shadow: 0 24px 38px 3px rgba(191, 191, 191, 0.14), 0 9px 46px 8px rgba(162, 162, 162, 0.12), 0 11px 15px -7px rgba(21, 21, 21, 0.2)!important;
        }
    `}</style>
      </div>
    ));
    return (
      <div className= "photoDiv">
        {photosList}
        <style jsx>{`
        .photoDiv {
          margin: 4% 15% 4% 15%;
        }
    `}</style>
      </div>
    )
  }

function mapStateToProps (state) {
  const { photos, count } = state
  return { photos, count }
}

export default connect(mapStateToProps)(PhotoComponent)
