function nextPlayer(players,currentplayer,reverse){

    let i = players.indexOf(currentplayer)


    if(reverse==1){
      i = i-1
      if(i<0){
        i = -i
        i = 4-i
      }
      i = i%4
    }
    else{
        i = (i+1)%4;    
    }

    return i;
  
}

module.exports = nextPlayer;


// i = 0
// while(1){
//   console.log(players[i]);

//   let reverse = Number(readline.question());

//     if(reverse==1){
//       i = i-1
//       if(i<0){
//         i = -i
//         i = 4-i
//       }
//       i = i%4
//     }
//     else{
//         i = (i+1)%4;    
//     }

// }



// 1
// 2
// 3
// 4
// 5
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// -1 => 1
// -2 => 2
// -3
// -4
// -5

// 1 2 3 4 1 2 3 4 1 2 "if reverse"
// 1 4 3 2 1 