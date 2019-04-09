import React, { Component } from 'react'
import styles from './index.less'
import {
  ActivityIndicator
} from 'antd-mobile'
export default class Loading extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div id="freshContainer">
        <div className={styles.null} style={{ height: document.body.clientHeight - 100 }}>
          <div style={{ textAlign: "center", color: "#c5c5c5" }}>
            <ActivityIndicator text="正在加载..." />
          </div>
        </div>
      </div>
    )
  }
}
