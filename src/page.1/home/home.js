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
const biFen = []
const biFen1 = []
class Home extends React.Component {
  state = {
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
    person: 0
  }
  componentDidMount() {
    // localStorage.setItem("openid", "123")
    queryworldcubmatchList(localStorage.getItem("openid"), 1).then(res => {
      //未投注
      if (res.data.result_code == "002") {
        this.setState({
          winandloseright: res.data.winandloseright,
          scoreright: res.data.scoreright,
          cashing_code: res.data.cashing_code,
          winandlosedata: res.data.winandlosedata,
          scoredata: res.data.scoredata,
          resultState: true,
          loading: false,
          result_code: res.data.result_code,
          person: res.data.addcount
        })
      } else if (res.data.result_code == "001") {
        this.setState({
          winandlosedata: res.data.winandlosedata,
          scoredata: res.data.scoredata,
          resultState: false,
          loading: false,
          result_code: res.data.result_code,
          person: res.data.addcount
        })
      } else {
        this.setState({
          winandlosedata: res.data.winandlosedata,
          scoredata: res.data.scoredata,
          resultState: false,
          loading: false,
          result_code: res.data.result_code,
          person: res.data.addcount
        })
      }

      console.log(res)
    })
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
    // alert(num)
    const data = this.state.winandlosedata.slice()
    const chengData = data.map((item, index) => {
      if (item.id == id) {
        item.selStateId = num
      }
      return item
    })
    // console.log(11, chengData)
    // e.preventDefault()
    // $(e.target).addClass(styles.active).parent().siblings().children().removeClass(styles.active);

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
          <img src={require("../../images/iphone.png")} /></div>
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
      const dataType1data = []
      const dataType1 = this.state.winandlosedata.map((item, id) => {
        dataType1data.push({ openid: localStorage.getItem("openid"), mobile: this.state.inputText, aworld_match_id: item.id, dhome_count: 0, dvisiting_count: 0, user_guessing: item.selStateId, activity_id: 1, guessing_type: item.guessing_type })
        return dataType1data
      })
      const dataType2data = []
      const dataType2 = this.state.scoredata.map((item, id) => {
        dataType2data.push({ openid: localStorage.getItem("openid"), mobile: this.state.inputText, aworld_match_id: item.id, dhome_count: item.homeCount, dvisiting_count: item.visiteCount, user_guessing: item.selStateId, activity_id: 1, guessing_type: item.guessing_type })
        return dataType2data
      })
      const allData = dataType1data.concat(dataType2data)
      console.log(dataType1data)
      console.log(11, allData)
      const sendDta = allData.filter(item => {
        if (item.user_guessing) {
          return item
        }

      })
      sendDta.map((item, index) => {
        saveuserguessing(item.openid, item.mobile, item.aworld_match_id, item.dhome_count, item.dvisiting_count, item.user_guessing, item.activity_id, item.guessing_type).then(res => {
          console.log(res)
        })
      })
      Toast.success("下注成功!", 1, () => { this.props.history.go(-1) })

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
  go = () => {
    const dataType1data = []
    const dataType1 = this.state.winandlosedata.map((item, id) => {
      dataType1data.push({ openid: localStorage.getItem("openid"), mobile: "123456", aworld_match_id: item.id, dhome_count: 0, dvisiting_count: 0, user_guessing: item.selStateId, activity_id: 1, guessing_type: item.guessing_type })
      return dataType1data
    })
    const dataType2data = []
    const dataType2 = this.state.scoredata.map((item, id) => {
      dataType2data.push({ openid: localStorage.getItem("openid"), mobile: "123456", aworld_match_id: item.id, dhome_count: 0, dvisiting_count: 0, user_guessing: item.selStateId, activity_id: 1, guessing_type: item.guessing_type })
      return dataType2data
    })
    const allData = dataType1data.concat(dataType2data)
    // console.log(22,dataType1data)
    // console.log(11, allData)
    const sendDta = allData.filter(item => {
      if (item.user_guessing) {
        return item
      }

    })
    if (sendDta.length != allData.length) {
      Toast.fail("请选满场次在提交")
    } else {
      this.setState({
        modalIphone: true
      })
    }
    // sendDta.map((item, index) => {
    //   saveuserguessing(item.openid, item.mobile, item.aworld_match_id, item.dhome_count, item.dvisiting_count, item.user_guessing, item.activity_id, item.guessing_type).then(res => {
    //     console.log(res)
    //   })
    // })
    // this.setState({
    //   modalIphone: true
    // })
  }
  render() {
    const { person, modalIphone, selBtnId, victoryType, winandlosedata, scoredata, loading, homeList, visiteList, resultState, tielList, winandloseright, scoreright, cashing_code, } = this.state
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      )

    } else {
      return (
        <div className={styles.normal} >
          {modalIphone ? this.iphoneMode() : ""}
          <Modal
            visible={this.state.modal1}
            className={styles.mode}
            transparent
            maskClosable={true}
            onClose={this.onClose('modal1')}
            title={this.state.homeName + " VS " + this.state.visiteName}
            footer={[
              { text: <div style={{ color: "#B1B1B1" }}>取消</div>, onPress: () => { console.log('ok'); this.onClose('modal1')(); } },
              { text: <div style={{ color: "#FC1414" }}>确定</div>, onPress: () => { localStorage.setItem("biFen", biFen.concat(this.state.bifen)); console.log(biFen1, this.state.bifen); this.onClose('modal1')(); } }
            ]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
            <div >
              <div className={styles.modeContent}>
                <div className={styles.top}>
                  <div className={styles.p1} >主胜</div>
                  <div className={styles.list}>
                    {homeList.map((item, index) => {
                      return (
                        <div className={this.state.modeSelId == item.countid ? styles.active : styles.price} ref={index} key={index} onClick={(e) => this.modeSel(item.countid, item.home_count, item.visiting_count)}>
                          <p>{item.home_count}:{item.visiting_count}</p>
                          <p>{item.odds}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.midden}>
                  <div className={styles.p1} >平局</div>
                  <div className={styles.list}>
                    {tielList.map((item, index) => {
                      return (
                        <div className={this.state.modeSelId == item.countid ? styles.active : styles.price} ref={index} key={index} onClick={(e) => this.modeSel(item.countid, item.home_count, item.visiting_count)}>
                          <p>{item.home_count}:{item.visiting_count}</p>
                          <p>{item.odds}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.p1} >客胜</div>
                  <div className={styles.list}>
                    {visiteList.map((item, index) => {
                      return (
                        <div className={this.state.modeSelId == item.countid ? styles.active : styles.price} ref={index} key={index} onClick={(e) => this.modeSel(item.countid, item.home_count, item.visiting_count)}>
                          <p>{item.home_count}:{item.visiting_count}</p>
                          <p>{item.odds}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>
          </Modal>

          <div className={styles.head}>
            <img src={require("../../images/head.png")} />
          </div>
          {resultState ?
            <div className={styles.contentTop}>
              <p className={styles.bigtitle}><span>恭喜获得二等奖</span></p>
              <p className={styles.mintitle}>比分局: 命中<span>{scoreright}</span>场</p>
              <p className={styles.mintitle}>胜负平: 命中<span>{winandloseright}</span>场</p>
              <p className={styles.mintinfo}>获奖凭证： <span>{cashing_code}</span></p>
              <p className={styles.mintinfo}>请前往中铁逸都国际售楼部兑奖</p>
            </div>
            : ""}
          <div className={styles.content}>
            <p className={styles.top}>目前共<span>{person}</span>人参与</p>
            <div className={styles.henLine}>
              <p>热门竞猜</p>
              <p>2017-09-22 19:35:00截止</p>
            </div>
            {winandlosedata.length > 0 ? winandlosedata.map((item, index) => {
              return (
                <div className={styles.bigList} key={index}>
                  <p className={styles.time}>{item.begin_date}</p>
                  <div className={styles.lisName}>
                    {item.buyinfo != 0 ?
                      <div className={styles.resultState}><img src={item.buyin == 2 ?
                        "" :
                        require("../../images/join.png")} /></div>
                      : ""}
                    <p className={styles.name}>{item.home_team}</p>
                    <p className={styles.teamLogo}><img src={item.home_image_path} /></p>
                    <p className={styles.vs}>vs</p>
                    <p className={styles.teamLogo}><img src={item.visiting_image_path} /></p>
                    <p className={styles.name}>{item.visiting_team}</p>
                  </div>
                  {item.buyinfo != 0 ? <div className={styles.btn}>
                    <p className={item.buyinfo == 1 ? styles.active : ""} >主胜</p>
                    <p className={item.buyinfo == 3 ? styles.active : ""} >平局</p>
                    <p className={item.buyinfo == 2 ? styles.active : ""}>客胜</p>
                  </div>
                    :
                    <div className={styles.btn}>
                      <p className={item.selStateId == 1 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 1) }}>主胜</p>
                      <p className={item.selStateId == 3 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 3) }}>平局</p>
                      <p className={item.selStateId == 2 ? styles.active : ""} onClick={() => { this.victoryType(item.id, 2) }}>客胜</p>
                    </div>

                  }

                  <div className={styles.gird}>
                    <div className={styles.gidTop}>
                      <p></p>
                      <p>主胜</p>
                      <p>平局</p>
                      <p>客胜</p>
                    </div>
                    <div className={styles.gidTop}>
                      <p>ManbetX</p>
                      <p>{item.manhomewinodds}</p>
                      <p>{item.mantiewinodds}</p>
                      <p>{item.manvisitingwinodds}</p>

                    </div>
                    <div className={styles.gidTop}>
                      <p>威廉希尔</p>
                      <p>{item.wihomewinodds}</p>
                      <p>{item.witiewinodds}</p>
                      <p>{item.wivisitingwinodds}</p>

                    </div>
                  </div>
                </div>
              )
            }) : ""}
            {scoredata.length > 0 ?
              scoredata.map((item, index) => {
                return (<div className={styles.bigList} key={index}>
                  <p className={styles.time}>{item.begin_date}</p>
                  <div className={styles.lisName}>
                    {this.state.result_code != "000" ? <div className={styles.resultState}><img src={item.buyin == 2 ? "" : require("../../images/join.png")} /></div> : ""}

                    <p className={styles.name}>{item.home_team}</p>
                    <p className={styles.teamLogo}> <img src={item.home_image_path} /></p>
                    <p className={styles.vs}>vs</p>
                    <p className={styles.teamLogo}><img src={item.visiting_image_path} /></p>
                    <p className={styles.name}>{item.visiting_team}</p>
                  </div>
                  {this.state.result_code == "000" ?
                    (item.homeCount && item.visiteCount ?
                      <div className={styles.btnInpu} onClick={() => { this.scolList(item.id, item.home_team, item.visiting_team, item.homewinlist, item.tielist, item.visitingwinlist) }}>
                        <p>  {item.homeCount + ":" + item.visiteCount}</p>
                      </div>
                      : <div className={styles.btnInpu} onClick={() => { this.scolList(item.id, item.home_team, item.visiting_team, item.homewinlist, item.tielist, item.visitingwinlist) }}>
                        <p> 点击选择比分</p>
                      </div>)
                    :
                    (<div className={styles.btnInpuDis} >
                      <p>  {item.buy_home_count + ":" + item.buy_visiting_count}</p>
                    </div>)
                  }
                  {}
                </div>)
              })

              : ""}
            {this.state.result_code == "000" ? <p className={styles.goBtnActive} onClick={this.go}>提交答案</p> : <p className={styles.goBtn}>提交答案</p>}

            {
              //  this.state.sendBtn ? <p className={styles.goBtn}>提交答案</p> : <p className={styles.goBtnActive} onClick={this.go}>提交答案</p>
            }

          </div>
          <div className={styles.content2}>
            <p className={styles.title}>奖品说明</p>
            <p className={styles.titleimg}><img src={require("../../images/hjsm.png")} /></p>
            <p className={styles.smInfo}>这是一段说明文字这是一段说明文字这是一段说明文字这是一段说明文字</p>
            <p className={styles.title}>活动规则和免责声明</p>
            <p className={styles.smInfo}>这是一段说明文字这是一段说明文字这是一段说明文字这是一段说明文字</p>
          </div>
          <div style={{ height: "30px" }} />
        </div >

      )
    }
  }
}


export default connect()(Home);
