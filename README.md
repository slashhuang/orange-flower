# 橘花网页
## 前端代码规范参照腾讯团队
[腾讯前端规范](http://alloyteam.github.io/CodeGuide/)

  ---
##开发方案  
  
###head头部使用统一meta标签内容
    <meta charset="utf-8">
    <meta content="yes" name="apple-mobile-web-app-capable"><meta content="yes"name="apple-touch-fullscreen">
    <meta content="telephone=no" name="format-detection">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="MobileOptimized" content="320">
    
###body部分    
- 整体宽度按照width=320px作为100%开发   
- 主页分类图标按照40*40切图开发 
- 热卖商品图片区域为75*75大小构建  
- 首页大图及广告位设置width=100%即可,图片大小工作由产品把握 

---

###代码规范  
- 命名规则      
    * class一律采用小写加中划线的方式，不允许使用大写字母
    * 避免class与id重名    
    * 禁止直接给标签设置样式 
    * 开发者标签原生的样式加入reset.css   
- 提交git  
    * 自己测试用的文件加入.gitignore  
    * 没有完全写好的代码加上** @TODO **别忘了
- JavaScript代码   
    * js第三方代码库放在lib文件夹下
    * 复用的swiper放在lib下，修改需加上开发者个人备注
    * 个人负责的js代码在js_models文件下，自己建文件夹放代码
    * data-main程序入口按照开发者自己写入
