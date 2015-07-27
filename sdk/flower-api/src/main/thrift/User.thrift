/**
* 用户信息接口
*/

include "Type.thrift"

namespace java com.orange.flower.openapi.user
namespace js User
namespace cocoa User

/**
 * session token name
 */
const string SESSION_TOKEN = "f_st"

/**
 * 网络类型
 */
enum TNetworkType {
    /**
     * 无线局域网
     */
    WIFI = 0,
    /**
     * 2G网络
     */
    G2 = 1,
    /**
     * 3G网络
     */
    G3 = 2,
    /**
     * 4G网络
     */
    G4 = 3
}

/**
 * 设备环境
 */
struct TDeviceEnv {
    /**
     * 位置
     */
    1: optional Type.TLocation location,
    /**
     * 网络类型
     */
    2: optional TNetworkType network
}

/**
 * 设备
 */
struct TDevice {
    /**
     * 设备唯一标识
     */
    1: optional string id,
    /**
     * 设备类型
     */
    2: optional Type.TDeviceType type,
    /**
     * 设备型号名称
     */
    3: optional string model,
    /**
     * 应用版本
     */
    4: optional string appVersion,
    /**
     * 应用渠道
     */
    5: optional string appChannel,
    /**
     * 推送token
     */
    6: optional string pushToken,
    /**
     * 屏幕宽度
     */
    7: optional i32 screenWidth,
    /**
     * 屏幕高度
     */
    8: optional i32 screenHeight,
    /**
     * 网络服务商
     */
    9: optional string isp,
    /**
     * 系统版本
     */
    10: optional string osVersion,
    /**
     * 手机设备编号
     */
    11: optional string imei,
    /**
     * SIM卡编号
     */
    12: optional string imsi,
    /**
     * 设备环境
     */
    13: optional TDeviceEnv env
}

/**
 * 完整用户资料
 */
struct TUserProfile {
    /**
     * 用户详情
     */
    1: Type.TUser user,
    /**
     * 生日
     */
    2: optional Type.Timestamp birthday,
    /**
     * 学校代码
     */
    3: optional string schoolCode,
    /**
     * 院系代码
     */
    4: optional string departmentCode,
    /**
     * 专业代码
     */
    5: optional string majorCode,
    /**
     * 所在地地区码
     */
    6: optional string regionCode,
    /**
     * 专业
     */
    7: optional string major,
    /**
     * 所在地
     */
    8: optional string region,
    /**
     * 邮箱
     */
    9: optional string email,
    /**
     * 手机号
     */
    10: optional string mobile,
    /**
     * qq号
     */
    11: optional string qq,
    /**
     * 积分
     */
    12: optional i32 point,
    /**
     * 更新时间戳
     */
    13: optional Type.Timestamp ts,
    /**
     * 用户信息是否完整
     */
    14: optional bool complete,
    /**
     * 所在运营域
     */
    15: optional i32 domain,
    /**
     * 所在运营域名称
     */
    16: optional string domainName,
    /**
     * 是否通过实名认证
     */
    17: optional Type.TStatus certified,
    /**
     * 真名
     */
    18: optional string realName,
    /**
     * 身份证号
     */
    19: optional string idNo,
    /**
     * 学历
     */
    20: optional string degree
}

/**
 * 会话
 */
struct TSession {
    /**
     * 用户信息
     */
       1: optional TUserProfile user,
       /**
        * 会话token
        */
       3: optional string token,
       /**
        * 是否匿名用户
        */
       4: optional bool guest
}

/**
 * 用户页
 */
struct TUserPage {
    /**
     * 下一页游标
     */
    1: optional i64 cursor,
    /**
     * 用户列表
     */
    2: optional list<Type.TUser> items = []
}

/**
 * 注册或者修改用户信息表单
 */
