async function fetchToDo(limit,skip){
    let a = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
    a = await a.json();
    return a;
}

export default fetchToDo;