
const fetch = (url, cb)=>{
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const data = JSON.parse(xhr.responseText)
                cb(data)    
            }
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}
