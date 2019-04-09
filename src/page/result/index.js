import { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal, SegmentedControl } from "antd-mobile"
import {
  queryprizelist
} from "../../services"
import Share from "../share"
import { Link } from "dva/router"
//import { Link } from 'react-router';
import Loading from "../../components/loading"
import Cache from "../../utils/cache";
import $ from "jquery"

class Result extends React.Component {
  state = {
    loading: true,
    selState: 1,
    myscore: 0,
    userrank: 0,
    data: []
  }


  componentDidMount() {
    queryprizelist(String(localStorage.getItem("openid"))).then(res => {
      // console.log(res)
      if (res.data.result_code == "000") {
        this.setState({
          myscore: res.data.myscore,
          userrank: res.data.userrank,
          data: res.data.userlist,
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
    const { myscore, data, loading, userrank } = this.state
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      )

    } else {
      return (
        <div className={styles.normal} >
          <Share />
          <div className={styles.imgTop}><img src={require("../../images/logo.png")} /></div>
          <div className={styles.content}>

            <p className={styles.result}>排行榜</p>
            <div className={styles.slid}>
              <p>我的积分：<span>{myscore}</span></p>
              <p>排名：{userrank}</p>
            </div>
            <div className={styles.nav}>
              <p>名次</p>
              <p>用户名</p>
              {/* <p>首次竞猜</p> */}
              <p>积分</p>
            </div>
            {data.map((item, index) => {
              return (
                <div className={styles.list} key={index}>
                  {item.rank == 1 ?
                    <p className={styles.one}> <img src={require("../../images/num1.png")} /></p> : ""
                  }
                  {item.rank == 2 ?
                    <p className={styles.one}> <img src={require("../../images/num2.png")} /></p> : ""
                  }
                  {item.rank == 3 ?
                    <p className={styles.one}> <img src={require("../../images/num3.png")} /></p> : ""
                  }
                  {item.rank != 2 && item.rank != 3 && item.rank != 1 ?
                    <p className={styles.one}>{item.rank}</p> : ""
                  }
                  {/* <p>{item.rank}</p> */}
                  <div className={styles.two}> <img className={styles.headimg} src={item.headimage} />
                    <div className={styles.headImgontent}>
                      <p>{item.nickname}</p>
                      <p className={styles.firstTime}>首次竞猜{item.firstdate.substr(5)}</p>
                    </div>
                  </div>
                  {/* <p>{item.firstdate}</p> */}
                  <p className={styles.three}>{item.score}</p>
                </div>
              )
            })}
            <div style={{ height: "70px" }} />
          </div>
        </div >

      )
    }
  }
}


export default connect()(Result);
