import fetchToDo from "./fetchFunctions/fecthToDo.js";

const but = document.getElementById("fetch-todos");
but.addEventListener("click",()=>{callAndAdd(10,0)});
async function callAndAdd(limit,skip){ 
    const data = await fetchToDo(limit,skip);
    let str=`<div id="loder" >Loading....</div>`;
    if(skip!=0) document.getElementById("loder").remove();
    const box = document.getElementById("main-box");
    let x = box.scrollHeight;
    data.todos.forEach((val)=>{
        str = str +
        `<div class="to-do-card" >
            <h3>${val.todo}</h3>
            <input type="checkbox" ${ val.completed ? "checked" :"" } >
        </div>` ;
    });
    box.innerHTML = str  + box.innerHTML ;
    if(skip==0) {
        box.scrollTop = box.scrollHeight;
    }
    else{
        box.scrollTop = box.scrollHeight - x;
    }
    const observer = new IntersectionObserver((iteams)=>{
        if(iteams[0].isIntersecting){
            callAndAdd(10,document.getElementById("main-box").children.length-1);
        }
    },{
        root:null,
        threshold:1,
        rootMargin:"0px",
    });
    observer.observe(document.getElementById("loder"));
}
