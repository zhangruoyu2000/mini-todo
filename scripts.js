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
            console.log("onchange:", e)

            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done")
            }
        }
        itemEl.append(doneEl);

        let vipEl = document.createElement("input");
        vipEl.type = "checkbox";
        vipEl.checked = task.done;
        if (task.done) {
            console.log(1);
            itemEl.classList.add("vip");
        } else {
            console.log(2);
            itemEl.classList.remove("vip")
        }
        vipEl.onchange = (e) => {
            console.log("onchange:", e)

            task.done = e.target.checked;
            if (task.done) {
                console.log(3);
                itemEl.classList.add("vip");
            } else {
                console.log(4);
                itemEl.classList.remove("vip")
            }
        }
        itemEl.append(vipEl);



        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = renderTaskCtrlBar(tasks, i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }

    
}
var a = 1;
var vbtnValue = "☆";

function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";
    

    // for (let i = 0; i < tasks.length; i++) {
    //     let vipEl = document.createElement("input");
    //     vipEl.className="CB"
    //     let task = tasks[i];
    //     vipEl.type = "checkbox";
    //     vipEl.checked = task.done;
    //     if (task.done) {
    //         console.log(0);
    //         itemEli.classList.add("vip");
    //     } else {
    //         console.log(1);
    //         itemEl.classList.remove("vip")
    //     }
    //     vipEl.onchange = (e) => {
    //         console.log("onchange:", e)
    //         task.done = e.target.checked;
    //         if (task.done) {
    //             console.log(3);
    //             itemEl.classList.add("vip");

    //         } else {
    //             console.log(4);
    //             itemEl.classList.remove("vip")

    //         }
    //     }
    //     ctrlbarEl.append(vipEl);



    // }






    //() => {
    // console.log(vipEl.id);
    // console.log(taskIdx);
    // if (vipEl.id === taskIdx) {
    //     console.log(1);
    //     if (a === 1) {
    //         vipEl.className = "vipTure";
    //         console.log(222);//
    //         a = 2;
    //     } else {
    //         vipEl.className = "vipFalse";
    //         a = 1;
    //     }
    //     if (vipEl.className === "vipTure") {
    //         console.log(0)
    //         vbtnValue = "★"
    //         vipEl.innerText = vbtnValue;
    //     } else {
    //         vbtnValue = "☆"
    //         vipEl.innerText = vbtnValue;
    //     }
    // }

    //     console.log(vipEl.id);
    //     console.log(taskIdx);
    //     console.log(vipEl)


    //renderTaskItems();
    // }
    //ctrlbarEl.append(vipEl);












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


