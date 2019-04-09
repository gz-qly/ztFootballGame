import { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal, Toast } from "antd-mobile"
import {
  queryworldcubstate
} from "../../services"
import { Link } from "dva/router"
//import { Link } from 'react-router';
import Loading from "../../components/loading"
import Cache from "../../utils/cache";
import $ from "jquery"
import Share from "../share"
class Home extends React.Component {
  state = {
    loading: false,
    modal1: false,
    awardstate: 2,//1、已到开奖时间 2、未到开奖时间
    joinstate: 1,//1、灰参与竞猜 2、参与竞猜 3、我的竞猜 4、竞猜结束
    success: 0,//1 表示已经中奖, 0表示未中奖
  }
  getQueryString = (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = this.props.location.search.substr(1).match(reg)
    //console.log(r)
    if (r != null) return unescape(r[2])
    return null
  }

  componentDidMount() {
    let openId = this.getQueryString('openid')
    localStorage.setItem("openid", openId)
    // queryworldcubstate(String(localStorage.getItem("openid")), 1).then(res => {
    //   if (res.data.result_code == "000") {
    //     this.setState({
    //       awardstate: res.data.awardstate,
    //       joinstate: res.data.joinstate,
    //       success: res.data.success,
    //       loading: false,
    //     })
    //   }
    //   console.log(res)
    // })
  }
  goInfo = (num) => {
    const { awardstate } = this.state
    if (num == 1) {
      this.props.history.push("/home")
      return false
    }
    if (num == 2) {
      this.props.history.push("/result")
      return false
    }

    if (num == 3) {
      this.props.history.push("/guize")
      return false
    }

  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  render() {

    //document.getElementById("id").scrollTop(200);
    const { allservice, getAdvertisement, getHotRecommend, getChoiceActivity, message, loading } = this.state
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
          <div className={styles.bg}>
            <img src={require("../../images/bg.png")} />
          </div>
          <div className={styles.btnContent}>
            <div className={styles.btn} onClick={() => { this.goInfo(1) }}>参与竞猜</div>
            <div className={styles.btn} onClick={() => { this.goInfo(2) }}>排行榜</div>
            <div className={styles.btn} onClick={() => { this.goInfo(3) }}>积分规则</div>
          </div>
          <Modal
            visible={this.state.modal1}
            className={styles.mode}
            transparent
            maskClosable={false}
            onClose={this.onClose('modal1')}
            title="中奖了！"
            footer={[

              { text: <div style={{ color: "#FC1414" }}>好的</div>, onPress: () => { console.log('ok'); this.onClose('modal1')(); } }
            ]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
            <div className={styles.modeinfo}>
              恭喜您获得<span>一等奖</span>，快去<span>我的竞猜</span>查看吧！
            </div >
          </Modal>
        </div >

      )
    }
  }
}


export default connect()(Home);
