import { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal, Toast } from "antd-mobile"
import {
  queryworldcubmatchList, verificationcode, saveuserguessing
} from "../../services"
import { Link } from "dva/router"
//import { Link } from 'react-router';
import Loading from "../../components/loading"
import Cache from "../../utils/cache";
import $ from "jquery"
import Share from "../share"
const biFen = []
const biFen1 = []
class Home extends React.Component {
  state = {
    mobile: "",
    goId: 0,
    rank: 0,
    score: 0,
    loading: true,
    modal1: false,
    modalIphone: false,
    winandlosedata: {},//胜负评分列表
    scoredata: {},//比分比赛列表
    victoryType: 1,
    homeList: [], tielList: [], visiteList: [],
    homeName: "", visiteName: "",
    modeSelId: 0,
    resultState: false,
    winandloseright: 0,//胜负局命中场次
    scoreright: 0,//比分局命中次数
    cashing_code: 0,//对奖码，在已经开奖情况下为空表示没有中奖
    selBtnId: 0,//按钮比赛id
    iphoneModeState: true,
    selDate: [],
    inputText: "",
    verifyCode: 0,
    inputCode: 0,
    bifenId: 0,
    sendBtn: false,
    result_code: "000",
    person: 0,
    dataTwo: []
  }
  componentDidMount() {
    //localStorage.setItem("openid", "123")
    queryworldcubmatchList(String(localStorage.getItem("openid"))).then(res => {
      //未投注
      if (res.data.result_code == "002") {
        const data1 = this.titleSel(res.data.winandlosedata)
        //  console.log(88, this.selTwo(data1))
        this.setState({
          winandlosedata: this.selOne(data1),
          dataTwo: this.selTwo(data1),
          score: res.data.score,
          resultState: true,
          loading: false,
          rank: res.data.rank,
          result_code: res.data.result_code,
          mobile: res.data.usermobile
        }, () => {
          // console.log(77, this.state.data2)
        })
      } else if (res.data.result_code == "001") {
        const data1 = this.titleSel(res.data.winandlosedata)
        this.setState({
          winandlosedata: this.selOne(data1),
          dataTwo: this.selTwo(data1),
          score: res.data.score,
          resultState: true,
          loading: false,
          rank: res.data.rank,
          result_code: res.data.result_code,
          mobile: res.data.usermobile
        }, () => {
          //   console.log(77, this.state.data2)
        })
      } else {
        const data1 = this.titleSel(res.data.winandlosedata)
        console.log(99, this.selTwo(data1))
        const data2 = this.selTwo(data1)
        console.log("data2", this.selTwo(data1))
        this.setState({
          winandlosedata: this.selOne(data1),
          dataTwo: data2,
          score: res.data.score,
          resultState: true,
          loading: false,
          rank: res.data.rank,
          result_code: res.data.result_code,
          mobile: res.data.usermobile
        }, () => {
          console.log(77, this.state.dataTwo)
        })
      }

      console.log(res)
    })
  }
  selOne = (data) => {
    const seldata = []
    console.log(22, data)
    for (let i = 0; i < 2; i++) {
      seldata.push(data[i])
      //  console.log(seldata)
    }
    // console.log(111, seldata)
    return seldata
  }
  selTwo = (data) => {
    const seldataTwo = []
    console.log(3333, data)
    for (let i = 2; i < data.length; i++) {
      seldataTwo.push(data[i])
      //  console.log(seldata)
    }
    //console.log(44444, seldataTwo)
    return seldataTwo
  }
  titleSel = (data) => {
    const data1 = data.map((item, index) => {
      if (item.matchtype == 1) {
        item.matchtype = "1/8比赛",
          item.jfNum = 1
      }
      if (item.matchtype == 2) {
        item.matchtype = "1/4比赛",
          item.jfNum = 2
      }
      if (item.matchtype == 3) {
        item.matchtype = "半决赛",
          item.jfNum = 4
      }
      if (item.matchtype == 4) {
        item.matchtype = "3/4名决赛",
          item.jfNum = 8
      }
      if (item.matchtype == 5) {
        item.matchtype = "决赛",
          item.jfNum = 8
      }
      return item
    })
    return data1
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
  victoryType = (id, num) => {
    const data = this.state.winandlosedata.slice()
    const chengData = data.map((item, index) => {
      if (item.id == id) {
        item.selStateId = num
      }
      return item
    })
    this.setState({
      victoryType: num,
      selBtnId: id,
      winandlosedata: chengData
    })
  }
  scolList = (id, homeName, visiteName, homeList, tielList, visiteList) => {
    this.setState({
      modal1: true,
      homeList: homeList, tielList: tielList, visiteList: visiteList,
      homeName, visiteName,
      bifenId: id
    })
  }
  //选择比分
  modeSel = (id, homeCount, visiteCount) => {
    const data = this.state.scoredata.slice()
    //alert(this.state.bifenId)
    const chengData = data.map((item, index) => {
      if (item.id == this.state.bifenId) {
        item.homeCount = homeCount;
        item.visiteCount = visiteCount;
        if (item.homeCount > item.visiteCount) {
          item.selStateId = 1
        } else if (item.homeCount == item.visiteCount) {
          item.selStateId = 3
        } else {
          item.selStateId = 2
        }

      }
      return item
    })
    //  console.log(chengData)
    this.setState({
      modeSelId: id,
      scoredata: chengData
      // bifen: bifen
    })
  }
  iphone = () => {
    return (
      <div className={styles.iphoneInfo}>
        <div className={styles.iphoneImg}>
          <img src={require("../../images/iphone.png")} />
        </div>
        <p className={styles.title}>请验证您的手机号</p>
        <p className={styles.mintitle}>通过手机号现场兑奖</p>
        <div className={styles.bottom}>
          <input type="tel" placeholder="请输入手机号" onChange={(e) => { this.setState({ inputText: e.target.value }) }} />
          <p className={styles.btn} onClick={() => { this.inputMobile() }}>下一步</p>
        </div>
      </div>
    )
  }
  inputMobile = () => {
    let mytel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (!mytel.test(this.state.inputText)) {
      Toast.fail("请输入正确的手机号码")
    } else {
      verificationcode(this.state.inputText).then(res => {
        // console.log(res.data)
        if (res.data.result_code == "000") {
          this.setState({
            verifyCode: res.data.verifyCode,
            iphoneModeState: false,
          })
        }
      })
    }
  }
  code = () => {
    return (
      <div className={styles.iphoneInfo}>
        <p className={styles.title}>短信验证码</p>
        <div className={styles.bottom}>
          <input type="tel" placeholder="请输入验证码" onChange={(e) => { this.setState({ inputCode: e.target.value }) }} />
          <p className={styles.mintitlecode}>已向您尾号{this.state.inputText.slice(7)}的手机发送验证请输入您收到的验证码</p>
          <p className={styles.btn} onClick={() => { this.codeNext() }}>下一步</p>
        </div>
      </div>
    )
  }
  codeNext = () => {
    if (this.state.inputCode != this.state.verifyCode) {
      Toast.fail("验证码错误")
    } else {
      const item = this.state.winandlosedata.filter(item => {
        return item.id == this.state.goId
      })
      console.log(222, item)
      if (!item[0].selStateId) {
        Toast.success("选择胜场!")
      } else {
        saveuserguessing(String(localStorage.getItem("openid")), this.state.inputText, item[0].id, 0, 0, item[0].selStateId, item[0].id, item[0].guessing_type).then(res => {
          if (res.data.result_code == "000") {
            Toast.success("下注成功!", 1, () => { location.reload() })
          }
        })
      }

    }
  }
  iphoneMode = (title, data) => {
    return (
      <Modal
        visible={this.state.modalIphone}
        className={styles.iphonemode}
        transparent
        maskClosable={true}
        onClose={this.onClose('modalIphone')}
        title={title}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        {this.state.iphoneModeState ? this.iphone() : this.code()}
      </Modal>
    )
  }
  go = (num) => {
    const item = this.state.winandlosedata.filter(item => {
      return item.id == num
    })
    if (!item[0].selStateId) {
      Toast.success("选择胜场!")
    } else {
      // if (this.state.result_code == "000") {
      //   this.setState({
      //     modalIphone: true,
      //     goId: num
      //   })
      // } else {
      this.setState({
        goId: num
      }, () => {
        const item = this.state.winandlosedata.filter(item => {
          return item.id == this.state.goId
        })
        if (!item[0].selStateId) {
          Toast.success("选择胜场!")
        } else {
          saveuserguessing(localStorage.getItem("openid").toString(), this.state.mobile, item[0].id, 0, 0, item[0].selStateId, item[0].id, item[0].guessing_type).then(res => {
            console.log(res)
            if (res.data.result_code == "000") {
              Toast.success("下注成功!", 1, () => { location.reload() })
            }
          })
        }
      })
      // }
    }


  }
  render() {
    const { dataTwo, rank, score, person, modalIphone, selBtnId, victoryType, winandlosedata, scoredata, loading, homeList, visiteList, resultState, tielList, winandloseright, scoreright, cashing_code, } = this.state
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      )

    } else {
      console.log(111111, this.state.data2)
      return (
        <div className={styles.normal} >
          <Share />
          {modalIphone ? this.iphoneMode() : ""}
          <div className={styles.head}>
            <img src={require("../../images/head1.png")} />
          </div>
          <div className={styles.content}>
            <div className={styles.toppai}>
              <p className={styles.top}>我的积分: <span>{score}</span></p>
              <p className={styles.top}>排名: {rank}</p>
            </div>

            {/* <div className={styles.henLine}>
              <p>热门竞猜</p>
              <p>2017-09-22 19:35:00截止</p>
            </div> */}
            {winandlosedata.length > 0 ? winandlosedata.map((item, index) => {
              return (
                <div className={styles.bigList} key={index}>
                  <div className={styles.henLine}>
                    <p>{item.matchtype}</p>
                    {/* <p>{item.end_date}截止</p> */}
                  </div>
                  <p className={styles.time}>{item.closetime}截止</p>
                  <div className={styles.lisName}>
                    {item.goin == 3 ? (item.buyinfo != 0 ?
                      <div className={styles.resultState}><img src={item.buyin == 2 ?
                        require("../../images/del.png") :
                        require("../../images/join.png")} /></div>
                      : "") : ""}
                    <p className={styles.name}>{item.home_team}</p>
                    <p className={styles.teamLogo}><img src={item.home_image_path} /></p>
                    <p className={styles.vs}>vs</p>
                    <p className={styles.teamLogo}><img src={item.visiting_image_path} /></p>
                    <p className={styles.name}>{item.visiting_team}</p>
                  </div>
                  {item.goin == 3 || item.buyinfo != 0 ? <div className={styles.btn}>
                    <p className={item.buyinfo == 1 ? styles.active : ""} >主胜</p>
                    <p className={item.buyinfo == 2 ? styles.active : ""}>客胜</p>
                  </div>
                    :
                    <div className={styles.btn}>
                      <p className={item.selStateId == 1 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 1) }}>主胜</p>
                      <p className={item.selStateId == 2 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 2) }}>客胜</p>
                    </div>

                  }
                  {item.buyin == 1 ? <div className={styles.actiSeldiv}><p className={styles.actiSel}>恭喜猜中 +{item.jfNum}</p></div> : ""}
                  {item.goin == 2 || item.goin == 3 || item.buyinfo != 0 ? (item.buyin == 0 ? <p className={styles.goBtn} >本场未参与</p> : <p className={styles.goBtn} >确认竞猜</p>) : <p className={styles.goBtnActive} onClick={() => this.go(item.id)}>确认竞猜</p>}


                </div>
              )
            }) : ""}


            {dataTwo.length > 0 ? dataTwo.map((item, index) => {
              return (
                <div className={styles.bigList} key={index}>
                  <div className={styles.henLine}>
                    <p>{item.matchtype}</p>
                    {/* <p>{item.end_date}截止</p> */}
                  </div>
                  <p className={styles.time}>{item.closetime}截止</p>
                  <div className={styles.lisName}>
                    {item.goin == 3 ? (item.buyinfo != 0 ?
                      <div className={styles.resultState}><img src={item.buyin == 2 ?
                        require("../../images/del.png") :
                        require("../../images/join.png")} /></div>
                      : "") : ""}
                    <p className={styles.name}>{item.home_team}</p>
                    <p className={styles.teamLogo}><img src={item.home_image_path} /></p>
                    <p className={styles.vs}>vs</p>
                    <p className={styles.teamLogo}><img src={item.visiting_image_path} /></p>
                    <p className={styles.name}>{item.visiting_team}</p>
                  </div>
                  {item.goin == 3 || item.buyinfo != 0 ? <div className={styles.btn}>
                    <p className={item.buyinfo == 1 ? styles.active : ""} >主胜</p>
                    <p className={item.buyinfo == 2 ? styles.active : ""}>客胜</p>
                  </div>
                    :
                    <div className={styles.btn}>
                      <p className={item.selStateId == 1 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 1) }}>主胜</p>
                      <p className={item.selStateId == 2 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 2) }}>客胜</p>
                    </div>
                  }
                  {item.buyin == 1 ? <div className={styles.actiSeldiv}><p className={styles.actiSel}>恭喜猜中 +{item.jfNum}</p></div> : ""}
                  {item.buyin == 0 && item.goin != 1 ? <p className={styles.goBtn} >本场未参与</p> : <p className={styles.goBtn} >确认竞猜</p>}
                </div>
              )
            }) : ""}





          </div>

          <div style={{ height: "40px" }} >
            <img style={{ width: "100%" }} src={require("../../images/bottom.png")} />
          </div>
        </div >

      )
    }
  }
}


export default connect()(Home);
