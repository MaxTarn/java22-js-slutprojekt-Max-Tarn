

const apiKey = "8b883ad1bfcf1e975db79ad19dd780b3"
const apiSecret = "58ac807b16dd1065"

let searchForThis = ""
let numberOfPhotos =""
let urlForApi = ``
let imgSize = ""
let sortBy = ""


//---------- EVENT LISTENERS ----------
const searchForm = document.querySelector('.searchForm')


//activates when the sidebar form is submitted
searchForm.addEventListener("submit", event => {
	event.preventDefault()

	//updates the variables that correspond to the input
	updateInputsFromSidebar()

	//makes the url for the api, with the variables updated on line 22
	urlForApi = getUrlForApi(apiKey, searchForThis, numberOfPhotos,sortBy)

	doFetch(urlForApi)

	
})



const sortByDropDown = document.querySelector("#sortBy")

//activates when how to sort changes
//fetches new imgs, with the same inputs, but a diffrent sorting 
sortByDropDown.addEventListener("change", event =>{
	if(hasThereBeenInputs()){


		updateInputsFromSidebar()
		
		urlForApi = getUrlForApi(apiKey, searchForThis, numberOfPhotos, sortBy)
		doFetch(urlForApi)
	}else{
		updateInputsFromSidebar()
	}
	
	

})

//---------- EVENT LISTENERS END ----------


//---------- ONLY FUNCTIONS BELOW ----------

//returns true when user has already written stuff in the sidebar 
function hasThereBeenInputs(){

	updateInputsFromSidebar()
	if(numberOfPhotos == "" || searchForThis == ""){
		return false
	}else{
		return true
	}

}


//updates the global variables from the sidebar Form,
// and the topbar sort by select
function updateInputsFromSidebar(){
	console.clear()

	searchForThis = document.getElementById("searchFor").value
	console.log("Search for this: " + searchForThis)

	numberOfPhotos = document.getElementById("imgAmount").value
	console.log("Show this many photos: " + numberOfPhotos)

	imgSize = document.getElementById("imgSize").value
	console.log("This image size: " + imgSize)

	sortBy = document.getElementById("sortBy").value
	console.log("Sort By: " + sortBy)
}


//does the fetch, exception handling, adds imgs to the body
function doFetch(url){

	//always removes the error message from DOM, when starting a new fetch
	if(document.querySelector(".errorDiv") != null){
		document.querySelector(".errorDiv").remove()
	}
	
	fetch(url).then( response => {
		console.log(  response )


		//returns respon.json() when the response status code is good
		if( checkIfStatusCodeIsGood(response.status)){
			return response.json()
		}else{
			exceptionHandler()
		}
		





	}).then(jsonData => {
		
		console.log(jsonData.photos.photo)

		//adds all the imgs from the jsonData to the DOM
		putImgsInDiv(jsonData.photos.photo)


		//catches exception
	}).catch(exceptionHandler)

}

//returns true when status code between 200 and 299, the succsesful response codes
function checkIfStatusCodeIsGood(statusCode){
	if(statusCode < 200 || statusCode >= 300){
		return false
	}else{
		return true
	}

}




//does this when something goes wrong
function exceptionHandler(exception){


	//div alreay in DOM which will contian all the diffret imgs from API
	const containerForAllImgs = document.querySelector(".containerForAllImgs")
	containerForAllImgs.innerHTML = ""


	//removes the error message
	if(document.querySelector(".errorDiv") != null){
		document.querySelector(".errorDiv").remove()
	}


	console.log(exception)

	//creates the error message
	const errorDiv = document.createElement("div")
	errorDiv.className = "errorDiv"

	const errorMessage = document.createElement("h1")
	errorMessage.innerText = "Sorry, something went wrong."

	errorDiv.append(errorMessage)
	document.body.append(errorDiv)
}

//returns the complete url, and takes in the required variables
function getImgUrl(serverId, id, secret, sizeSuffix){
	return `https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.png`
}

//returns url for the API  
function getUrlForApi(apiKey, searchForThis, numberOfPhotos, sortBy){
	return `https://www.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&format=json&text=${searchForThis}&nojsoncallback=1&per_page=${numberOfPhotos}&sort=${sortBy}`
}



//adds all imgs in APIs response to a div already DOM
function putImgsInDiv(apiArrayOfImg){
	const containerForAllImgs = document.querySelector(".containerForAllImgs")
	containerForAllImgs.innerHTML = ""

	//when there are no imgs returned this function is called
	if(apiArrayOfImg.length == 0){
		noImgsFound()
		return 
	}

	

	

	//goes through all the imgs and creates div 
	// containing all nessecary things to display in DOM
	apiArrayOfImg.forEach (element =>{

		let imgUrl = getImgUrl(element.server, element.id, element.secret, imgSize)

		//link to img on flickrs website
		const linkToImg = document.createElement("a")
		linkToImg.href = imgUrl
		linkToImg.target = "_blank"

		//container for each img
		const divForImg = document.createElement("div")
		divForImg.className = "divForImg"

		//img from API resopns
		const img = document.createElement("img")
		img.src = imgUrl
		img.className = "imgs"

		

		


		divForImg.append(img)
		linkToImg.append(divForImg)
		containerForAllImgs.append(linkToImg)
	})


}



//adds a noImageFound image to the DOM
//runs when api returns a good status code and 
//when there were no imgs for those search parameters
function noImgsFound(){
	const containerForAllImgs = document.querySelector(".containerForAllImgs")

	const divForImg = document.createElement("div")
	divForImg.className = "divForImg"

	const img = document.createElement("img")
	img.src = "media/noImageFound.jpg"
	img.className = "imgs"

	divForImg.append(img)
	containerForAllImgs.append(divForImg)

}
