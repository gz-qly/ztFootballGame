import React, { Component } from 'react'
import './style.less'
import Cache from '../../utils/cache'
import {
	NavBar,
	Icon
} from 'antd-mobile'
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class NavBars extends Component {
	constructor() {
		super()
	}
	//电话
	tel = (title) => {
		if (title == "tel") {
			window.location.href = "tel:0851-96811"
		}
		//搜索
		if (title == "search") {
			this.props.history.push("/search")
		}
		//去购物车
		if (title == "gwc") {
			this.props.goGwc()
		}

	}
	render() {
		//console.log(this.props)
		const { title, color, leftimg, histLength, leftimgtitle, imgstyle, goGwc } = this.props;
		return (
			<div >
				<NavBar style={{ color: '#212121', backgroundColor: color || '#fff', fontSize: "32px" }} icon={<Icon type="left" size='md' />} leftContent="返回" mode="light" onLeftClick={() => {
					//console.log(this.props.his)
					if (this.props.his == "service") {

						this.props.history.push("/")
					} else if (this.props.his == "active") {
						this.props.history.push("/community")
					} else if (this.props.his == "tcorderlist") {
						this.props.history.push("/specialty")
					} else if (this.props.his == "activeSq") {
						this.props.history.push("/community")
					}

					else {
						history.go(-1)
					}
				}
					//	history.go(-1)
				}
					rightContent={[
						leftimg ?
							<img key="0" src={leftimg} onClick={() => this.tel(leftimgtitle)} style={imgstyle} />
							: ""
					]}>
					{title}
				</NavBar>
			</div>
		)
	}
}
