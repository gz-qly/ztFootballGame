import React from 'react'
import $ from "jquery"


class Share extends React.Component {
  state = {
    id: 0,
    name: '逸家人玩转世界杯',
    title: '世界杯八强赛事竞猜赢大奖',
    pic:
      'http://www.weidingzhi.net/bank/showcase/footable/share.png', //分享图片
    active: '',
    price: '', //楼盘价格
    shareUrl: '' //分享链接
  }
  componentWillMount() {
    if (this.props.id != undefined) {
      //alert(this.props.shareUrl)
      //alert(111)
      this.setState({
        id: this.props.id,
        title: this.props.title + '参考均价:￥',
        name: this.props.name,
        price: this.props.price,
        pic: this.props.pic,
        shareUrl: this.props.shareUrl
      })
    }
  }
  onClickShar = () => {
    //alert(this.props.id)
    let price = this.state.price
    let pic = this.state.pic
    let id = this.state.id
    let title = this.state.title
    let name = this.state.name
    let active = this.state.active
    let url = window.location.href
    let shareUrl = "http://spark.weidingzhi.net/spark/appointment/wechat/oauth?state=http://www.weidingzhi.net/bank/showcase/footable/index.html&project_id=11"//this.state.shareUrl
    // let url = 'http://vote.weidingzhi.net'
    //alert(window.location.href)
    var timestamp = "";
    var nonceStr = "";
    var signature = "";
    var appId = "";
    var page_url = window.location.href;
    $.post("http://www.weidingzhi.net/bank/wechat/api/getJSSDKSignature.do", { url: page_url }, function (result) {
      var dataObj = eval("(" + result + ")");//转换为json对象
      timestamp = dataObj.timestamp;
      nonceStr = dataObj.nonce_str;
      appId = dataObj.app_id;
      signature = dataObj.signature;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareTimeline', 'scanQRCode', "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });

    wx.ready(function () {
      wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        success: function (res) {
          //alert("隐藏");
        }
      });
      //朋友圈
      wx.onMenuShareTimeline({
        title: name, // 分享标题
        link: shareUrl,
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: pic, // 分享图标
        success: function () { },
        cancel: function () { }
      })
      //朋友
      wx.onMenuShareAppMessage({
        title: name, // 分享标题
        desc: title + '  ' + price, // 分享描述
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: pic, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { },
        cancel: function () { }
      })
    })
    wx.error(function (res) { })


  }
  render() {
    // alert(11)
    // console.log(this.props.title)
    return (
      <div>
        <p onClick={this.onClickShar()} />
      </div>
    )
  }
}

export default Share
