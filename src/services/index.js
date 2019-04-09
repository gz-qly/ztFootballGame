import request from '../utils/request';



//获取比赛列表

export function queryworldcubmatchList(openid) {
  return request("/queryworldcubmatchList.do", {
    body: JSON.stringify({
      openid
    }),
  });
}

//获取首页信息
export function queryworldcubstate(openid) {
  return request("/queryworldcubstate.do", {
    body: JSON.stringify({
      openid
    }),
  });
}
//获取手机验证码
export function verificationcode(mobile) {
  return request("/verificationcode.do", {
    body: JSON.stringify({
      mobile
    }),
  });
}
//获取排行榜
export function queryprizelist(openid) {
  return request("/queryprizelist.do", {
    body: JSON.stringify({
      openid
    }),
  });
}

//提交答案
export function saveuserguessing(openid, mobile, aworld_match_id, dhome_count, dvisiting_count, user_guessing, activity_id, guessing_type) {
  return request("/saveuserguessing.do", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      // "token": localStorage.getItem('token')
    },
    body: JSON.stringify({
      openid, mobile, aworld_match_id, dhome_count, dvisiting_count, user_guessing, activity_id, guessing_type
    }),
  });
}
export function getSignature(openid, mobile, aworld_match_id, dhome_count, dvisiting_count, user_guessing, activity_id, guessing_type) {
  return request("/saveuserguessing.do", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      // "token": localStorage.getItem('token')
    },
    body: JSON.stringify({
      openid, mobile, aworld_match_id, dhome_count, dvisiting_count, user_guessing, activity_id, guessing_type
    }),
  });
}

