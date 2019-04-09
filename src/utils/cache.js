export default {
    setCache(name,content){
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    },
    getCache(name){
        if (!name) return
        return window.localStorage.getItem(name)
    },
    removeCache(name){
        if (!name) return
       window.localStorage.removeItem(name)
    }
}