// character object
var char = [
    {name: "Mace Windu", hp: 120, baseAttack: 8, defense: 30, image: "assets/images/Windu_Angry.jpeg"},
    {name: "Kit Fisto", hp: 100, baseAttack: 10, defense: 15, image: "assets/images/Kit_fisto_saber.jpg"},
    {name: "Rey", hp: 150, baseAttack: 12, defense:15, image: "assets/images/rey-saber.jpg"},
    {name: "Kylo Ren", hp: 180, baseAttack: 15, defense: 10, image: "assets/images/kylo-ren-mask.jpg"}];

// global variables
var defenders = [0, 1, 2, 3]
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

        $(".pickChar").on("click", function(){
            if (pickedCharacter === false){
                pickedCharacter = true;
                playerCharVal = ($(this).attr("val"));
                playerHp = char[playerCharVal].hp;
                playerAttackValue = char[playerCharVal].baseAttack;
                attackAdder = char[playerCharVal].baseAttack;
                defenders.splice(playerCharVal, 1);
                defenderGroup();
                playerCharacters(playerCharVal);
            }
        });
    };

    function playerCharacters(x){
        if (pickedCharacter === false){
            for (let i = 0; i < 4; i++){
                let charBox = $("<div class='col-2-md mx-1 char'>");
                let charStats = $("<div class='charBox pickChar'>")
                        .append("<div class='charName'>" + char[i].name)
                        .append("<div class='charImg'> <img src = " + char[i].image + ">")
                        .append("<div class='charHp'>" + char[i].hp);
                charStats.attr ("val", i);
                charBox.append(charStats);
                $( ".playerRow").append(charBox);
            };
        }
        else {
            $(".defRow h3").text("Pick a Defender...");
            $(".comRow h3").text("for Battle!");
            $(".char").remove();
            let charBox = $("<div class='col-2-md mx-1 char'>");
            let charStats = $("<div class='charBox pickChar'>")
                    .append("<div class='charName'>" + char[x].name)
                    .append("<div class='charImg'> <img src = " + char[x].image + ">")
                    .append("<div class='charHp'>" + char[x].hp);
            charStats.attr ("val", x);
            charBox.append(charStats);
            $( ".playerRow").append(charBox);

        }

    };

    function defenderGroup(){
        $(".defender").remove();
        for (let i = 0; i < defenders.length; i++){
            let charBox = $("<div class='col-2-md mx-1 defender'>");
            let charStats = $("<div class='charBox pickDefender'>")
                    .append("<div class='charName'>" + char[defenders[i]].name)
                    .append("<div class='charImg'> <img src = " + char[defenders[i]].image + ">")
                    .append("<div class='charHp'>" + char[defenders[i]].hp);
            charStats.attr ("val", defenders[i]);
            charBox.append(charStats);
            $( ".defenderRow").append(charBox);
        };

        $(".pickDefender").on("click", function(){
            if(pickedDefender === false){
                pickedDefender = true;
                defendChar = ($(this).attr("val"));
                defenderHp = char[defendChar].hp;
                counterAttack = char[defendChar].defense;
                let battleName = char[defendChar].name;
                let battleIndex = char.map(function (obj) { return obj.name; }).indexOf(battleName);
                battleGroup(battleIndex);
                defenders.splice(defenders.indexOf(battleIndex), 1);
                $(".defender").remove();
                defenderGroup();
                buttonSwap();
                
            }
        });
    }
    function battleGroup(x){
            let charBox = $("<div class='col-2-md mx-1'>");
            let charStats = $("<div class='charBox combatDefender'>")
                    .append("<div class='charName'>" + char[x].name)
                    .append("<div class='charImg'> <img src = " + char[x].image + ">")
                    .append("<div class='charHp'>" + char[x].hp);
            charStats.attr ("val", defenders[x]);
            charBox.append(charStats);
            $( ".combatRow").append(charBox);
    };
    function buttonSwap (){
        if (combatOver === false) {
            $(".comRow h3").html('<button type="button" class="btn btn-danger btn-large attack">ATTACK!</button>')
            attack();
        }
        else{
            combatOver = false;
            $(".comRow h3").html("Pick Another Defender");

        }
    };
    function attack (def){
        let cDHp = defenderHp;
        let cDcA = counterAttack;
        $(".attack").click(function(){
            cDHp = cDHp - playerAttackValue;
            playerAttackValue = playerAttackValue + attackAdder;
           if (cDHp <= 0){
               alert("he's dead");
               $(".combatRow .charHp").text("0");
               pickedDefender = false;
               $(".combatDefender").parent().remove();
               combatOver = true;
               endGameLogic();
               defenderGroup();
           }
           else if ( playerHp - cDcA <= 0 ){
               alert ("you're dead");
               $(".playerRow .charHp").text("0");
               $(".combatRow .charHp").text(cDHp);
               resetGame();

           }
           
           else { 
                playerHp = playerHp - cDcA;
                $(".combatRow .charHp").text(cDHp);
                $(".playerRow .charHp").text(playerHp);
            }
        });

        function endGameLogic (){
            if (defenders.length <= 0 ){
                gameOver = true;
            }
            if (gameOver === true && combatOver === true){
                alert("GAME OVER");
                resetGame();
            }else{
                buttonSwap();
            }

        }

        function resetGame(){
            $(".comRow h3").html('<button type="button" class="btn btn-success btn-large resetGame">Reset Game</button>');
            $(".resetGame").click(function() {
                $(".char").remove();
                $(".defender").remove();
                $(".combatDefender").parent().remove();
                $(".comRow h3").empty();
                $(".defRow h3").text("For Combat!");
                defenders = [0, 1, 2, 3]
                pickedCharacter = false;
                pickedDefender = false;
                combatOver = false;
                gameOver = false;
                startGame();
            });

        }
    }
    startGame();
 
});