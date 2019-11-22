import axios from 'axios';
import querystring from 'querystring';


const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 20000
});

const getConfig = {
    getCar(params) {
        return instance.get('http://www.aiqianduan.com:7897/cars?' + querystring.stringify({
            'color': params.color.join('v')
        }));
    },
    checknickname(params) {
        return instance.get('http://127.0.0.1:3000/checknickname?' + querystring.stringify({
            nickname: params.nickname
        }));
    },
    sendMsg(params) {
        return instance.get('http://192.168.2.191:5438/sendmsg.php?' + querystring.stringify({
            phone: params.phone
        }));
    },
    chaYzm(params) {
        return instance.get('http://192.168.2.191:5438/cmsg.php?' + querystring.stringify({
            yanzhengma: params.yanzhengma,
            token: params.token
        }));
    }
};


// 普通暴露，接收的时候用大括号
export const get = function (fnName, params, callback) {
    return getConfig[fnName](params, callback);
}

// 默认暴露，接收的时候不用大括号
export default instance;


