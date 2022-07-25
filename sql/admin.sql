/*
Navicat MySQL Data Transfer

Source Server         : ROOT
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : admin

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2022-07-25 10:59:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) DEFAULT NULL,
  `name` text,
  `cid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '家用电器', '1001');
INSERT INTO `category` VALUES ('1', '手机/运营商/数码', '1002');
INSERT INTO `category` VALUES ('1', '电脑/办公', '1003');
INSERT INTO `category` VALUES ('1', '家具/家居', '1004');
INSERT INTO `category` VALUES ('1001', '电视', '10001');
INSERT INTO `category` VALUES ('1001', '空调', '10002');
INSERT INTO `category` VALUES ('1001', '洗衣机', '10003');
INSERT INTO `category` VALUES ('1001', '冰箱', '10004');
INSERT INTO `category` VALUES ('1002', '手机通讯', '10001');
INSERT INTO `category` VALUES ('1002', '运营商', '10002');
INSERT INTO `category` VALUES ('1002', '摄影', '10003');
INSERT INTO `category` VALUES ('1002', '摄像', '10004');
INSERT INTO `category` VALUES ('1003', '电脑整机', '10001');
INSERT INTO `category` VALUES ('1003', '电脑配件', '10002');
INSERT INTO `category` VALUES ('1003', '外设产品', '10003');
INSERT INTO `category` VALUES ('1003', '游戏设备', '10004');
INSERT INTO `category` VALUES ('1004', '厨具', '10001');
INSERT INTO `category` VALUES ('1004', '家纺', '10002');
INSERT INTO `category` VALUES ('1004', '灯具', '10003');
INSERT INTO `category` VALUES ('1004', '家具', '10004');
INSERT INTO `category` VALUES ('10001', '超薄点视', '100001');
INSERT INTO `category` VALUES ('10001', '全面屏点视', '100002');

-- ----------------------------
-- Table structure for content
-- ----------------------------
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `id` int(11) DEFAULT NULL,
  `name` text NOT NULL,
  `pid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of content
-- ----------------------------
INSERT INTO `content` VALUES ('1', '广告分类', '1001');
INSERT INTO `content` VALUES ('1001', 'banner广告', '10001');
INSERT INTO `content` VALUES ('1001', '直播代购', '10002');
INSERT INTO `content` VALUES ('19412', '刚刚赚了很多钱', '89602');
INSERT INTO `content` VALUES ('7231', '嘎嘎嘎', '834');

-- ----------------------------
-- Table structure for contentinfo
-- ----------------------------
DROP TABLE IF EXISTS `contentinfo`;
CREATE TABLE `contentinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contentinfo
-- ----------------------------
INSERT INTO `contentinfo` VALUES ('1', '10001', 'OPPO Watch', 'https://pro.jd.com/mall/active/tG3nBBhghqhfM69HoJw9ZoDaT7d/index.html?extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcIjg5YzRjMTUyLWUwZjktNGQ0OC05NDI4LTJhODQ4NWJjNTc1N1wiLFwibWF0ZXJpYWxfaWRcIjpcIjE4NTAxMDcyMjlcIixcInBvc19pZFwiOlwiNDI3MlwiLFwic2lkXCI6XCJmODcwZmM2MS1jYjc3LTQwN2UtOTM1ZC1jYzhlZTc0MTYyZTdcIn0ifQ==&jd_pop=89c4c152-e0f9-4d48-9428-2a8485bc5757&abt=1', '//img14.360buyimg.com/pop/s1180x940_jfs/t1/110562/14/10737/42247/5e81bb76E6fffa006/b3f703f750bd37ea.jpg.webp');
INSERT INTO `contentinfo` VALUES ('3', '90410', '椅子', 'https://channel-m.jd.com/pc/psp/10979325649?imup=CgwKBnd3dGxpdRIAGAASEAjR7azzKBDmZhoAIJpNKAEYsRsgACoUaWwsdWEseGdiLGdhLGNpYSxiYWEyAmlsOioKCWpkX2hiZHl5MRDnYRgCIJL50ty1x-S1dyjCo6Q3MMGjpDc4E0CAgCA&extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcIjJiNmEyNjE5LWE4MmItNGMyNi1iYzYwLWI3ZGE1NzljOWRkZVwiLFwibWF0ZXJpYWxfaWRcIjpcIjg2MDUxMzIyOTY2NTg2NjQ1OTRcIixcInBvc19pZFwiOlwiMzUwNVwiLFwic2lkXCI6XCJmN2Y5ODM2ZS0yZTViLTQyMTUtYWNiMi04NDdmZmI2N2U2ZDdcIn0ifQ==&jd_pop=2b6a2619-a82b-4c26-bc60-b7da579c9dde&abt=0', 'https://img12.360buyimg.com/pop/s1180x940_jfs/t1/117573/18/9029/83238/5ed7c92aE789977c2/b11a288a7284cdfe.jpg.webp');
INSERT INTO `contentinfo` VALUES ('4', '10002', '123', '123', '123');
INSERT INTO `contentinfo` VALUES ('7', '10002', '555', '55', '55');

-- ----------------------------
-- Table structure for params
-- ----------------------------
DROP TABLE IF EXISTS `params`;
CREATE TABLE `params` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemCatId` text NOT NULL,
  `paramData` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10018 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of params
-- ----------------------------
INSERT INTO `params` VALUES ('10015', '100001', '[{\"value\":\"端口参数\",\"children\":[{\"childValue\":\"USB2.0接口\",\"value\":\"3\"},{\"childValue\":\"HDMI2.0接口\",\"value\":\"2\"}]},{\"value\":\"USB支持格式\",\"children\":[{\"childValue\":\"USB支持音频格式\",\"value\":\"aac.flac.mp3.wav\"},{\"childValue\":\"USB支持图片格式\",\"value\":\"JPEG/PNG/BMP\"},{\"childValue\":\"USB支持视频格式\",\"value\":\".avi .mpg .ts .mkv .mp4 .flv .mov .rm .rmvb\"}]}]');
INSERT INTO `params` VALUES ('10017', '10003', '[{\"value\":\"显示器\",\"children\":[{\"childValue\":\"屏幕类型\",\"value\":\"\"},{\"childValue\":\"屏幕尺寸\",\"value\":\"\"},{\"childValue\":\"物理分辨率\",\"value\":\"\"},{\"childValue\":\"显示比例\",\"value\":\"\"}]},{\"value\":\"机器规格\",\"children\":[{\"childValue\":\"产品尺寸（mm）\",\"value\":\"\"},{\"childValue\":\"产品净重（kg）\",\"value\":\"\"}]},{\"value\":\"内存\",\"children\":[{\"childValue\":\"插槽数量\",\"value\":\"\"}]}]');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `category` text NOT NULL,
  `image` text NOT NULL,
  `sellPoint` text NOT NULL,
  `price` text NOT NULL,
  `cid` text NOT NULL,
  `num` text NOT NULL,
  `barcode` text NOT NULL,
  `status` text NOT NULL,
  `created` text NOT NULL,
  `updated` text NOT NULL,
  `descs` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10042 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('10015', '三体-刘慈欣', '', '', '未来科幻', '99', '', '999', '', '', '', '', '<p>这是大刘的得意之作，连奥巴马都喜欢看！</p>');
INSERT INTO `project` VALUES ('10028', '梦里花落知多少', '', '2.jpg', '小时代！！！', '11', '10001', '11', '', '', '', '', '<p>还不错，但是要看书籍，不要看电影</p>');
INSERT INTO `project` VALUES ('10031', '我与地坛', '', '', '做一个不动声色的人', '55', '', '464', '', '', '', '', '人生尔尔，错过了，就是一辈子');
INSERT INTO `project` VALUES ('10032', '舞！舞！舞！', '', '', '村上春树经典作品', '234', '43', '34', '', '', '', '', '人不是慢慢变老的，而是一瞬间变老的');
INSERT INTO `project` VALUES ('10033', '岁月神偷', '', '', '经典书籍', '23', '', '23', '', '', '', '', '我没有精力去认识一个新的人，或者花力气去宠福新维系一段感情，跟没办法在把自己的故事讲述一遍又一遍');
INSERT INTO `project` VALUES ('10035', '解忧杂货店', '', '', '无论现在有多么的不开心，你要相信明天会比今天更好', '34', '', '12', '', '', '', '', '<p>无论现在有多么的不开心，你要相信明天会比今天更好!!!!</p>');
INSERT INTO `project` VALUES ('10038', '小王子aaaa', '手机/运营商/数码', 'http://localhost:1234/1658714314218-pz_60.gif', '写给成年人的童话故事', '20', '1002', '1', '', '1', '', '', '<p>规范和更多粉丝</p>');
INSERT INTO `project` VALUES ('10039', '笑场', '', 'mock\\upload\\1585277506405-u=2137641711,889921437&fm=26&gp=0.jpg', '李诞的作品，很有意思，集成了扯经', '55', '100002', '1000', '', '1', '', '', '<p>未曾开言，我先笑场，笑过之后，听我来诉一诉衷肠</p>');
INSERT INTO `project` VALUES ('10040', '万历十五年', '', 'mock\\upload\\1585277681739-u=2137641711,889921437&fm=26&gp=0.jpg', '人民的名义里面出现过很多次', '45', '10002', '26', '', '1', '', '', '<p>在明朝当皇帝其实没那么幸福，比其清朝来说，还是清朝的皇帝牛逼，毕竟清朝才是更加牛逼的中央集权制</p>');
INSERT INTO `project` VALUES ('10041', '万寿寺【王小波】', '', 'mock\\upload\\1591151723874-u=2534506313,1688529724&fm=26&gp=0.jpg', '很好看', '20', '100001', '99', '', '1', '', '', '<div>测试新的内容····</div>');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'iwen', '123', 'iwen@iwenwiki.com');
INSERT INTO `user` VALUES ('2', 'admin', 'admin', '123@qq.com');
INSERT INTO `user` VALUES ('11', 'itbaizhan', '123', 'itbaizhan@sxt.cn');
