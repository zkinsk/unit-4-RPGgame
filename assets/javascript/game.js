// character object
var char = [
    {name: "Mace Windu", hp: 120, baseAttack: 9, defense: 18, image: "assets/images/Windu_Angry.jpeg"},
    {name: "Kit Fisto", hp: 110, baseAttack: 8, defense: 25, image: "assets/images/Kit_fisto_saber.jpg"},
    {name: "Rey", hp: 100, baseAttack: 11, defense:17, image: "assets/images/rey-saber.jpg"},
    {name: "Kylo Ren", hp: 140, baseAttack: 9, defense: 10, image: "assets/images/kylo-ren-mask.jpg"}];

// character box object, box creation method & character status
var charCol = {
    row: ["playerRow", "defenderRow", "combatRow"],
    colType: ["char", "defender", "combatDefender"],

    mkRow: function (rowType, colType, loops, charIndex){
        $("." + rowType).empty();
        for (let i = 0; i < loops; i++){
            let charBox = $("<div class='col-2-md mx-1 " + colType + "'>");
            let charStats = $("<div class='charBox'>")
                    .append("<div class='charName'>" + char[defenders[charIndex]].name)
                    .append("<div class='charImg'> <img src = " + char[defenders[charIndex]].image + ">")
                    .append("<div class='charHp'>" + char[defenders[charIndex]].hp);
            charBox.attr ("val", defenders[charIndex]);
            charBox.append(charStats);
            $( "." + rowType + "").append(charBox);
            charIndex++;
        }

    }
};

// global variables
var test = 0;
var defenders = [0, 1, 2, 3];
var pickedCharacter = false;
var pickedDefender = false;
var combatOver = false;
var gameOver = false;
var playerAttackValue;
var attackAdder;
var counterAttack;
var playerCharVal;
var playerHp;
var defendChar;
var defendersArr = [];
var defendersTest = function (){
    for (let i = 0; i < char.length; i++){
        defendersArr.push(char[i].name)
    }
};





// functions!
$( document ).ready(function() {


    function startGame(){
        playerCharacters();
// pick player character & update variables with player character info
        $(".char").on("click", function(){
            if (pickedCharacter === false){
                pickedCharacter = true;
                playerCharVal = parseInt(($(this).attr("val")));
                playerHp = char[playerCharVal].hp;
                playerAttackValue = char[playerCharVal].baseAttack;
                attackAdder = char[playerCharVal].baseAttack;
                $(".charText h3").text("You are " + char[playerCharVal].name + " !");
                playerCharacters(playerCharVal);
            }
        });
    };
// draw character row allowing for player character choice 
    function playerCharacters(x){
        if (pickedCharacter === false){
            charCol.mkRow(charCol.row[0], charCol.colType[0], defenders.length, 0);
        }
        // moves unchosen characters to defender row
        else {
            $(".defenderText h3").text("Pick a Defender...");
            $(".combatText h3").text("for Battle!");
            $(".char").remove();
            charCol.mkRow(charCol.row[0], charCol.colType[0], 1, x);
            defenders.splice(playerCharVal, 1);
            defenderGroup();
        }
    };
// draws defender row, allows for pick of defender to battle then moved battler to battle row
    function defenderGroup(){
        $(".defender").remove();
        charCol.mkRow(charCol.row[1], charCol.colType[1], defenders.length, 0);
        $(".defender").on("click", function(){
            if(pickedDefender === false){
                pickedDefender = true;
                defendChar = parseInt(($(this).attr("val")));
                defenderHp = char[defendChar].hp;
                counterAttack = char[defendChar].defense;
                let battlerIndex = defenders.indexOf(defendChar);
                charCol.mkRow(charCol.row[2], charCol.colType[2], 1, battlerIndex);
                defenders.splice(battlerIndex, 1);
                $(".defender").remove();
                defenderGroup();
                buttonSwap();
            }
        });
    }
    function buttonSwap (){
        if (combatOver === false) {
            $(".defenderText h3").text("Press Button to Attack " + char[defendChar].name + "!")
            $(".combatText h3").html('<button type="button" class="btn btn-danger btn-large attack">ATTACK!</button>')
            attack();
        }
        else{
            combatOver = false;
            $(".defenderText h3").text("You have defeated " + char[defendChar].name + "!")
            $(".combatText h3").html("Pick Another Defender");

        }
    };
    function attack (def){
        let cDHp = defenderHp;
        let cDcA = counterAttack;
        $(".attack").click(function(){
            cDHp = cDHp - playerAttackValue;
            playerAttackValue = playerAttackValue + attackAdder;
           if (cDHp <= 0){
               $(".combatRow .charHp").text("0");
               $(".combatDefender").remove();
               combatOver = true;
               endGameLogic();
           }
           else if ( playerHp - cDcA <= 0 ){
               $(".playerRow .charHp").text("0");
               $(".combatRow .charHp").text(cDHp);
               $(".charText h3").html("You were " + char[playerCharVal].name + "!");
               $(".playerRow").html("<h3>You have been defeated by " + char[defendChar].name + "!<h3>");
               $(".defenderText h3").empty();
               resetGame();
           }
           else { 
                playerHp = playerHp - cDcA;
                $(".combatRow .charHp").text(cDHp);
                $(".playerRow .charHp").text(playerHp);
            }
        });
// controlls end game logic for whether to continue game or finish game
        function endGameLogic (){
            if (defenders.length <= 0 ){
                gameOver = true;
            }
            if (gameOver === true && combatOver === true){
                $(".defenderText h3").text("You have defeated " + char[defendChar].name + "!")
                $(".combatRow").html("<h3>and Won the Game!</h3>");
                resetGame();
            }else{
                pickedDefender = false;
                buttonSwap();
                defenderGroup();
            }

        }
// resets all variables to restart the game
        function resetGame(){
            $(".combatText h3").html('<button type="button" class="btn btn-success btn-large resetGame">Reset Game</button>');
            $(".resetGame").click(function() {
                $(".char, .defender, .combatDefender").remove();
                $(".combatText h3, .combatRow, .charText h3").empty();
                $(".charText h3").text("Pick your Character");
                $(".defenderText h3").text("For Combat!");
                defenders = [0, 1, 2, 3]
                pickedCharacter = false;
                pickedDefender = false;
                combatOver = false;
                gameOver = false;
                console.log("Test: " + test);
                test ++;
                startGame();
            });

        }
    }
    startGame();
 
});