module.exports = {
    //印尼金额格式化
    amountFormat (n){
        if (!n) return n
        n = n.toFixed(2)
        n = n.replace('.',',')
        let arr = n.split(',')
        let b = parseInt(arr[0]).toString()
        let len = b.length  
        if(len <= 3 ){return b + ',' + arr[1]}  
        let r = len % 3 
        arr[0] = r > 0 ? b.slice(0,r) + "." + b.slice(r,len).match(/\d{3}/g).join(".")
                        :b.slice(r,len).match(/\d{3}/g).join(".")           
        return arr.join(',')
    }
}