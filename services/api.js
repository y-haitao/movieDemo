// 豆瓣 api 代理
const baseUrl = 'https://douban.uieee.com';

const apis = {
    // 正在热映
    'in_theaters': '/v2/movie/in_theaters',
    // 即将上映
    'coming_soon': '/v2/movie/coming_soon',
    // 电影条目
    'subject': '/v2/movie/subject',
    // 新片榜
    'new_movies': '/v2/movie/new_movies',
    // 豆瓣 top250
    'top250': '/v2/movie/top250',
    //北美票房榜
    'us_box': '/v2/movie/us_box',
    //口碑榜
    'weekly': '/v2/movie/weekly',
    // 搜索电影
    'search': '/v2/movie/search'
}

Object.keys(apis).forEach(key => {
    apis[key] = `${baseUrl}${apis[key]}`
})

module.exports = apis