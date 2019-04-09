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
    loading: true,
    selState: 1,
    data1: [],
    data2: [],
    data3: [],
    data: []
  }


  componentDidMount() {
    queryprizelist(1).then(res => {
      if (res.data.result_code == "000") {
        this.setState({
          data: res.data.user_prize_list1,
          data1: res.data.user_prize_list1,
          data2: res.data.user_prize_list2,
          data3: res.data.user_prize_list3,
          loading: false,
        })
      }
      // console.log(res)
    })
  }

  selState = (num) => {
    // console.log(num)
    this.setState({
      selState: num
    }, () => {

    })
    if (num == 1) {
      this.setState({
        data: this.state.data1
      })
      return false
    }
    if (num == 2) {
      this.setState({
        data: this.state.data2
      })
      return false
    }
    if (num == 3) {
      this.setState({
        data: this.state.data3
      })
      return false
    }
  }
  render() {

    //document.getElementById("id").scrollTop(200);
    const { data, data1, data2, data3, loading } = this.state
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      )

    } else {
      return (
        <div className={styles.normal} >
          <div className={styles.top}>
            <div className={styles.left}>小组赛竞猜</div>
            <div className={styles.right}>淘汰赛首轮竞猜</div>
          </div>
          <div className={styles.content}>
            <p className={styles.result}>中奖结果</p>
            <div className={styles.imgTop}><img src={require("../../images/hjsm.png")} /></div>
            <div className={styles.slid}>
              <p className={this.state.selState == 1 ? styles.active : ""} onClick={() => { this.selState(1) }}>一等奖</p>
              <p className={this.state.selState == 2 ? styles.active : ""} onClick={() => { this.selState(2) }}>二等奖</p>
              <p className={this.state.selState == 3 ? styles.active : ""} onClick={() => { this.selState(3) }}>三等奖</p>
            </div>
            <div className={styles.info}>
              {data.length > 0 ? data.map((item, index) => {
                return (
                  <p key={index}>{item.mobile}</p>
                )
              }) : ""}
            </div>


            {/* <div className={styles.noimgTop}><div>
              <img src={require("../../images/bigjb.png")} />
              <p className={styles.noResult}>还没到开奖时间哦～</p>
            </div></div> */}
          </div>
          <div className={styles.imgBottom}><img src={require("../../images/jb.png")} /></div>
        </div >

      )
    }
  }
}


export default connect()(Result);
