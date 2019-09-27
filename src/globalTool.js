//  全局函数

import util from './utils/util'
import xlsx from 'xlsx'
const   excelDownLoad=(id,name)=> {
    try {
        var jsono = util.xlsx.getGridDataToJson(id)
        util.xlsx.downloadExl(jsono, xlsx, name)

    } catch (e) {
        console.log(e.message)
    }
}

export default  excelDownLoad