let UserInput = document.getElementById("task-input");
let AddButton = document.getElementById("add-button");
let TaskTabs = document.querySelectorAll(".task-tabs div");

let taskList = [];
let filterList = [];
let list = [];
let isComplete;
let mode = "all";



for (let i = 1; i < TaskTabs.length; i++) {

    TaskTabs[i].addEventListener("click", (event) => {
        filter(event);
    });

}


//task 생성
const Create = () => {
    let task = {
        inputText: UserInput.value,
        id: RandomID(),   //task마다 고유한 id값을 가짐 
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList)
    render();
}

//task 데이터 생성시, 스타일 구현하는 함수
const render = () => {
    let TextHTML = '';

    if (mode == "all") {
        list = taskList;
    }
    else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            TextHTML += `<div class="task">
            <div class="task-done">
                    ${list[i].inputText}
            </div>
            <div>
                 <button type="button" onclick="toggle('${list[i].id}')">check</button>
                 <button type="button" onclick="Delete('${list[i].id}')">delete</button>
            </div>
        </div>`
        }
        else {
            TextHTML += `<div class="task">
            <div>
            ${list[i].inputText}
            </div>
            <div>
                <button type="button" onclick="toggle('${list[i].id}')">check</button>
                <button type="button" onclick="Delete('${list[i].id}')">delete</button>
            </div>
        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = TextHTML;

}

const filter = (event) => {

    filterList = [];

    //필터클릭 시, 언더바 스타일부분
    if (event) {
        mode = event.target.id;
        document.getElementById("under-line").style.left = event.currentTarget.offsetLeft + "px";
        document.getElementById("under-line").style.width = event.currentTarget.offsetWidth + "px";
        document.getElementById("under-line").style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
    }

    if (mode == "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
    }
    else if (mode == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
    }

    render();
}

//task 체크여부 판단하는 함수
const toggle = (id) => {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !(taskList[i].isComplete); //토글 on,off
        }
    }
    filter();
}

//고유 id 생성하는 함수
const RandomID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

//task 삭제 함수
const Delete = (id) => {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1) //i번째에 1개의 데이터를 빼낸다.
        }
    }
    console.log(taskList)
    filter()
}

AddButton.addEventListener("click", Create); //호이스팅때문에,,,쫌 더 공부해보자,,,

UserInput.addEventListener("keydown",(event)=>{
    if(event.keyCode === 13){
        Create();
        UserInput.value = '';
    }
})