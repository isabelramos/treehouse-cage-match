$(document).ready(function() {


	let firstUsernameArray = {};
	let secondUsernameArray = {};

	const writeUsersToDOM = () => {

        let userString = "";

	        userString += `<div class="row col-sm-3">`;
	        userString += `<div class="thumbnail">`;
	        userString += `<img src="${firstUsernameArray.gravatar_url}"`;
	        userString += `<div class="caption">`;           
	        userString += `<h3>${firstUsernameArray.name}</h3>`;
		    userString += `<p>Total Points: ${firstUsernameArray.points.total}</p>`;
	      	userString += `</div></div></div>`;

	      	userString += `<div class="row col-sm-3">`;
	        userString += `<div class="thumbnail">`;
	        userString += `<img src="${secondUsernameArray.gravatar_url}"`;
	        userString += `<div class="caption">`;           
	        userString += `<h3>${secondUsernameArray.name}</h3>`;
		    userString += `<p>Total Points: ${secondUsernameArray.points.total}</p>`;
	      	userString += `</div></div></div>`;

		$("#user-container").html(userString);

    };

    const writeWinnerToDOM = () => {

    	winnerString = "";

		let user1Points = firstUsernameArray.points;
		let user2Points = secondUsernameArray.points;
		let user1Badges = firstUsernameArray.badges;
		let user2Badges = secondUsernameArray.badges;

		if (user1Points.total > user2Points.total) {
			winnerString += `<div class="winner"><h2>${firstUsernameArray.name} wins!</h2></div>`;
			for (let k=0; k < user1Badges.length; k++) {
				winnerString += `<div><img class="badges" src="${user1Badges[k].icon_url}"></div>`;
			}
			} else {
				winnerString += `<div class="winner"><h2>${secondUsernameArray.name} wins!</h2></div>`;
				for (let k=0; k < user2Badges.length; k++) {
					winnerString += `<div><img class="badges" src="${user2Badges[k].icon_url}"></div>`;
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

		firstUsernameArray = {};
		secondUsernameArray = {};

		Promise.all([loadFirstUsername(), loadSecondUsername()])
		.then(function(result){
			result.forEach(function(xhrCall, index) {
				if (index === 0) {
					firstUsernameArray = xhrCall;
				} else {
					secondUsernameArray = xhrCall;
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