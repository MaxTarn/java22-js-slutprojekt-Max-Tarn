const openbtn =  document.querySelector(".openbtn")
const closebtn = document.querySelector(".closebtn")
let widthOfSidebar = 300 

//
let openOrCollapsedSidebar = "Collapsed"

openbtn.addEventListener("click", ()=>{

    document.getElementById("top").style.transitionProperty = "margin-left, width"

    
    if(openOrCollapsedSidebar === "Collapsed"){
        document.getElementById("mySidebar").style.width = `${widthOfSidebar}px`
        document.getElementById("top").style.marginLeft = `${widthOfSidebar}px`
        document.getElementById("top").style.width = (100 - getWidthOfSideBarInPercent()) + "%"
        

        openOrCollapsedSidebar = "Open"

    }else if(openOrCollapsedSidebar === "Open"){
        document.getElementById("mySidebar").style.width = "0"
        document.getElementById("top").style.marginLeft= "0"
        document.getElementById("top").style.width = "100%"
        console.log()

        openOrCollapsedSidebar = "Collapsed"
    }
    
})

closebtn.addEventListener("click", ()=>{
    document.getElementById("mySidebar").style.width = "0"
    document.getElementById("top").style.marginLeft= "0"
    document.getElementById("top").style.width = "100%"
    openOrCollapsedSidebar = "Collapsed"
})



function getWidthOfSideBarInPercent(){
    return widthOfSidebar/((window.innerWidth)/100)
}