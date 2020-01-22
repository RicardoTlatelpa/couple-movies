 const findMatches = (input,array) =>{
    return array.filter(genre => {
        const regex = new RegExp(input, 'gi');
        return genre.match(regex);
    })
}

export { findMatches }