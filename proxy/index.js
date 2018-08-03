"use strict"

const promise = require('bluebird')
const request = promise.promisifyAll(require('request'))
const { ProxyStart } = require('./proxy')
const { userAgents } = require('./userAgent')

const url = 'https://www.imooc.com/article/49486';
const total = 50

/**
 * 使用代理IP 请求网页
 */
async function requestUrl() {
    try{
        const ipList = await ProxyStart(1);
        for (let i = 0; i < total; i++) {
            let time = parseInt(Math.random() * 1000+500);
            setTimeout(async ()=> {
                const ip = ipList[parseInt(Math.random() * ipList.length)];
                let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
                const options = {
                    url: url,
                    proxy: ip,
                    headers: {
                        'User-Agent': userAgent
                    }
                }
                console.log(`代理IP: ${ip}`)
                request.get(options, onresponse);
            },time)
        }
    }catch(e){
      console.log(e);  
    }
}

/**
 * 请求回调函数
 * @param {*} err 
 * @param {*} res 
 */
function onresponse(err, req, body){
    if(err){
        console.log(err)
        return;
    }
    if(body&&req.statusCode===200){
        console.log(req.statusCode);
    }
}

async function main() {
    await requestUrl()
}

main()