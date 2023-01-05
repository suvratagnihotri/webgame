var data;
var stompClient = null;
var newGameElement = null;
var containerlement = null;
var userName = null;
var player1 = null;
var player2 = null;
var gameId = null;
var messageReceivedData = null;


const lastButtonClicked = {
    buttonText :"" ,

    set changeText(newButtonText){
        this.buttonText = newButtonText;
    },

    get getButtonText(){
        return this.buttonText;
    }
};

const buttonClicked = {
    buttonClickedCount :0 ,

    set changeButtonClickedCount(newbuttonClickedCount){
        this.buttonClickedCount = newbuttonClickedCount;
    },

    get getButtonClickedCount(){
        return this.buttonClickedCount;
    }
};

function reloadGame() {
    lastButtonClicked.changeText ="";
    buttonClicked.changeButtonClickedCount=0;
    for(var i = 1; i<=9; i++){
        document.getElementById(i).textContent='';
    }
}

function newGame() {
    connect();
    newGameElement.style.display = "none";
    containerlement.style.display = "block";
    gameId = Math.random().toString(16).slice(2);
    // var gameData = {
    //     gameId : gameId,
    //     player1 : player1,
    //     player2 : userName
    // }
}

function enableButton(){
    $('#1').prop('disabled', false);
    $('#2').prop('disabled', false);
    $('#3').prop('disabled', false);
    $('#4').prop('disabled', false);
    $('#5').prop('disabled', false);
    $('#6').prop('disabled', false);
    $('#7').prop('disabled', false);
    $('#8').prop('disabled', false);
    $('#9').prop('disabled', false);
}

function disableButton(){
    $('#1').prop('disabled', true);
    $('#2').prop('disabled', true);
    $('#3').prop('disabled', true);
    $('#4').prop('disabled', true);
    $('#5').prop('disabled', true);
    $('#6').prop('disabled', true);
    $('#7').prop('disabled', true);
    $('#8').prop('disabled', true);
    $('#9').prop('disabled', true);
}

function joinGame(gameId,player1) {
    var tableElement = document.getElementsByTagName("table")[0];
    this.gameId = gameId;
    this.player1 = player1;
    player2 = userName;
    tableElement.style.display = "none";
    containerlement.style.display = "block";
    connect();
    // var gameData = { 
    //     gameId : gameId,
    //     player1 : player1,
    //     player2 : userName
    //     }
}

window.onload = function() {
    containerlement = document.getElementsByClassName("container")[0];
    userName = document.getElementById("username").textContent;
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    data = document.getElementById("myvar").innerText;
    console.log(data);
    const obj = JSON.parse(data);
    const games = obj.games;
    if(data === '{}'){
        console.log("No game is present.");
        newGameElement = document.getElementsByClassName("newGameContainer")[0];
        newGameElement.style.display = "block";
        tbl.style.display="none";
    }
    else{
        for (var key in obj) {
            console.log(obj[key]["player1"]);
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            const cellText = document.createTextNode(obj[key]["player1"] + " Is Waiting in the game");
            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btn";
            btn.value = "Join Game";
            btn.onclick = function(){joinGame(obj[key]["gameId"],obj[key]["player1"])};
            cell.appendChild(cellText);
            row.appendChild(cell);
            row.appendChild(btn);
            tblBody.appendChild(row);
        }
    }
    

    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}


function connect(event) {

    // if(userName) {
        // userNamePage.classList.add('hidden');
        // chatPage.classList.remove('hidden');

        var socket = new SockJS('http://localhost:8080/testchat');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    // }
    // event.preventDefault();
}


function onConnected() {
    alert(userName);
    // Subscribe to the Public Topic
    stompClient.subscribe('/start/initial.'+userName, onMessageReceived);
    if(player1===null){
        player1=userName;
    }
    if(player2===null){
        player2="";
    }


    // Tell your userName to the server
    stompClient.send("/current/adduser."+userName,
        {},
        JSON.stringify
        (
            {
                sender: userName,
                gameId:gameId,
                player1:player1,
                player2:player2,
                type: 'JOIN',
                chat:"test"
            }
        )
    )

    // connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'It was not possible to connect to WebSocket! Update the page and stay again or contact me as an administrator.\n';
    connectingElement.style.color = 'red';
}


function send(event) {
    disableButton();
    let messageContent = {  '1':$('#1').text().trim()
                            ,'2':$('#2').text().trim()
                            ,'3':$('#3').text().trim()
                            ,'4':$('#4').text().trim()
                            ,'5':$('#5').text().trim()
                            ,'6':$('#6').text().trim()
                            ,'7':$('#7').text().trim()
                            ,'8':$('#8').text().trim()
                            ,'9':$('#9').text().trim()
                            ,'gameId': gameId
                            ,'player1':player1
                            ,'player2':player2
                        }

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: userName,
            chat: JSON.stringify(messageContent),
            content: JSON.stringify(messageContent),
            type: 'CHAT'
        };

        stompClient.send("/current/resume."+userName, {}, JSON.stringify(chatMessage));
        messageContent= '';
    }
    // event.preventDefault();
}


