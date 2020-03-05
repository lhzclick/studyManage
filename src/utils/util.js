// 工具函数

export default{
    xlsx:{
        getGridDataToJson: function(id){
            var headData = document.querySelectorAll(id+" .el-table__header-wrapper table thead tr th .cell")
            var contentData = document.querySelectorAll(id+" .el-table__body-wrapper table tbody tr")

            var AllJsonData = []
            var header = {}
            for(var i=0,j=headData.length;i<j;i++){
                var parse =  headData[i].textContent
                header[parse]= parse
            }
            AllJsonData.push(header)
            for(var i=0,j=contentData.length;i<j;i++){
                var cellData = contentData[i].querySelectorAll(".cell")
                var cellObj = {}
                for(var m=0,n=cellData.length;m<n;m++){
                    var parse =  headData[m].textContent
                    cellObj[parse]= cellData[m].textContent
                }
                AllJsonData.push(cellObj)
            }
            return AllJsonData
        },
        downloadExl: function(json,XLSX,name) {
            if(document.querySelector("#hf")){
                document.querySelector("body").removeChild(document.querySelector("#hf"))
            }
            
            document.querySelector("body").insertAdjacentHTML("beforeend",'<a href="" download="'+name+'.xlsx" id="hf"></a>')

            var type = "xlsx"
            var tmpDown //导出的二进制对象
            var keyMap = []//获取键
            for(var k in json[0]) {
                keyMap.push(k)
            }
            var tmpdata = []//用来保存转换好的json
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                v: v.v
            })
            var outputPos = Object.keys(tmpdata) //设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ['mySheet'], //保存的表标题
                Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata, //内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                        })
                }
            }
            tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
                {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
            ))], {
                type: ""
            })//创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown) //创建对象超链接
            document.getElementById("hf").href = href //绑定a标签
            document.getElementById("hf").click() //模拟点击实现下载
            setTimeout(function() { //延时释放
                URL.revokeObjectURL(tmpDown) //用URL.revokeObjectURL()来释放这个object URL
            }, 100)
        },
        s2ab:function(s){ //字符串转字符流
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for(var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
            return buf
        },
        // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        getCharCol:function(n){
            let temCol = '',
                s = '',
                m = 0
            while(n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        }
    }
}