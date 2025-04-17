// main.js

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskTabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
addButton.addEventListener("click", addTask);

for(let i = 1;i<taskTabs.length;i++){
    taskTabs[i].addEventListener("click",function(event){
        filter(event);
    });
}
console.log(taskTabs);

// 엔터 키로도 추가되도록 이벤트 리스너 추가 (개선)
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    // 입력값이 비어있으면 추가하지 않음 (개선)
    if (taskInput.value.trim() === "") {
        alert("할 일을 입력해주세요.");
        return;
    }
    // 할 일 내용을 객체로 저장 (isComplete 상태 포함)
    let task = {
        id: randomIDGenerate(), // 각 task에 고유 ID 부여 (추가 개선)
        taskContent: taskInput.value,
        isComplete: false
    };
    // ★ 수정된 부분 1: task 객체를 배열에 추가
    taskList.push(task);
    console.log("Task List Updated:", taskList);

    render();

    taskInput.value = "";
    taskInput.focus();
}

function render() {
    let list = [];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
               </div>`
        }else{
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
               </div>`;
        }

       
    }

    document.getElementById("task-board").innerHTML = resultHTML;
    console.log("Rendering complete.");
}

function deleteTask(id){
   for(let i = 0;i<taskList.length;i++){
    if(taskList[i].id == id){
        taskList.splice(i,1);
        break;
    }
   }
   render();
}
function filter(event){
     mode = event.target.id;
     filterList = [];
    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(let i = 0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }

        }
        render();
        console.log("진행중",filterList);
    }else if(mode === "done"){
        for(let i = 0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}
// 각 task에 고유 ID를 부여하는 함수 (추가 개선)
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function toggleComplete(id) {
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
// 페이지 로드 시 초기 렌더링 (만약 필요하다면)
// render();