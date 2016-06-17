$(document).ready(function(){
	//ON LOAD!
	//gonna store a game info on this object
	var gameData = {};
	gameData.guessesRemaining = 5;
	//get winning number
	gameData.winningNumber = generateWinningNumber();
	//create hint numbers
	generateDummyNumbers();
	
	//PLAY!
	//display remaining guesses
	$('#guessBox').text(gameData.guessesRemaining + ' Guesses Remaining');
	//remove textbox text if they click in
	$('div').on('click', 'textarea', removePlaceholderText);
	//when they guess check their submission
	$('#guess').on('click',  playersGuessSubmission)
	//provide hint
	$('#hint').on('click', provideHint)
	$('#hintarea').text('Hint costs 1 guess');
	//restart
	$('#restart').on('click', playAgain);
	
	// GAME FUNCS
	
	//rmeoves text area placeholder text
	function removePlaceholderText(){
		if ( $('textarea').val() !== ''){
			$('textarea').val('');
		}
	};

	//creates winning number
	function generateWinningNumber(){
		var num = Math.floor(Math.random() * 100);
		return num;
	}

	// gets users guess. makes sure it's an number
	function playersGuessSubmission(){
		//number?
		if ( $.isNumeric( $('textarea').val() ) === true ){
			gameData.playersGuess = +$('textarea').val();
			removePlaceholderText();
			checkGuess();
			return gameData.playersGuess;
		} else {
			$('textarea').val('Hey! We\'re guessing NUMBERS here!');;
		}
	}

	// Determine if the next guess should be a lower or higher number
	function lowerOrHigher(){
		if (checkGuessCount() === true){
			if (gameData.playersGuess > gameData.winningNumber){
				$('textarea').val('Too high! Guess lower.');
			} else {
				$('textarea').val('Too low! Guess higher.');
			} 
		} else { 
			$('textarea').val('You lose. Click restart to play again.');
		}
	}
	

	// hotness tip to display after each guess. decrement guesses left
	function getHotness(diff){
	
		if (diff > 50){
			$('#hotnesslol').text('Really far off.');
			lowerOrHigher();
			gameData.guessesRemaining--;
		} else if (diff > 25) {
			$('#hotnesslol').text('Eh. Sorta far off still.');
			lowerOrHigher();
			gameData.guessesRemaining--;
		} else if (diff > 10){
			$('#hotnesslol').text('Close!');
			lowerOrHigher();
			gameData.guessesRemaining--;
		} else if (diff > 3){
			$('#hotnesslol').text('So close!');
			lowerOrHigher();
			gameData.guessesRemaining--;
		} else {
			$('#hotnesslol').text('Really REALLY close!');
			lowerOrHigher();
			gameData.guessesRemaining--;
		}
	}
	// check if thy are out of guesses and lose
	function checkGuessCount(){
		if (gameData.guessesRemaining === 1){
			$('#hintguessarea').hide();
			$('#textarea').val('You lose. Click Restart to play again.');
		} else {
			return true;
		}
	}
	
	// check if their guess is right. if not get hot/coldness and display
	function checkGuess(){
		var guessDiff = Math.abs(gameData.playersGuess - gameData.winningNumber);
			if (gameData.playersGuess === gameData.winningNumber){
				$('#hintguessarea').hide();
				$('textarea').val("WOW! Such win! Click restart to play again.");
			} else {
				checkGuessCount(); 
				getHotness(guessDiff);
				$('#guessBox').text(gameData.guessesRemaining + ' Guesses Remaining');
			}
		
	}

	// generate four numbers to fill a dummy array. 
	function generateDummyNumbers(){
		var numArray = [];
		for (var i = 0; i<4; i++){
			numArray.push(generateWinningNumber());		
		}		
		gameData.dummyNums = numArray;
	}
	
	//displays to the user the possible winning numbers
	function provideHint(){
		if (gameData.guessesRemaining > 1){
			gameData.guessesRemaining--;
			var numbers = gameData.dummyNums.concat(gameData.winningNumber);
			$('#hintarea').text(numbers.toString(' '));
			$('#guessBox').text(gameData.guessesRemaining + ' Guesses Remaining');
		} else {
			$('#guessBox').text('Not enough guesses left to buy a hint.');
		}
	}

	// Allow the "Player" to Play Again
	function playAgain(){
		window.location.reload();
	}
});