struct TUserForm {
    /**
     * 昵称
     */
    1: optional string name,
    /**
     * 密码,仅在注册时有效
     */
    2: optional string password,
    /**
     * 头像文件编号
     */
    3: optional i64 avatar,
    /**
     * 性别
     */
    4: optional Type.TGender gender,
    /**
     * 生日
     */
    5: optional Type.Timestamp birthday,
    /**
     * 签名
     */
    6: optional string sign,
    /**
     * 学校代码
     */
    7: optional string schoolCode,
    /**
     * 院系代码
     */
    8: optional string departmentCode,
    /**
     * 专业
     */
    9: optional string major,
    /**
     * 入学年份
     */
    10: optional i16 enterYear,
    /**
     * 邮箱
     */
    11: optional string email,
    /**
     * 手机号
     */
    12: optional string mobile,
    /**
     * qq号
     */
    13: optional string qq,
    /**
     * 所在地区码
     */
    14: optional string regionCode,
    /**
     * 背景墙图片
     */
    15: optional i64 wall,
    /**
     * 短信校验码
     */
    16: optional string verifySms,
    /**
     * 运营域
     */
    17: optional i32 domain,
    /**
     * 邀请码
     */
    18: optional string inviteCode,
    /**
     * 个人标签
     */
    19: optional list<string> tags,
    /**
     * 渠道
     */
    20: optional string channel,
    /**
     * 设备唯一标识
     */
    21: optional string deviceId,
    /**
     * 真名
     */
    22: optional string realName,
    /**
     * 身份证号
     */
    23: optional string idNo,
    /**
     * 学历
     */
    24: optional string degree
}

/**
 * 经历
 */
struct TExperience {
    /**
     * 标题
     */
    1: optional string title,
    /**
     * 内容
     */
    2: optional string body,
    /**
     *开始时间
     */
    3: optional Type.Timestamp beginAt,
    /**
     *结束时间
     */
    4: optional Type.Timestamp endAt
}


/**
 * 用户实名信息
 */
struct TRealUser {
    /**
     * 真名
     * @deprecated
     */
    1: optional string name,
    /**
     * 手机号
     * @deprecated
     */
    2: optional string mobile,
    /**
     * 短信校验码
     * @deprecated
     */
    3: optional string verifySms,
    /**
     * 身份证号
     * @deprecated
     */
    4: optional string idNo,
    /**
     * 相关图片,0为身份证正面,1为身份证反面,2为学生证
     */
    5: optional list<Type.TFile> imgs,
    /**
     * 学号
     * @deprecated
     */
    6: optional string stNo,
    /**
     * 身高
     */
    7: optional i32 height,
    /**
     * 体重
     */
    8: optional i32 weight,
    /**
     * 生活照
     */
    9: optional list<Type.TFile> pics,
    /**
     * 性别
     * @deprecated
     */
    10: optional Type.TGender gender,
    /**
     * 完成度
     */
    11: optional i32 percent,
    /**
    * 教育经历
    */
    12: optional list<TExperience> educations,
    /**
     * 实践经历
     */
    13: optional list<TExperience> practices,
    /**
     * 校内经历
     */
    14: optional list<TExperience> campuss,
    /**
     * 证书
     */
    15: optional list<string> certs,
    /**
     * 介绍
     */
    16: optional string introduction,
    /**
     * 个人标签
     */
    17: optional list<string> tags,
    /**
     * 邮箱
     * @deprecated
     */
    18: optional string email,
   /**
     * 学校
     * @deprecated
     */
    19: optional string school,
    /**
     * 专业
     * @deprecated
     */
    20: optional string major,
    /**
     * 学历
     * @deprecated
     */
    21: optional string degree,
    /**
     * 入学年份
     * @deprecated
     */
    22: optional i16 enterYear,
    /**
     * 居住地
     * @deprecated
     */
    23: optional string residence,
    /**
     * 居住地代码
     * @deprecated
     */
    24: optional string residenceCode,
    /**
     * 求职意向
     */
    25: optional list<string> intensions,
    /**
     * 问答兴趣
     */
    26: optional list<i32> qtags,
    /**
     * 是否通过实名认证
     */
    27: optional Type.TStatus certified
}

/**
 * 提醒配置
 */
struct TRemindConf {
    /**
     * 禁用所有
     */
    1: optional bool disableAll = false,
    /**
     * 消息
     */
    2: optional bool msg = true,
    /**
     * 评论
     */
    3: optional bool comment = true,
    /**
     * 新粉丝
     */
    4: optional bool fan = true,
    /**
     * At我
     */
    5: optional bool atMe = true,
    /**
     * 赞
     */
    6: optional bool like = true
}

