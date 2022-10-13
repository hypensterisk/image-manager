(async function(){
    /**@type {HTMLImageElement}*/
    const image=document.getElementById('image')

    /**@type {Array<string>}*/
    const imageList=await(await fetch('/index.json')).json()

    function updateImage(index){
        sessionStorage.setItem('index',index)
        image.setAttribute('filename',imageList.at(index))
        image.setAttribute('index',index)
        image.src=`/image/${imageList.at(index)}`
    }

    function getImageFilename(){return image.getAttribute('filename')}
    function getImageIndex(){return parseInt(image.getAttribute('index'))}

    document.getElementById('previous').addEventListener('click',()=>{
        if(getImageIndex()===0)return
        updateImage(getImageIndex()-1)
    })

    document.getElementById('next').addEventListener('click',()=>{
        if(getImageIndex()===imageList.length-1)return
        updateImage(getImageIndex()+1)
    })

    document.getElementById('remove').addEventListener('click',async()=>{
        await fetch(`/remove/${getImageFilename()}`)
        if(getImageIndex()===imageList.length-1)sessionStorage.setItem('index',imageList.length-2)
        location.reload()
    })

    if(imageList.length===0)return
    updateImage(sessionStorage.getItem('index')|0)
}())