function onMessageReceived(payload) {
    // if(payload.toString().includes("loser")){
    //     window.alert("You are loser");
    // }
    // else if(payload.toString().includes("winner")){
    //     window.alert("You are loser");
    // }
    messageReceivedData = payload;
    console.log(payload);
    const message = JSON.parse(messageReceivedData["body"]);
    if(player1===null){
        player1 = message["player1"];
    }
    else if(player2===null || player2==="" && message["player2"]){
        player2 = message["player2"];
    }
    console.log(messageReceivedData["body"]);
    const receivedData = JSON.parse(messageReceivedData["body"]);
    console.log(receivedData["chat"]);
    if(receivedData["chat"].length>4){
        const chatData = JSON.parse(receivedData["chat"]);
        console.log(chatData["1"]);

        $('#1').html(chatData["1"].trim());
        $('#2').html(chatData["2"].trim());
        $('#3').html(chatData["3"].trim());
        $('#4').html(chatData["4"].trim());
        $('#5').html(chatData["5"].trim());
        $('#6').html(chatData["6"].trim());
        $('#7').html(chatData["7"].trim());
        $('#8').html(chatData["8"].trim());
        $('#9').html(chatData["9"].trim());
        enableButton();
        if(receivedData["gameresult"][0]==="loser"){
            window.alert("You lose the game!");
            reloadGame();
        }
        else if(receivedData["gameresult"][0]==="winner"){
            window.alert("You won the game!");
            reloadGame();
        }
    }
}



function changeButton(event) {
    event = event || window.event; // IE
    var target = event.target || event.srcElement;
    var id = target.id;
    const btn = document.getElementById(id);
    // if(btn.textContent.trim().length == 0 && lastButtonClicked.getButtonText=="X"){
    //     btn.textContent = 'O';
    //     lastButtonClicked.changeText=btn.textContent;
    //     buttonClicked.changeButtonClickedCount = buttonClicked.getButtonClickedCount+1;
    // }
    // else if(btn.textContent.trim().length == 0 && lastButtonClicked.getButtonText=="O"){
    //     btn.textContent = 'X';
    //     lastButtonClicked.changeText= btn.textContent;
    //     buttonClicked.changeButtonClickedCount = buttonClicked.getButtonClickedCount+1;
    // }
    // else if(btn.textContent.trim().length == 0){
    //     btn.textContent = 'X';
    //     lastButtonClicked.changeText= btn.textContent;
    //     buttonClicked.changeButtonClickedCount = buttonClicked.getButtonClickedCount+1;
    // }
    if(userName===player1){
        btn.textContent = 'O';
    }
    else if(userName===player2){
        btn.textContent = 'X';
    }
    send();
    // if(buttonClicked.getButtonClickedCount>=5){
    //     if(document.getElementById("1").textContent.trim().length>0 
    //     && document.getElementById("4").textContent.trim().length>0 
    //     && document.getElementById("7").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("1").textContent==document.getElementById("4").textContent 
    //         && document.getElementById("1").textContent == document.getElementById("7").textContent)
    //         {
    //             window.alert(document.getElementById("1").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(document.getElementById("2").textContent.trim().length>0 
    //     && document.getElementById("5").textContent.trim().length>0 
    //     && document.getElementById("8").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("2").textContent==document.getElementById("5").textContent 
    //         && document.getElementById("8").textContent == document.getElementById("2").textContent)
    //         {
    //             window.alert(document.getElementById("2").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(document.getElementById("3").textContent.trim().length>0 
    //     && document.getElementById("6").textContent.trim().length>0 
    //     && document.getElementById("9").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("3").textContent==document.getElementById("6").textContent
    //          && document.getElementById("3").textContent == document.getElementById("9").textContent)
    //         {
    //             window.alert(document.getElementById("3").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(document.getElementById("1").textContent.trim().length>0 
    //     && document.getElementById("2").textContent.trim().length>0 
    //     && document.getElementById("3").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("1").textContent==document.getElementById("2").textContent && document.getElementById("3").textContent == document.getElementById("2").textContent)
    //         {
    //             window.alert(document.getElementById("1").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(document.getElementById("4").textContent.trim().length>0
    //          && document.getElementById("5").textContent.trim().length>0
    //          && document.getElementById("6").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("4").textContent==document.getElementById("5").textContent && document.getElementById("6").textContent==document.getElementById("5").textContent)
    //         {
    //             window.alert(document.getElementById("4").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(document.getElementById("7").textContent.trim().length>0
    //          && document.getElementById("8").textContent.trim().length>0 
    //          && document.getElementById("9").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("7").textContent==document.getElementById("8").textContent && document.getElementById("9").textContent == document.getElementById("7").textContent)
    //         {
    //             window.alert(document.getElementById("7").textContent.trim()+" won");
    //             reloadGame();
    //         }

    //     }
    //     if(document.getElementById("1").textContent.trim().length>0 
    //          && document.getElementById("5").textContent.trim().length>0
    //          && document.getElementById("9").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("1").textContent.trim()==document.getElementById("5").textContent.trim() && document.getElementById("9").textContent.trim() == document.getElementById("1").textContent.trim())
    //         {
    //             window.alert(document.getElementById("1").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(document.getElementById("3").textContent.trim().length>0
    //          && document.getElementById("5").textContent.trim().length>0 
    //          && document.getElementById("7").textContent.trim().length>0)
    //     {
    //         if(document.getElementById("3").textContent==document.getElementById("5").textContent && document.getElementById("7").textContent ==document.getElementById("5").textContent)
    //         {
    //             window.alert(document.getElementById("3").textContent.trim()+" won");
    //             reloadGame();
    //         }
    //     }
    //     if(buttonClicked.getButtonClickedCount==9){
    //         window.alert("No one won this game.");
    //         reloadGame();
    //     }
    // }
}