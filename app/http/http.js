import axios from 'axios';
import querystring from 'querystring';
import router from '../router/router.js';


const instance = axios.create({
    timeout: 20000
});

 

// 拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    if(err.response.status == 401){
        // alert('主人，遇见了401，我将给你引导到登录页面');
        router.push({
            name: 'login'
        });
    }
    // console.dir(a);
});

const getConfig = {
    getCar(params) {
        return instance.get('http://www.aiqianduan.com:7897/cars?' + querystring.stringify({
            'color': params.color.join('v')
        }));
    },
    checknickname(params) {
        return instance.get('/api/checknickname?' + querystring.stringify({
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
    },
    test(){
        return instance.get('/api/test');
    },
    userinfo(){
        return instance.get('/api/userinfo');
    },
    cut({x,y,w,h,filename}){
        return instance.get('/api/cut?' + querystring.stringify({
            x,y,w,h,filename
        }));
    },
    tuichu(){
        return instance.get('/api/logout');
    },
    allrw({page, deadline, type}){
        if(deadline == null) deadline = [];

        return instance.get('/api/allrw?' + querystring.stringify({
            page,
            deadline: deadline.map(item => Date.parse(item)).join('to'),
            type
        }));
    },
    setdone({yixuan}){
        return instance.get('/api/setdone?' + querystring.stringify({
            ids: yixuan.join('v')
        }));
    },
    alluser({bm}){
        return instance.get('/api/alluser?' + querystring.stringify({
            bm
        }));
    },
    allbm(){
        return instance.get('/api/allbm?' + querystring.stringify({
        }));
    }
};



const postConfig = {
    login (params) {
        return instance.post('/api/login', {
            username: params.username,
            password: params.password
        })
    },
    addrw({title, detail, deadline, executors}){
        return instance.post('/api/addrw', {
            title, detail, deadline, executors
        })
    }
};



// 普通暴露，接收的时候用大括号
export const get = function (fnName, params) {
    return getConfig[fnName](params);
}

export const post = function (fnName, params) {
    return postConfig[fnName](params);
}

// 默认暴露，接收的时候不用大括号
export default instance;