/**
 * 用户个人设置
 */
struct TUserSetting {
    /**
     * 私信隐私类型,0=接受所有,1=我关注的人,2=不接收
     */
    1: optional i16 msgPrivacy
}

/**
 * 用户关系类型
 */
enum TRelationType {
    /**
     * 我关注他
     */
    FOLLOW = 0,
    /**
     * 他关注我
     */
    FAN = 1,
    /**
     * 我屏蔽他
     */
    BAN = 2
}

/**
 * 用户关系动作
 */
enum TRelationAction {
    /**
     * 关注
     */
    FOLLOW = 0,
    /**
     * 取消关注
     */
    UN_FOLLOW = 1,
    /**
     * 屏蔽
     */
    BAN = 2,
    /**
     * 取消屏蔽
     */
    UN_BAN = 3
}

enum TRecommendType {
    /**
     * 积分高
     */
    POINT = 0,
    /**
     * 活跃的
     */
    ACTIVE = 1,
    /**
     * 可能认识的
     */
    RELATION = 2,
    /**
     * 附近的
     */
    NEARBY = 3,
    /**
     * AT
     */
    AT = 4
}

/**
 * Sns绑定
 */
struct TSnsBind {
    /**
     * 编号
     */
    1: optional i64 id,
    /**
     * Sns类型
     */
    2: optional Type.TSnsType type,
    /**
     * 访问token
     */
    3: optional string accessToken,
    /**
     * 访问token过期时间,毫秒时间戳
     */
    4: optional i64 expire,
    /**
     * 刷新token
     */
    5: optional string refreshToken,

    /**
     * 签名用户数据
     */
    6: optional string signature
}

/**
 * 会话管理服务
 */
service TSessionService {
    /**
     * 创建一个匿名会话
     * @param deviceId 设备唯一标识
     * @param 运营域, 设备第一次创建匿名会话时有效,以后会读取服务端配置
     */
    TSession guest(1: string deviceId, 2: i32 domain) throws (1: Type.TAppException ex),

    /**
     * 登录
     *
     * @param name 登录名
     * @param password 密码
     * @param loginType 登录类型,0=密码,1=短信验证码
     * @param domain 运营域
     *
     * @return 会话token,对于以后的http api调用,必须在http头加上这个header: m_st=xxx
     */
    TSession login(1: string name, 2: string password, 3: i16 loginType, 4: i32 domain) throws (1: Type.TAppException ex),

    /**
     * Sns oauth登录
     *
     * @param snsBind Sns绑定信息
     */
    TSession snsLogin(1: TSnsBind snsBind) throws (1: Type.TAppException ex),

    /**
     * 注销
     */
    void logout() throws (1: Type.TAppException ex),

    /**
     * 获取当前会话
     */
    TSession getSession() throws (1: Type.TAppException ex),

    /**
     * 更新设备信息,每次获取到session后,都必须上报设备信息
     */
    void updateDevice(1: TDevice device) throws (1: Type.TAppException ex),

    /**
     * 心跳,更新客户端环境,建议每三分钟一次,以下情况需要单独调用:
     *     网络发生改变,如wifi切换到了3g
     *     app从暂停状态恢复
     * @param env 设备类型
     *
     */
    void heartbeat(1: TDeviceEnv env) throws (1: Type.TAppException ex),

    /**
     * 应用将被关闭,或者进入后台将被暂停前调用
     */
    void offline() throws (1: Type.TAppException ex)
}

/**
 * 用户服务
 */
