
const fetch = (url, cb)=>{
    const xhr = new XMLHttpRequest();
    let searchParam = searchInput.value; 

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const data = JSON.parse(xhr.responseText)
                cb(data)    
            }
        }
    }

    xhr.open('POST', url, true)
    xhr.send(`inputValue=${searchParam}`)
}
