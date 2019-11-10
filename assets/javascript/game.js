$(document).ready(function() {

	
    var categories = [
        ["apple", "peach", "pear", "blueberry", "coconut", "fig", "pineapple", "orange", "banana", "plum"],
        ["soccer", "football", "tennis", "lacrosse", "golf", "basketball", "badminton", "bowling", "ballet"],
        ["ironman", "hulk", "thor", "spiderman", "blackpanther", "groot", "vnome", "wolverine", "deadpool"]
    ];
    var randomCategoryArray = categories[Math.floor((Math.random() * categories.length))];
    var randomWord = (randomCategoryArray[Math.floor((Math.random() * randomCategoryArray.length))]).toUpperCase();
    console.log(randomWord);
    var randomWordArray = randomWord.split("");
    var counter = 0;
    
    if ($.inArray("apple", randomCategoryArray) > -1) {
        $(".category").text("Category is fruits");
    } else if ($.inArray("soccer", randomCategoryArray) > -1) {
        $(".category").text("Category is sports");
    } else {
        $(".category").text("Category is marvel");
    }


	
	for(var i = 0; i < randomWord.length; i++) {
        $('#container').append('<div class="letter ' + i + '"></div>');
        $('#container').find(":nth-child(" + (i + 1) + ")").text(randomWordArray[i]);
        $(".letter").css("color", "#4ABDAC");
        
    }

	var counter = 0;
    var wrongGuesses = 0;
    $("button").on("click", function(){
        $(this).addClass("used");
        $(this).prop("disabled", "true");
        var matchFound = false;

       
        var userGuess = $(this).text();
        for (var i = 0; i < randomWord.length; i++) {
            if (userGuess === randomWord.charAt(i)) {
                $('#container').find(":nth-child(" + (i + 1) + ")").css("color", "#EFEFEF").addClass("winner");
                matchFound = true;
                  
            }
        }

        var goodGuesses = [];
        $(".letter").each(function( index ) {
            if ( $(this).hasClass("winner") ) {
                goodGuesses.push(index);
                if (goodGuesses.length === randomWordArray.length) {
                    $("#container").hide();
                    $("button").prop("disabled", "true");
                    $(".category").text("Great job you guessed the secret word!");
                    $(".category").append("<br><button enabled class='play-again'>Play again?</button>");
                }
            }
        });

        var num=7;
        if (matchFound === false) {
            wrongGuesses += 1;
            if(wrongGuesses<=7)
            {
                 $(".counter1").text("you have left  " + (num - wrongGuesses));
            }
           
            $("#hangman").attr("src", "./assets/img/" + wrongGuesses + ".png");
            
        }

         
        if (wrongGuesses === 7) {
            $("#container").hide();
            $("button").prop("disabled", "true");
            $(".category").text("Sorry you lost! The secret word was " + randomWord);
            $(".category").append("<br><button enabled class='play-again'>Play again?</button>");
        }

        
        $(".play-again").on("click", function(){
            location.reload();
        });

        $( "#container" ).select("hover", function() {
            $('#container').append('<div class="letter ' + i + '">No Cheating</div>');
            $(".letter").css("color", "#4ABDAC");
          });
    }); 

}); 