service TUserService {
    /**
     * 发送重置密码邮件
     *
     * @param email 邮箱
     * @param deviceId 设备唯一标识
     *
     * @return 下次发送短信验证码的间隔,秒
     */
    i32 sendVerifyEmail(1: string email, 2: string deviceId) throws (1: Type.TAppException ex),

    /**
     * 发送短信验证码
     *
     * @param mobile 手机号
     * @param deviceId 设备唯一标识
     * @param isRegister 是否注册,注册时发现已被注册会报异常MOBILE_EXIST
     * @param useVoice 是否使用语音验证码
     *
     * @return 下次发送短信验证码的间隔,秒
     */
    i32 sendVerifySms(1: string mobile, 2: string deviceId,3: bool isRegister, 4: bool useVoice) throws (1: Type.TAppException ex),

    /**
     * 校验短信验证码,返回对应认证token,服务器根据这个token来判断后续动作合法性
     *
     * @param mobile 手机号
     * @param verifySms 短信验证码
     *
     * @return 认证token
     */
    string getVerifyToken(1: string mobile, 2: string verifySms) throws (1: Type.TAppException ex),

    /**
     * 昵称是否被占用
     *
     * @param name 昵称
     */
    bool isUserNameUsed(1: string name) throws (1: Type.TAppException ex),

    /**
     * 注册用户
     *
     * @param verifyToken 认证token,也可以直接把verifySms直接放到TUserForm.verifySms
     * @param form 用户信息表单
     *
     * @return 会话token
     */
    TSession registerUser(1: string verifyToken, 2: TUserForm form) throws (1: Type.TAppException ex),

    /**
     *  重置密码
     *
     * @param verifyToken 认证token
     * @param password 新密码
     */
    void resetPassword(1: string verifyToken, 2: string password) throws (1: Type.TAppException ex),

    /**
     * 获取最新完整用户资料
     * 应用应该保存TUserProfile到本地,下次更新传递TUserProfile.ts给服务器,如果没有新的用户资料,则服务器返回null,用来提高个人首页加载性能
     *
     * @param id 用户编号,自己写0或者对应编号
     * @param ts 上次获取用户资料时间戳,没有写0
     */
    TUserProfile getUserProfile(1: i64 id, 2: Type.Timestamp ts) throws (1: Type.TAppException ex),

    /**
     * 获取用户信息
     * 
     * @param id 用户编号
     */
    Type.TUser getUser(1: i64 id) throws (1: Type.TAppException ex),
    
    /**
     * 批量获取用户信息
     *
     * @param ids 用户id列表
     */
    map<i64, Type.TUser> mgetUser(1: list<i64> ids) throws (1: Type.TAppException ex),

    /**
     * 获取用户信息
     *
     * @param id 用户编号
     */
    Type.TUser getUserByName(1: string name) throws (1: Type.TAppException ex),

    /**
     * 当前用户是否有密码
     */
    bool hasPassword() throws (1: Type.TAppException ex);

    /**
     * 查找用户
     *
     * @param keyword 昵称关键字
     * @param onlyFollow 只搜索跟随用户
     * @param cursor 分页游标
     * @param size 读取条数
     */
    TUserPage findUsers(1: string keyword, 2: bool onlyFollow, 3: i64 cursor, 4: i32 size) throws (1: Type.TAppException ex),

    /**
     * 推荐用户
     *
     * @param recommendType 推荐类型
     * @param size 推荐个数
     */
    list<Type.TUser> recommendUsers(1: TRecommendType recommendType, 2: i32 size) throws (1: Type.TAppException ex),
}

/**
 * 用户配置服务
 */
