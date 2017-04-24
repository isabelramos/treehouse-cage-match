$(document).ready(function() {


	firstUsernameArray = [];
	secondUsernameArray = [];

	const writeToDOM = () => {
        let treehouseString = "";


        for (let i=0; i < firstUsernameArray.length; i++) {
	        treehouseString += `<div class="row col-sm-3">`;
	        treehouseString += `<div class="thumbnail">`;
	        treehouseString += `<img src="${firstUsernameArray[i].gravatar_url}"`;
	        treehouseString += `<div class="caption">`;           
	        treehouseString += `<h3>${firstUsernameArray[i].name}</h3>`;
		    treehouseString += `<p>Total Points: ${firstUsernameArray[i].points.total}</p>`;
	      	treehouseString += `</div></div></div>`;
	    }

	    for (let i=0; i < secondUsernameArray.length; i++) {
	      	treehouseString += `<div class="row col-sm-3">`;
	        treehouseString += `<div class="thumbnail">`;
	        treehouseString += `<img src="${secondUsernameArray[i].gravatar_url}"`;
	        treehouseString += `<div class="caption">`;           
	        treehouseString += `<h3>${secondUsernameArray[i].name}</h3>`;
		    treehouseString += `<p>Total Points: ${secondUsernameArray[i].points.total}</p>`;
	      	treehouseString += `</div></div></div>`;
    	}

	    for (let i=0; i < firstUsernameArray.length; i++) {
	    	for (let j=0; j < secondUsernameArray.length; j++) {

		    	let user1Points = firstUsernameArray[i].points;
				let user2Points = secondUsernameArray[i].points;

				if (user1Points.total > user2Points.total) {
					treehouseString += `<div class="winner"><h2>${firstUsernameArray[i].name} wins!</h2></div>`;
				} else {
					treehouseString += `<div class="winner"><h2>${secondUsernameArray[i].name} wins!</h2></div>`;
				}
	    	}
	    }

        $("#container").append(treehouseString);
    };


	const buildURL = (userInputString) => {
		return "https://teamtreehouse.com/" + userInputString + ".json";
	};


	const loadFirstUsername = () => {
		return new Promise((resolve, reject) => {
			// $.ajax(buildURL($("#userInput1").val()))
			$.ajax("https://teamtreehouse.com/isabelramos.json")
			.done((data) => resolve(data))
			.fail((error) => reject(error));
		});
	};

	const loadSecondUsername = () => {
		return new Promise((resolve, reject) => {
			// $.ajax(buildURL($("#userInput2").val()))
			$.ajax("https://teamtreehouse.com/krissycaron.json")
			.done((data2) => resolve(data2))
			.fail((error) => reject(error));
		});
	};


	$("#battle-button").click((event) => {
		Promise.all([loadFirstUsername(), loadSecondUsername()])
		.then(function(result){
			result.forEach(function(xhrCall, index) {
				if (index === 0) {
					firstUsernameArray.push(xhrCall);
				} else {
					secondUsernameArray.push(xhrCall);
				}
			});
			
			writeToDOM();
		})
		.catch(function(usernameError){
			console.log(usernameError);
		});

	});










});