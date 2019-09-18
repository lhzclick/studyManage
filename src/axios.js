import axios from "axios"
import qs from "qs"
import { Message ,Loading} from 'element-ui'
//  创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT, // api的base_url
    timeout: 5000 // 请求超时时间
})

// 加载laoding
let loading
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background:'rgba(255,255,255,0)',
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

//  request拦截器
service.interceptors.request.use(config => {
    startLoading() 
    config.method === 'post' ? config.data = qs.stringify({
        ...config.data
    }) : config.params = {
        ...config.params
    }
    // config.headers.common['Content-Type'] = 'application/json'            
    return config
}, error => { //请求错误处理   
    console.log(error)
    Promise.reject(error)
})

//  response拦截器
service.interceptors.response.use(
    response => { //成功请求到数据    
        endLoading()
        if (response.status == 200) {
            if(!response.data.err){
                return response.data
            }else{
                Message({
                    showClose: true,
                    message: response.data.msg,
                    type: 'error'
                })
            }
        } else {
            Message({
                showClose: true,
                message: response.data.msg,
                type: 'error'
            })
        }
    },
    error => { //响应错误处理console.log('error')        
        let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
            '404' :
            '网络异常，请重试'
        Message({
            showClose: true,
            message: text,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default service