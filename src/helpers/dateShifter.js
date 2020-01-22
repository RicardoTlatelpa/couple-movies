function date(date){
    let test = date.split('-');
    test[3] = test[0] 
    test.shift();
    return test.join('/');
  }


  export {date};