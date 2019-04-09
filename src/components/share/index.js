import React from 'react'
import $ from 'jquery'
class Share extends React.Component {
  state = {
    contentID: 0,
    name: '都市E家',
    title: '都市E家',
    pic: "http://new.gzdsw.com/newspaper/file/avatar/default.jpg", //分享图片
    active: '',
    shareUrl: window.location.href.split('#')[0] + "#/news/" + this.props.contentID + "?&type=appshare", //分享链接
    description: "城市生活新秘书"
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillMount() {
    //console.log(this.props)
    this.setState({
      contentID: this.props.contentID,
      title: this.props.title,
      name: this.props.name,
      pic: this.props.pic,
      shareUrl: "http://nptest.weidingzhi.net:9080/#/activedetailshare/" + this.props.contentID,
      description: this.props.description
    }, () => {
      const params = {
        url: window.location.href
      }
      const title = this.state.title
      const shareUrl = this.state.shareUrl
      const pic = this.state.pic
      const description = this.state.description
      console.log(title)
      $.ajax({
        type: 'POST',
        url: "http://new.gzdsw.com/newspaper/common/api/cms/v1/wechatShare.app",
        data: params,
        success: function (data) {
          console.log(data.datas.noncestr)
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.datas.appid, // 必填，公众号的唯一标识
            timestamp: data.datas.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.datas.noncestr, // 必填，生成签名的随机串
            signature: data.datas.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            //朋友圈
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: shareUrl,
              // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: pic, // 分享图标
              success: function () { },
              cancel: function () { }
            })
            //朋友
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: description, // 分享描述
              link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: pic, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () { },
              cancel: function () { }
            })
          })
          wx.error(function (res) { })

        },
        dataType: "json"
      });
    })



  }
  render() {
    //  console.log(this.state)
    return (
      <div>
        <p />
      </div>
    )
  }
}

export default Share
