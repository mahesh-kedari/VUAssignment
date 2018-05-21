import React from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import PhotoComponent from '../components/photoComponent';

class Index extends React.Component {
  render () {
    return (
      <PhotoComponent />
    )
  }
}

export default connect()(Index)