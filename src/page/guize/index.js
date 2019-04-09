import { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal, SegmentedControl } from "antd-mobile"
import {
  queryprizelist
} from "../../services"
import { Link } from "dva/router"
//import { Link } from 'react-router';
import Loading from "../../components/loading"
import Cache from "../../utils/cache";
import $ from "jquery"

class Result extends React.Component {
  state = {

  }


  componentDidMount() {

  }

  render() {

    //document.getElementById("id").scrollTop(200);
    const { data, data1, data2, data3, loading } = this.state

    return (
      <div className={styles.normal} >
        <img src={require("../../images/guize.jpeg")} />
      </div >

    )
  }
}


export default connect()(Result);
