import fetchToDo from "./fetchFunctions/fecthToDo.js";

const fetchTodosButton = window.document.getElementById("fetch-todos");
fetchTodosButton.addEventListener("click",()=>{fetchAnsAdd(true,0)});
async function fetchAnsAdd(clear,skip) {
    let data = await fetchToDo(10,skip);
    const box = document.getElementById("main-box");
    if(clear) box.innerHTML="";
    if(document.getElementById("inLoader")){
        document.getElementById("loder").remove();
        document.getElementById("inLoader").remove();
    }
    data.todos.forEach((val)=>{
        const innerBox = document.createElement("div");
        innerBox.classList.add("to-do-card");
        const h3 = document.createElement("h3");
        h3.innerText =  val.todo;
        const input = document.createElement("input");
        input.setAttribute("type","checkbox");
        input.checked = val.completed;
        innerBox.appendChild(h3);
        innerBox.appendChild(input);
        box.append(innerBox);
    });

        let loadAgain = document.createElement("div");
        loadAgain.setAttribute("id","inLoader")
        box.append(loadAgain);

        let loder = document.createElement("h1");
        loder.setAttribute("id","loder")
        loder.innerHTML="Loading....";
        box.append(loder);

        setIf(document.getElementById("inLoader"));
}
///////

function setIf(infiniteLoder){
    function fun(elements){
        if(elements[0].isIntersecting){
            fetchAnsAdd(false,document.getElementById("main-box").childNodes.length-2);
        }
    }
    let observer = new IntersectionObserver(fun,{
        threshold:1,
        root:null,
        rootMargin:"0px"
    })
    observer.observe(infiniteLoder);
} 

