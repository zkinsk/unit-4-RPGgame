// character object
var char = [
    {name: "Mace Windu", hp: 120, baseAttack: 8, defense: 10, image: "assets/images/Windu_Angry.jpeg"},
    {name: "Kit Fisto", hp: 100, baseAttack: 5, defense: 5, image: "assets/images/Kit_fisto_saber.jpg"},
    {name: "Rey", hp: 150, baseAttack: 12, defense:12, image: "assets/images/rey-saber.jpg"},
    {name: "Kylo Ren", hp: 180, baseAttack: 20, defense: 15, image: "assets/images/kylo-ren-mask.jpg"}];

// global variables
var defenders = [0, 1, 2, 3]
var pickedCharacter = false;
var pickedDefender = false;
var combatOver = false;
var attackValue;
var counterAttack;
var playerChar;
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
                playerChar = ($(this).attr("val"));
                defenders.splice(playerChar, 1);
                defenderGroup();
                playerCharacters(playerChar);
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
        $(".comRow h3").html('<button type="button" class="btn btn-danger btn-large attack">ATTACK!</button>')
    };
    function attack (def){
        if (firstAttack === true){
            fristAttack = false;
            let defHp = char[def].hp;
            defHP = defHp - attackValue;


        }
    }
    defendersTest();
    // console.log(defendersArr);
    startGame();
 
});