$(document).ready(function() {


	let firstUsernameArray = [];
	let secondUsernameArray = [];

	const writeUsersToDOM = () => {

        let userString = "";


        for (let i=0; i < firstUsernameArray.length; i++) {
	        userString += `<div class="row col-sm-3">`;
	        userString += `<div class="thumbnail">`;
	        userString += `<img src="${firstUsernameArray[i].gravatar_url}"`;
	        userString += `<div class="caption">`;           
	        userString += `<h3>${firstUsernameArray[i].name}</h3>`;
		    userString += `<p>Total Points: ${firstUsernameArray[i].points.total}</p>`;
	      	userString += `</div></div></div>`;
	    }

	    for (let i=0; i < secondUsernameArray.length; i++) {
	      	userString += `<div class="row col-sm-3">`;
	        userString += `<div class="thumbnail">`;
	        userString += `<img src="${secondUsernameArray[i].gravatar_url}"`;
	        userString += `<div class="caption">`;           
	        userString += `<h3>${secondUsernameArray[i].name}</h3>`;
		    userString += `<p>Total Points: ${secondUsernameArray[i].points.total}</p>`;
	      	userString += `</div></div></div>`;
    	}

		$("#user-container").html(userString);

    };

    const writeWinnerToDOM = () => {

    	winnerString = "";

	    for (let i=0; i < firstUsernameArray.length; i++) {
	    	for (let j=0; j < secondUsernameArray.length; j++) {

		    	let user1Points = firstUsernameArray[i].points;
				let user2Points = secondUsernameArray[j].points;
				let user1Badges = firstUsernameArray[i].badges;
				let user2Badges = secondUsernameArray[j].badges;

				if (user1Points.total > user2Points.total) {
					winnerString += `<div class="winner"><h2>${firstUsernameArray[i].name} wins!</h2></div>`;
					for (let k=0; k < user1Badges.length; k++) {
						winnerString += `<div><img class="badges" src="${user1Badges[k].icon_url}"></div>`;
					}
				} else {
					winnerString += `<div class="winner"><h2>${secondUsernameArray[j].name} wins!</h2></div>`;
					for (let k=0; k < user2Badges.length; k++) {
						winnerString += `<div><img class="badges" src="${user2Badges[k].icon_url}"></div>`;
					}
				}
	    	}
	    }
	
		$(document).click(function() {
	  		$(".badges").animate({
            height: 'toggle'
        	});
		});

	    $("#winner-container").html(winnerString);

	};

	

	const buildURL = (userInputString) => {
		return "https://teamtreehouse.com/" + userInputString + ".json";
	};


	const loadFirstUsername = () => {
		return new Promise((resolve, reject) => {
			$.ajax(buildURL($("#user1-input").val()))
			// $.ajax("https://teamtreehouse.com/krissycaron.json")
			.done((data) => resolve(data))
			.fail((error) => reject(error));
		});
	};

	const loadSecondUsername = () => {
		return new Promise((resolve, reject) => {
			$.ajax(buildURL($("#user2-input").val()))
			// $.ajax("https://teamtreehouse.com/isabelramos.json")
			.done((data2) => resolve(data2))
			.fail((error) => reject(error));
		});
	};


	$("#battle-button").click((event) => {

		firstUsernameArray = [];
		secondUsernameArray = [];

		Promise.all([loadFirstUsername(), loadSecondUsername()])
		.then(function(result){
			result.forEach(function(xhrCall, index) {
				if (index === 0) {
					firstUsernameArray.push(xhrCall);
				} else {
					secondUsernameArray.push(xhrCall);
				}
			});
			
			writeUsersToDOM();
			writeWinnerToDOM();
		})
		.catch(function(usernameError){
			console.log(usernameError);
		});

	});










});