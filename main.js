// 유저가 값을 입력한다.
// +버튼을 클릭하면 item이 추가된다
// 유저가 delete 버튼을 누르면 item이 삭제된다
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다
// 진행중, 끝남 탭을 누르면 언더바가 이동한다.
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다.
// 전체 탭을 누르면 다시 전체 아이템으로 나온다.
// 1.check 버튼을 클릭하는 순간 true -> false
// 2.true이면 끝난걸로 간주하고 밑줄 보여주기
// 3.false이면 안끝난걸로 간주하고 그대로 

let TaskInput = document.getElementById("task-input");
let AddButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); //조건에 만족하는 모든걸 가져옴
let taskList = [];
let mode = "all";
let filterList = [];
let list = [];

AddButton.addEventListener("click", addTask);


TaskInput.addEventListener("keyup", function (event) { //엔터로 입력
    if (event.keyCode === 13) {
        addTask(event);
    }
})

for (let i = 1; i < tabs.length; i++) { //underline은 필요없기 때문에 1부터 시작
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    })
}


function addTask() {
    let task = {
        id: randomIDgenerate(), //각각의 item의 고유한 id번호를 만들어줌 
        taskContent: TaskInput.value,
        isComplete: false
    };

    taskList.push(task);
    render();
    TaskInput.value = "";

}

//그림을 그려주는 곳. UI 업데이트!
function render() {

    let resultHTML = "";

    if (mode == "all") {
        list = taskList;
    }
    else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">check</button>
                <button onclick="DeleteTask('${list[i].id}')">delete</button>
            </div>
        </div>`;
        }
        else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">check</button>
            <button onclick="DeleteTask('${list[i].id}')">delete</button>
        </div>
    </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML; //task보드에 resultHTML을 붙여넣을거야!
}

//체크되었다 안되었다
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; //! '아니다'라는 뜻임. 즉, 값의 반대편을 가져옴. 스위치처럼 왔다라 갔다리 할 때
            break;
        }
    }
    filter();
}

//random id 작성하기
function randomIDgenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function DeleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1) //i번째에 있는 아이템을 1개만 삭제할게!
        }
    }
    filter();
}


function filter(event) {

    filterList = [];

    if (event) {
        mode = event.target.id;
        document.getElementById("under-line").style.width = event.target.offsetWidth + "px";
        document.getElementById("under-line").style.top = event.target.offsetTop + event.target.offsetHeight + "px";
        document.getElementById("under-line").style.left = event.target.offsetLeft + "px";
    }

    if (mode == "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) { //아직 진행중인 item
                filterList.push(taskList[i]);
            }
        }
    }
    else if (mode == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) { //끝난 item
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}