service TUserConfService {
    /**
     *  修改用户个人信息,留空的字段表示忽略
     *
     * @param form 用户信息表单
     */
    void updateUser(1: TUserForm form) throws (1: Type.TAppException ex),

    /**
     *  修改密码
     *
     * @param verifyToken 认证token
     * @param password 新密码
     */
    void updatePassword(1: string oldPassword, 2: string password) throws (1: Type.TAppException ex),

    /**
     *  修改手机号
     *
     * @param verifyToken 通过老手机号活的的认证token
     * @param verifySms 短信验证码
     * @param mobile 新手机号
     * @param force 是否强制更新
     */
    void updateMobile(1: string verifyToken, 2: string verifySms, 3: string mobile, 4: bool force) throws (1: Type.TAppException ex),

    /**
     * 增加一个Sns绑定
     *
     * @param snsBind Sns绑定
     */
    TSnsBind addSnsBind(1: TSnsBind snsBind) throws (1: Type.TAppException ex),

    /**
     * 删除一个Sns绑定
     *
     * @param id Sns绑定编号
     */
    void removeSnsBind(1: i64 id) throws (1: Type.TAppException ex),

    /**
     * 获取所有Sns绑定列表
     */
    list<TSnsBind> getSnsBinds() throws (1: Type.TAppException ex),

    /**
     * 获取提醒配置
     */
    TRemindConf getRemindConf() throws (1: Type.TAppException ex),

    /**
     * 更新提醒配置
     */
    void updateRemind(1: TRemindConf remindConf) throws (1: Type.TAppException ex),
    /**
     * 获取实名认证信息
     */
    TRealUser getRealUser() throws (1: Type.TAppException ex),

    /**
     * 更新实名认证信息
     */
    void updateRealUser(1: TRealUser realUser, 2: bool force) throws (1: Type.TAppException ex),

    /**
     * 更新简历
     */
    void updateResume(1: TRealUser realUser) throws (1: Type.TAppException ex),

    /**
     * 获取简历
     */
    TRealUser getResume() throws (1: Type.TAppException ex),
    /**
     * 获取个人配置
     */
    TUserSetting getSetting() throws (1: Type.TAppException ex),

    /**
     * 更新个人配置
     */
    void updateSetting(1: TUserSetting setting) throws (1: Type.TAppException ex),
    /**
     * 提交实名认证
     */
    void submitCertificate() throws (1: Type.TAppException ex)

}

/**
 * 用户关系服务
 */
service TRelationService {
    /**
     * 修改和一个用户的关系
     *
     * @param userId 用户编号
     * @param action 关系动作
     */
    i32 changeRelation(1: i64 userId, 2: TRelationAction action) throws (1: Type.TAppException ex),

    /**
     * 批量修改和多个用户的关系
     *
     * @param userIds 用户编号列表
     * @param action 关系动作
     */
    void mchangeRelation(1: list<i64> userIds, 2: TRelationAction action) throws (1: Type.TAppException ex),

    /**
     * 获取指定关系类型用户页
     *
     * @param userId 用户编号
     * @param relationType 关系类型
     * @param cursor 分页游标
     * @param size 读取条数
     */
    TUserPage getRelationUsers(1: i64 userId, 2: TRelationType relationType, 3: i64 cursor, 4: i32 size) throws (1: Type.TAppException ex)
}

/**
 * 用户兴趣服务
 */
service TInterestService {
    /**
     * 切换赞状态
     *
     * @param biz 业务类型
     * @param bizId 被赞对象编号
     *
     * @return 赞总数
     */
    i32 toggleLike(1: Type.TBiz biz, 2: i64 bizId) throws (1: Type.TAppException ex),

    /**
     * 切换收藏状态
     *
     * @param biz 业务类型
     * @param bizId 被收藏对象编号
     */
    bool toggleFav(1: Type.TBiz biz, 2: i64 bizId) throws (1: Type.TAppException ex),

    /**
     * 举报内容
     *
     * @param biz 业务类型
     * @param bizId 被收藏对象编号
     * @param type 类型, 0=激进时政或敏感话题,1=广告或垃圾信息,2=色情、淫秽或低俗内容,3=骚扰或恶意攻击,4=其他
     * @param desc 举报描述
     */
    void tipOff(1: Type.TBiz biz, 2: i64 bizId, 3: i16 type, 4: string desc) throws (1: Type.TAppException ex),
    
    /**
     * 切换参与状态
     *
     * @param biz 业务类型
     * @param bizId 参与对象编号
     */
    i32 toggleJoin(1: Type.TBiz biz, 2: i64 bizId) throws (1: Type.TAppException ex),

    /**
     * 切换关注状态
     *
     * @param biz 业务类型
     * @param bizId 参与对象编号
     */
    i32 toggleFollow(1: Type.TBiz biz, 2: i64 bizId) throws (1: Type.TAppException ex),

    /**
     * 记录一次分享
     *
     * @param type sns类型
     * @param url 分享的url
     *
     * @return 分享所获得的积分
     */
    i32 share(1: Type.TSnsType type, 2: string url) throws (1: Type.TAppException ex)
}