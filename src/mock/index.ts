export const DEEP_SEEK_API_KEY = 'sk-5315771729b94896a4aa627fae9df25b';

export const currentUser = {
    id: '001',
    name: '迷雾',
    avatar: 'https://www.koegen.ai/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1713124304190410752%2F8kKzDyhD_normal.jpg&w=64&q=75',
};

export interface TrendingTopicItem {
    rank: number;
    title: string;
    views: string;
}

export const trendingTopics: TrendingTopicItem[] = [
    { rank: 1, title: '李在明推进将韩总统府迁回青瓦台', views: '1138.2万' },
    { rank: 2, title: '被毒蛇咬伤后如何自救', views: '1876.6万' },
    { rank: 3, title: '端午节假期国内出游1.19亿人次', views: '1698.0万' },
    { rank: 4, title: '乌克兰用什么手段袭击克里米亚大桥', views: '1390.2万' },
    { rank: 5, title: '泰国空军宣布购买新型战斗机', views: '1029.9万' },
    { rank: 6, title: '李在明当选韩国总统', views: '1536.4万' },
    { rank: 7, title: '官方通报三亚女游客疑被蛇咬伤身亡', views: '763.0万' },
    { rank: 8, title: '以军为何首次承认在加沙用激光武器', views: '565.2万' },
    { rank: 9, title: '各地提振消费政策持续加力', views: '931.9万' },
    { rank: 10, title: '环卫工在河沟打捞起80万现金？假的', views: '843.2万' },
    { rank: 11, title: '李在明开启总统任期：将寻求韩朝对话', views: '2074.0万' },
    { rank: 12, title: '女子被毒蛇咬伤送医身亡 医院回应', views: '690.4万' },
    { rank: 13, title: '黑救护车转运癌症病人收费八千多元', views: '624.7万' },
    { rank: 14, title: '中韩关系会回暖吗', views: '1257.9万' },
    { rank: 15, title: '女孩在家自制起泡胶晕倒', views: '511.4万' },
    { rank: 16, title: '媒体：郑钦文已创造生涯历史', views: '462.8万' },
    { rank: 17, title: '全国网友都在偶遇高考试卷押运车', views: '418.7万' },
    { rank: 18, title: '尹锡悦夫妇现身投票站笑着回避提问', views: '378.9万' },
    { rank: 19, title: '王毅会见美国新任驻华大使庞德伟', views: '342.8万' },
    { rank: 20, title: '中国女排“换血”亮相', views: '310.2万' },
    { rank: 21, title: '俄罗斯24小时内3起爆炸案释放何信号', views: '280.7万' },
    { rank: 22, title: '卫星图显示13架俄大型飞机遭摧毁', views: '254.0万' },
    { rank: 23, title: '蒋雨融哈佛毕业演讲为何引争议', views: '229.8万' },
    { rank: 24, title: '爸妈应援照亮高三学子晚自习归途', views: '207.9万' },
    { rank: 25, title: '外媒：华为与小米的对抗升级到新高度', views: '188.1万' },
    { rank: 26, title: '台旅行团整团被卖至缅甸 5人生死未卜', views: '170.2万' },
    { rank: 27, title: '广西党委书记会见董宇辉', views: '154.0万' },
    { rank: 28, title: '专家：美国关税战必败无疑', views: '139.4万' },
    { rank: 29, title: '小沈阳演唱会提词器写满对粤语执念', views: '126.1万' },
    { rank: 30, title: '专家：波兰大选结果有人欢喜有人愁', views: '114.1万' },
    { rank: 31, title: '专家谈美防长称美方尊重中方不想打仗', views: '103.3万' },
    { rank: 32, title: '菲律宾对华风向要变了吗', views: '93.4万' },
    { rank: 33, title: '专家：乌袭击行动已达到俄动核条件', views: '84.5万' },
    { rank: 34, title: '蒙古国总理下台对内外政策有何影响', views: '76.5万' },
    { rank: 35, title: '贾冰瘦身后发现睡觉不怎么打鼾了', views: '69.2万' },
    { rank: 36, title: '商界人士：中国没有拦阻稀土出口', views: '62.6万' },
    { rank: 37, title: '印度想跟中国谈谈？专家解读', views: '56.7万' },
    { rank: 38, title: '一次炸毁俄41架军机？乌如何做到的', views: '51.3万' },
    { rank: 39, title: '醉酒男凌晨闯入大学女生寝室睡觉', views: '46.4万' },
    { rank: 40, title: '端午过后龙舟再次沉入水里保存', views: '42.0万' },
    { rank: 41, title: '专家：美债崩盘进入倒计时', views: '38.0万' },
    { rank: 42, title: '科学家发现一颗“超级地球”', views: '34.4万' },
    { rank: 43, title: '乌克兰称袭击克里米亚大桥', views: '31.1万' },
    { rank: 44, title: '中美航母2对2南北隔空对峙有何意味', views: '28.1万' },
    { rank: 45, title: '专家解读香会上印巴参谋长隔空交锋', views: '25.5万' },
    { rank: 46, title: '美防长提出围堵中国 新加坡如何表态', views: '23.0万' },
    { rank: 47, title: '马科斯重用莎拉死对头有何意味', views: '20.8万' },
    { rank: 48, title: '俄报复乌偷袭行动开始了吗', views: '18.9万' },
    { rank: 49, title: '整排俄核轰炸机被炸有何影响', views: '17.1万' },
    { rank: 50, title: '跟风买比特币的公司股价涨不动了', views: '15.4万' },
];
