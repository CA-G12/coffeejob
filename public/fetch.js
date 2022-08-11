const xhr = new XMLHttpRequest()

const fetch = (url, cb)=>{
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const data = JSON.parse(xhr.responseText)
                cb(data)    
            }
        }
    }
    xhr.open('GEt',url, true)
    xhr.send()
}
