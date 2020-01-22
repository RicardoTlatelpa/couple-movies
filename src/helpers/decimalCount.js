function decimal(number){
    let string = number.toString().split('').reverse();  
    let count = 0;
    for(let i = 0; i < string.length; i++){
      if(count === 3){
        string[i] += ',';
        count = 0;
      }
      count++
    }
  return string.reverse().join('');
  }

  export{decimal};