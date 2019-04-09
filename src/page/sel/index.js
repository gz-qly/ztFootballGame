import { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
class Sel extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className={styles.normal} >
        <img src={require("../../images/resul.jpeg")} />
      </div >
    )
  }
}


export default connect()(Sel);
