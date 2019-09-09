import { API } from '../utils/http';

/**
 * 查询用户所有银行卡
 */
export const get_user_bank_card_list = () => {
  return API.get(`/api/v1.0/WBankCard`);
};

/**
 * 用户添加银行卡
 *
 * @param {*} params
 */
export const add_user_bank_card = params => {
  return API.post(`/api/v1.0/WBankCard`, params);
};

/**
 * 删除用户银行卡
 *
 * @param {*} id
 * @returns
 */
export const remove_user_bank_card = id => {
  return API.delete(`/api/v1.0/WBankCard/${id}`);
};

/**
 * 获取通用银行卡列表
 *
 * @returns
 */
export const get_common_bank_list = () => {
  return API.get(`/api/v1.0/CDictionary/BankList`);
};

/**
 * 获取用户信息
 *
 * @returns
 */
export const get_user_info = () => {
  return API.get(`/api/v1.0/WMember/Detail`);
};

/**
 * 更新用户信息
 *
 * @returns
 */
export const update_user_info = () => {
  return API.put(``);
};

/**
 * 获取游戏类型
 *
 * @returns
 */
export const get_game_type_list = () => {
  return API.get(`/api/v1.0/CGame/GameTypeList`);
};

/**
 * 获取所有游戏平台
 *
 */
export const get_all_game_platform_list = () => {
  return API.get(`/api/v1.0/CGame/GamePlatformList`);
};

/**
 * 根据游戏类型获取平台
 *
 * @param {*} id
 * @returns
 */
export const get_platform_list_by_type = id => {
  return API.get(`/api/v1.0/WGame/Platform/${id}`);
};

/**
 * 获取游戏列表
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_game_list = (page, limit, query) => {
  return API.get(`/api/v1.0/WGame/${page}/${limit}`, query);
};

/**
 * 获取公告
 *
 * @param {*} page
 * @param {*} limit
 */
export const get_board_list = (page, limit) => {
  return API.get(`/api/v1.0/WNews/${page}/${limit}`);
};

/**
 * 获取公告详情
 *
 * @param {*} id
 * @returns
 */
export const get_board_detail = id => {
  return API.get(`/api/v1.0/WNews/Detail/${id}`);
};

/**
 * 获取站内信列表
 *
 * @param {*} page
 * @param {*} limit
 */
export const get_notice_list = (page, limit) => {
  return API.get(`/api/v1.0/WNotice/${page}/${limit}`);
};

/**
 * 删除站内信
 * @param {*} id
 * @returns
 */
export const remove_notice = id => {
  return API.delete(`/api/v1.0/WNotice/${id}`);
};

/**
 * 已读站内信
 * @param {*} id
 * @returns
 */
export const read_notice = id => {
  return API.patch(`/api/v1.0/WNotice/${id}`);
};

/**
 * 用户登录
 *
 * @param {*} params
 */
export const user_login = params => {
  return API.post(`/api/v1.0/Connect/token`, params);
};

/**
 * 用户注册
 *
 * @param {*} params
 */
export const user_register = params => {
  return API.post(`/api/v1.0/Passport/Register`, params);
};

/**
 * 获取图形验证码
 * 1注册 2认证 3重新认证 4密码 5交易密码 6登陆 7安全
 * @param {*} captchaType
 * @returns
 */
export const get_image_captcha = captchaType => {
  return API.get(`/api/v1.0/Generic/VerifyCode/${captchaType}`);
};

/**
 * 获取所有线下支付充值方式
 *
 * @returns
 */
export const get_offline_charge_methods = () => {
  return API.get(`/api/v1.0/WRecharge/ReceiptAccount`);
};

/**
 * 确认充值
 *
 */
export const charge_confirm = params => {
  return API.post(`/api/v1.0/WRecharge`, params);
};

/**
 * 获取玩家平台余额
 *
 * @returns
 */
export const get_user_platform_balance = () => {
  return API.get(`/api/v1.0/WMember/PlatformBalance`);
};

/**
 * 通过平台id 获取余额
 *
 * @param {*} id
 */
export const get_platform_balance_by_id = id => {
  return API.get(`/api/v1.0/WPlayerWallet/PersonalBalance/${id}`);
};

