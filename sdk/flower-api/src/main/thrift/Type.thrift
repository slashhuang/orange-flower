/**
 * 公用类型
 */

namespace java com.orange.flower.openapi.type
namespace js Type
namespace cocoa Type

/**
 * 时间戳
 */
typedef i64 Timestamp

/**
 * 日期,格式:yyyy-MM-dd HH:mm:ss
 */
typedef string Date

/**
 * json字符串
 */
typedef string Json

/**
 * 空的long
 * Thrift的基本类型不支持null,在做插入操作的时候用来表示主键为空
 */
const i64 NULL_LONG = 0
/**
 * 同上
 */
const i32 NULL_INT = 0
/**
 * 同上
 */
const i16 NULL_SHORT = 0
/**
 * 使用short来表示可为空boolean值,0表示空
 */
const i16 NULL_BOOLEAN = 0
/**
 * 1表示true
 */
const i16 TRUE_BOOLEAN = 1
/**
 * -1表示false
 */
const i16 FALSE_BOOLEAN = -1

/**
 * 系统业务
 */
enum TBiz {
    /**
     * 用户
     */
    USER = 1,
    /**
     * 商品
     */
    PRODUCT = 2
}

/**
 * 对象状态
 */
enum TStatus {
    /**
     * 启用/通过
     */
    ENABLED = 0,
    /**
     * 审核中
     */
    AUDITING = 1,
    /**
     * 停用/屏蔽
     */
    DISABLED = 2,
    /**
     * 删除
     */
    DELETED = 3,
    /**
     * 拒绝/不通过
     */
    REJECTED = 4
}

/**
 * 设备类型
 */
enum TDeviceType {
    /**
     * 未知
     */
    UNKNOWN = 0,
    /**
     * 安卓
     */
    ANDROID = 1,
    /**
     * 苹果
     */
    IOS = 2,
    /**
     * 苹果企业版
     */
    IOS_EP = 3,
    /**
     * Windows Phone
     */
    WP = 4,
    /**
     * 个人电脑
     */
    PC = 5
}

/**
 * 性别
 */
enum TGender {
    /**
     * 男
     */
    MALE = 0,
    /**
     * 女
     */
    FEMALE = 1,
    /**
     * 未知
     */
    UNKNOWN = 2
}

/**
 * Sns类型
 */
enum TSnsType {
    /**
     * 新浪微博
     */
    WEIBO = 0,
    /**
     * QQ
     */
    QQ = 1,
    /**
     * 微信
     */
    WEIXIN = 2,
    /**
     * 人人网
     */
    RENREN = 3,
    /**
     * 云服务
     */
    CLOUD = 4
}

/**
 * key,value对
 */
struct TPair {
    1: optional string key,
    2: optional string value
}

/**
 * number key,value对
 */
struct TNPair {
    1: optional i64 key,
    2: optional string value
}

/**
 * 通用异常对象
 */
exception TAppException {
    /**
     * 错误代码
     */
    1: optional i32 code = 1,
    /**
     * 错误消息
     */
    2: optional string msg,
    /**
     * 附加参数
     */
    3: optional map<string, string> params = {},
    /**
     * 错误详细信息,仅供debug用
     */
    4: optional string detail
}
/**
 * 用户
 */
struct TUser {
    /**
     * 编号
     */
    1: optional i64 id,
    /**
     * 昵称
     */
    2: optional string name,
    /**
     * 头像文件编号
     */
    3: optional i64 avatar,
    /**
     * 头像地址
     */
    4: optional string avatarUrl,
    /**
     * 大头像地址
     */
    5: optional string largeAvatarUrl,
    /**
     * 性别
     */
    6: optional TGender gender,
    /**
     * 签名
     */
    7: optional string sign,
    /**
     * 学校
     */
    8: optional string school,
    /**
     * 院系
     */
    9: optional string department,
    /**
     * 入学年份
     */
    10: optional i16 enterYear,
    /**
     * 注册时间
     */
    11: optional Timestamp date,
    /**
     * 更新时间戳
     */
    12: optional Timestamp ts,
    /**
     * 状态
     */
    13: optional TStatus status = TStatus.ENABLED,
    /**
     * 附加属性
     */
    14: optional map<string, string> attrs = {}
}

/**
 * 地理位置
 */
struct TLocation {
    /**
     * 纬度乘以10e6取整
     */
    1: optional i32 latE6 = 0,
    /**
     * 经度乘以10e6取整
     */
    2: optional i32 lngE6 = 0,
    /**
     * 地址
     */
    3: optional string address,
    /**
     * 距离（单位：米）
     */
    4: optional i32 distance = 0
}

/**
 * 文件类型
 */
enum TFileType {
    /**
     * 普通二进制
     */
    BIN = 0,
    /**
     * 文本
     */
    TEXT = 1,
    /**
     * 图片
     */
    IMAGE = 2,
    /**
     * 音频
     */
    AUDIO = 3,
    /**
     * 视频
     */
    VIDEO = 4,
    /**
     * 文档
     */
    DOC = 5,
    /**
     * 压缩文件
     */
    ZIP = 6
}

/**
 * 文件
 */
struct TFile {
    /**
     * 编号
     */
    1: optional i64 id,
    /**
     * 类型
     */
    2: optional TFileType type,
    /**
     * 文件名
     */
    3: optional string name,
    /**
     * 访问地址
     */
    4: optional string url,
    /**
     * 缩略图地址,仅图片视频有效
     */
    5: optional string thumbUrl,
    /**
     * 文件大小,字节
     */
    6: optional i64 size
    /**
     * 音频或视频时长,秒
     */
    7: optional i64 duration,
    /**
     * 更新时间戳
     */
    8: optional Timestamp ts,
    /**
     * 状态
     */
    9: optional TStatus status = TStatus.ENABLED,
    /**
     * 图片宽度
     */
    10: optional i32 width,
    /**
     * 图片高度
     */
    11: optional i32 height
}