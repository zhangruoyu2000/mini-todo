let tasks = [];// {title:"dddddd"}
function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    //inputEl.onchange = (e) => {
    //   console.log("text" , e.target.value)
    //}


    let addTask = () => {
        if (inputEl.value.length === 0) {
            alert("待办事项不能为空！")
            return;//可增加警告

        }
        let newTask = {
            title: inputEl.value,
            done: false,
        };
        inputEl.value = ""


        tasks.push(newTask);

        console.log("tasks: ", tasks);

        renderTaskItems();
    };



    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {

            addTask();
        }
    }

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };
}

function renderTaskItems() {
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");

    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done")
        }
        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done")
            }
        }
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = renderTaskCtrlBar(tasks, i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }
}
var a = 1;
var vbtnValue = "☆"

function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";


    let vipEl = document.createElement("button");
    vipEl.className = "vipbtn";
    vipEl.innerText = vbtnValue;
    vipEl.onclick = () => {
        if (a === 1) {
            vbtnValue = "★"
            vipEl.innerText = vbtnValue;
            a = a + 1;
        } else {
            vbtnValue = "☆"
            vipEl.innerText = vbtnValue;
            a = 1;
        }


        console.log(vipEl.innerText);

        //if(vipEl.innerText === "⭑") {
        //vipEl.innerText = "⭒";
        //}
        renderTaskItems();


    }



    ctrlbarEl.append(vipEl);






    let upEl = document.createElement("button");
    //开头箭头停用
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "⇡";
    upEl.onclick = () => {
        //实现向上移动
        tasks.splice(taskIdx - 1, 0, tasks[taskIdx]);
        tasks.splice(taskIdx + 1, 1);

        //刷新
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);


    let downEl = document.createElement("button");
    //末尾箭头停用
    if (taskIdx === (tasks.length - 1)) {
        downEl.disabled = true;

    }
    downEl.innerText = "⇣";
    downEl.onclick = () => {
        //实现向下移动
        tasks.splice(taskIdx + 2, 0, tasks[taskIdx]);
        tasks.splice(taskIdx, 1);

        //刷新
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);

    let cancelEl = document.createElement("button");
    cancelEl.innerText = "x";
    cancelEl.onclick = () => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();
    };

    ctrlbarEl.append(cancelEl);

    return ctrlbarEl;


}

renderEditor();
renderTaskItems();


