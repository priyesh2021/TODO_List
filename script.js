ShowList();
let valueinput = document.getElementById("valinput");
let addedtasklist = document.getElementById("listing-item");
let valueupdate = document.getElementById("valupdate");

valueinput.addEventListener("keypress",function (e){
    if(e.key == "Enter"){
        let listItem = valueinput.value;
        if(listItem.length>0){
        let tasks = localStorage.getItem("taskslist");
        if(tasks===null){
            var taskobj=[];
        }
        else{
            taskobj=JSON.parse(tasks);
        }
        
        taskobj.push(listItem);
        localStorage.setItem("taskslist",JSON.stringify(taskobj))
        valueinput.value ='';
        ShowList();
    }
    }
})

function ShowList(){
    let tasks = localStorage.getItem("taskslist");
    if(tasks===null){
        var taskobj=[];
    }
    else{
        taskobj=JSON.parse(tasks);
    };

    let html = '';
    let addedtasklist = document.getElementById("listing-item");
    taskobj.forEach((item,index) => {
        if(item.length>0){
            html += `
            <div class="row mt-3">
                    <div class="col-9" id="list-name">
                      <p>
                        ${item}
                      </p>
                    </div>
                    <div class="col-1" id="list-icon"><i class="bi bi-clipboard2-check-fill checkicon" ></i></div>
                    <div class="col-1"><i class="bi bi-pencil-fill editicon" onclick="updatetask(${index})"></i></div>
                    <div class="col-1"><i class="bi bi-trash-fill delicon" onclick="deleteitem(${index})"></i></div>
                  </div>
            `;
        }
       

    });
    addedtasklist.innerHTML=html; 
}

function deleteitem(index){
    let tasks = localStorage.getItem("taskslist")
    let taskobj = JSON.parse(tasks)
    taskobj.splice(index,1);
    localStorage.setItem("taskslist",JSON.stringify(taskobj))
    location.reload();

}

addedtasklist.addEventListener("click",(e)=>{
    if(e.target.classList.contains("checkicon")){
        e.target.parentNode.previousElementSibling.firstChild.nextSibling.style.textDecoration ="line-through";  
    }
})


function updatetask(index){
    valueupdate.style.display="block";
    let tasks = localStorage.getItem("taskslist");
    let taskobj = JSON.parse(tasks);
    valueupdate.value = taskobj[index];

   valueupdate.addEventListener('keypress', function(e){
        if(e.key=='Enter'){
            let tasks = localStorage.getItem("taskslist");
            tasks = JSON.parse(tasks)
            if(valueupdate.value.length>0){
                tasks[index] = valueupdate.value;
                localStorage.setItem("taskslist",JSON.stringify(tasks));
                location.reload();
                valueupdate.value='';
            }
            else{
                alertbox.style.display="block";
                setInterval(function(){
                    alertbox.style.display="none";
                },1500)
            }
            
            
        }
    })
}
