## ProxyIP
    抱歉，由于是爬取的代理IP，所以对于https的支持可能不是特别好

基于node的网络爬虫：

 * request获取html页面；
    
 * 使用cheerio获取文档的DOM节点，通过对DOM节点的解析；
    
 * 通过代理IP访问百度，验证IP的正确性；
    
 * 将获取的IP保存在json文件中，剩下的就随便玩了；
 
 
|系统 |运行环境  |工具包 |
|:-----|:-------:|:-----|
|不限     |   node  |  [request](https://www.npmjs.com/package/request)、[cheerio](https://www.npmjs.com/package/cheerio)、[bluebird](https://www.npmjs.com/package/bluebird) |
    

```
$ git clone https://github.com/HerryLo/proxyIP.git

<!-- 安装依赖 -->
$ npm install

<!-- 运行 -->
$ npm run dev
```

代码相关问题，可以直接在上[issues](https://github.com/HerryLo/Record/issues)提出。

持续迭代中。