export const test = () => {
  return API.get(`/api/v1.0/WPlayerWallet`);
};

export const test1 = () => {
  return API.get(`/api/v1.0/WPlayerWallet/GetPlatformsBalance`);
};
/**
 * 提现信息
 */
export const withdraw_info = () => {
  return API.get(`/api/v1.0/WWithDrawal/Rule`);
};

/**
 * 提现
 */
export const withdraw = body => {
  return API.post(`/api/v1.0/WWithDrawal`, body);
};
/**
 * 佣金提现
 */
export const withdraw_commission = body => {
  return API.post(`/api/v1.0/WWithDrawal/Commission`, body);
};

/**
 * 设置支付密码
 * @param {*} body
 */
export const set_pay_password = body => {
  return API.post(`/api/v1.0/Security/DefaultPayPassword`, body);
};

/**
 * 修改支付密码
 * @param {*} body
 */
export const change_pay_password = body => {
  return API.post(`/api/v1.0/Security/ChangePayPassword`, body);
};

/**
 * 修改登陆密码
 * @param {*} body
 */
export const change_login_password = body => {
  return API.post(`/api/v1.0/Security/ChangePassword`, body);
};
/**
 * 修改用户信息
 * @param {*} body
 */
export const change_member_profile = body => {
  return API.post(`/api/v1.0/WMember/Detail/PersonalData`, body);
};

/**
 * 绑定邮箱
 */
export const bind_email = query => {
  return API.post(`/api/v1.0/Security/BindEmail`, query);
};

/**
 * 绑定手机
 */
export const bind_phone = query => {
  return API.post(`/api/v1.0/Security/BindPhone`, query);
};

/**
 * 账变记录
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const bill_change_record = (page, limit, query) => {
  return API.get(`/api/v1.0/WFund/${page}/${limit}`, query);
};

/**
 * 充值记录
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const charge_record = (page, limit, query) => {
  return API.get(`/api/v1.0/WRecharge/${page}/${limit}`, query);
};

/**
 * 提现记录
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const withdraw_record = (page, limit, query) => {
  return API.get(`/api/v1.0/WWithDrawal/${page}/${limit}`, query);
};

/**
 * 游戏记录
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const get_game_record = (page, limit, query) => {
  return API.get(`/api/v1.0/WGameRecord/${page}/${limit}`, query);
};

/**
 * 团队列表
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const get_team = (page, limit, query) => {
  return API.get(`/api/v1.0/WTeam/${page}/${limit}`, query);
};

/**
 * 推广码  1会员 2代理
 * @param {*}
 */
export const get_team_promotion = memberType => {
  return API.get(`/api/v1.0/WTeam/Promotion/${memberType}`);
};

/**
 * 默认代理需求
 */
export const get_default_agent = () => {
  return API.get(`/api/v1.0/WAgent/Default`);
};

/**
 * 默认代理需求
 */
export const get_agent_current = memberType => {
  return API.get(`/api/v1.0/WAgent/Current/${memberType}`);
};

/**
 * 申请代理
 */
export const join_agent = () => {
  return API.post(`/api/v1.0/WAgent`);
};

/**
 * 玩游戏
 *
 * @param {*} id
 * @returns
 */
export const play_game = id => {
  return API.get(`/api/v1.0/Player/Open/${id}`);
};

/**
 * 查广告轮播
 */
export const get_advertise = () => {
  return API.get(`/api/v1.0/WAdvertisement`);
};

/**
 * 查站点信息
 */
export const get_site_info = () => {
  return API.get(`/api/v1.0/WSiteManage`);
};

/**
 * 查站点wap域名
 */
export const get_phone_domain = () => {
  return API.get(`/api/v1.0/WSiteManage/WapSite`);
};

/* 钱包转账
 *
 * @param {*} params
 * @returns
 */
export const wallet_trans = params => {
  return API.post(`/api/v1.0/WTransfer`, params);
};

/**
 * 收藏列表
 *
 * @returns
 */
export const get_collected_game_list = () => {
  return API.get('/api/v1.0/WFollow/Collection');
};

/**
 * 喜欢游戏
 *
 * @param {*} id
 * @returns
 */
export const like_game = id => {
  return API.post(`/api/v1.0/WFollow/Collection`, { gameId: id });
};

