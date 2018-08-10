"use strict"

const promise = require('bluebird')
const request = promise.promisifyAll(require('request'))
const { ProxyStart } = require('./proxy')
const { userAgents } = require('./userAgent')

const url = 'https://www.imooc.com/article';
const total = 50

/**
 * 使用代理IP 请求网页
 */
async function requestUrl() {
    try{
        const ipList = await ProxyStart(1);
        await main(ipList)
    }catch(e){
      console.log(e);
    }
}

async function main(ipList) {
    try{
        for (let i = 0; i < total; i++) {
            const ip = ipList[parseInt(Math.random() * ipList.length)];
            let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
            const options = {
                url: url,
                proxy: ip,
                headers: {
                    'User-Agent': userAgent,
                    accept: '*/*',
                    'Origin':'https://www.imooc.com',
                    'Referer':'https://www.imooc.com',
                    'Host':'www.imooc.com',
                    'Connection':'keep-alive',
                    'Cookie': 'UM_distinctid=162f1d130d21ce-03800955807383-336c7b05-13c680-162f1d130d32d1; CNZZDATA1261110065=1500861835-1524473432-https%253A%252F%252Fwww.baidu.com%252F%7C1524473432; imooc_uuid=2a3b905e-ee72-4e57-bd30-1e913806335e; imooc_isnew_ct=1524475442; imooc_isnew=2; IMCDNS=0; PHPSESSID=ppb2ulka03gingrd146go1ool2; loginstate=1; apsid=IwZmM3NTVmNGJlM2E4YmVmNTA2OGFmOWU1MTkxMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDAzNjE0MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTY5MTcwMTY1QHFxLmNvbQAAAAAAAAAAAAAAAAAAADY1Y2U0N2NiYWVkZDUwYzU3NDU0Yzg1YTY4YTJlYjcxjW1DW41tQ1s%3DZj; last_login_username=1169170165%40qq.com; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1531364486,1531374595,1531377700,1531393846; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1531364486,1531374595,1531377700,1531393846; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1531393855; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1531393855; cvde=5b436d5ef259b-605',

                }
            }
            request.get(options, async (err, req, body) => {
                console.log(`代理IP: ${ip}`)
                if(err){
                    console.log(err)
                    return;
                }
                if(body&&req.statusCode===200){
                    console.log('状态码: ' +req.statusCode);
                }else{
                    await main(ipList);
                }
            });
        }
    }catch(e){
        console.log(e)
    }
}

requestUrl()