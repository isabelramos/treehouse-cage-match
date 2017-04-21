$(document).ready(function() {

	firstUsernameArray = [];
	secondUsernameArray = [];

	console.log(secondUsernameArray);


	const loadFirstUsername = () => {
		return new Promise((resolve, reject) => {
			$.ajax("https://teamtreehouse.com/isabelramos.json")
			.done((data) => resolve(data))
			.fail((error) => reject(error));
		});
	};

	const loadSecondUsername = () => {
		return new Promise((resolve, reject) => {
			$.ajax("https://teamtreehouse.com/krissycaron.json")
			.done((data2) => resolve(data2))
			.fail((error) => reject(error));
		});
	};


		Promise.all([loadFirstUsername(), loadSecondUsername()])
		.then(function(result){
			result.forEach(function(xhrCall, index) {
				if (index === 0) {
					firstUsernameArray.push(xhrCall);
				} else {
					secondUsernameArray.push(xhrCall);
				}
			});
			
			// writeToDOM();
		})
		.catch(function(userError){
			console.log(userError);
		});














});