/**
 * 取消收藏游戏
 *
 * @param {*} id
 * @returns
 */
export const unlike_game = id => {
  return API.delete(`/api/v1.0/WFollow/Collect/${id}`);
};

/**
 * 发邮箱验证码
 * @param {*} captchaType
 * @returns
 */
export const get_mail_code = (captchaType, mailName) => {
  return API.get(`/api/v1.0/Generic/Mail/${captchaType}/${mailName}`);
};

/**
 * 发短信验证码
 * @param {*} captchaType
 * @returns
 */
export const get_sms_code = (captchaType, mailName) => {
  return API.get(`/api/v1.0/Generic/SMS/${captchaType}/${mailName}`);
};

/**
 * 找回密码step1
 */
export const forget_pass = body => {
  return API.post(`/api/v1.0/Passport/Forget`, body);
};

/**
 * 找回密码step2 重置密码
 */
export const forget_pass_reset = (code, body) => {
  return API.put(`/api/v1.0/Passport/Forget/${code}`, body);
};

/**
 * 一键提取有平台余额
 */
export const one_button_transfer = () => {
  return API.put(`/api/v1.0/WTransfer`);
};

/**
 * 查询转账记录
 */
export const get_transfer_record = (page, limit, query) => {
  return API.get(`/api/v1.0/WTransfer/${page}/${limit}`, query);
};

/**
 * 七天内不同游戏类别的消费
 */
export const get_game_type_bet_seven = () => {
  return API.get(`/api/v1.0/WMemberGameRecord/GameTypeConsumtion`);
};

/**
 * 七天内所有游戏的消费
 */
export const get_game_bet_seven = () => {
  return API.get(`/api/v1.0/WMemberGameRecord/DateConsumtion`);
};

/**
 * 获取所有活动
 */
export const get_activity_all = () => {
  return API.get(`/api/v1.0/WActivityDetails`);
};

/**
 * 活动详情
 */
export const get_activity_detail = id => {
  return API.get(`/api/v1.0/WActivityDetails/${id}`);
};

/**
 * 查看是否领取
 */
export const check_activity = activityDetailId => {
  return API.get(`/api/v1.0/WActivity/${activityDetailId}`);
};

/**
 * 领取活动奖金
 */
export const get_activity_prize = activityDetailId => {
  return API.post(`/api/v1.0/WActivity/${activityDetailId}`);
};

/**
 * 查询任务分页
 */
export const get_mission_page = () => {
  return API.get(`/api/v1.0/WMission`);
};

/**
 * 查询用户任务每日信息
 */
export const get_mission_member_info = () => {
  return API.get(`/api/v1.0/WMission/MemberDetail`);
};

/**
 * 领取任务奖金
 */
export const get_mission_prize = missionId => {
  return API.post(`/api/v1.0/WMission/${missionId}`);
};

/**
 * 查询活跃度分页
 */
export const get_liveness_all = () => {
  return API.get(`/api/v1.0/WLiveness`);
};

/**
 * 领取任务奖金
 */
export const get_liveness_prize = id => {
  return API.post(`/api/v1.0/WLiveness/${id}`);
};

/**
 * 查询今日任务领取
 */
export const get_mission_recieve = () => {
  return API.get(`/api/v1.0/WMission/ReceivedList`);
};

/**
 * 查询今日活跃度领取
 */
export const get_liveness_recieve = () => {
  return API.get(`/api/v1.0//WLiveness/ReceivedList`);
};

/**
 * 用户签到
 */
export const user_signin = () => {
  return API.post(`/api/v1.0/WSignIn`);
};


/**
 * 用户签到
 */
export const get_user_signin = () => {
  return API.get(`/api/v1.0/WSignIn`);
};

/**
 * 充值记录列表
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_recharge_record_list = (page, limit, query) => {
  return API.get(`/api/v1.0/WRecharge/${page}/${limit}`, query);
};

/**
 * 账单列表
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_WFund_list = (page, limit, query) => {
  return API.get(`/api/v1.0/WFund/${page}/${limit}`, query);
};

/**
 * 提款记录列表
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_WWithDrawal_list = (page, limit, query) => {
  return API.get(`/api/v1.0/WWithDrawal/${page}/${limit}`, query);
};


