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
    modal1: false
  }
  componentDidMount() {

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

    return (
      <div className={styles.normal} >

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
            ssss
            </div>
        </Modal>
        <p style={{ height: "2000px", backgroundColor: "red" }}>sss</p>
        <p onClick={() => this.setState({ modal1: true })}>按钮</p>
      </div >

    )

  }
}


export default connect()(Home);
