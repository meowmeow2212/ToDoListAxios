import { callApi } from "./../js/utils/callApi.js";
import Task from "./../js/Models/Task.js";
import Validate from "./../js/Models/Validate/Validate.js";

const getEle = (id) => document.getElementById(id);

const renderHTML = () => {
    const content = `
        <div class="card">
        <div class="card__header">
          <img src="./img/X2oObC4.png" />
        </div>
        <!-- <h2>hello!</h2> -->
        <div class="card__body">
          <div class="card__content">
            <div class="card__title">
              <h2>My Tasks</h2>
              <p>September 9,2020</p>
            </div>
            <div class="card__add">
              <input id="newTask" type="text" placeholder="Enter an activity..." />
              <button id="addItem">
                <i class="fa fa-plus"></i>
              </button>
            </div>
            <div id="notiInput" class="alert-danger" style="display: none"></div>
            <div class="card__todo">
              <!-- Uncompleted tasks -->
              <ul class="todo" id="todo"></ul>
              <!-- Completed tasks -->
              <ul class="todo" id="completed"></ul>
            </div>
          </div>
        </div>
      </div>
        `;
    getEle("root").innerHTML = content;
};

const renderListTask = () => {
    callApi(`ToDoList`, "GET", null)
        .then((result) => {
            let contentTodo = "";
            let contentCompleted = "";
            result.data.forEach((task) => {

                if (task.taskStatus === "todo") {
                    contentTodo += `
                    <li>
                        <span> ${task.taskName} </span>
                        <div class="buttons">
                            <button class="remove" onclick="deleteTask('${task.id}')">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            <button class="complete">
                                <i class="fa fa-check-circle" onclick="updateStatus('${task.id}')"></i>
                            </button>
                        </div>
                    </li>
                    `;
                }
                else {
                    contentCompleted += `
                    <li>
                        <span>${task.taskName}</span>
                        <div class="buttons">
                            <button class="remove" onclick="deleteTask('${task.id}')">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            <button class="complete">
                                <i class="fa fa-check-circle fas" onclick="updateStatus('${task.id}')"></i>
                            </button>
                        </div>
                    </li>
                    `;
                }
            })
            getEle("todo").innerHTML = contentTodo;
            getEle("completed").innerHTML = contentCompleted;
        })
        .catch((err) => {
            console.log(err);
        });
};

renderHTML();
renderListTask();

window.deleteTask = deleteTask;
function deleteTask(id) {
    callApi(`ToDoList/${id}`, "DELETE", null)
        .then(() => {
            alert("Xóa task thành công!");
            renderListTask();
        })
};

getEle("addItem").addEventListener("click", function () {
    const taskNameInput = getEle("newTask").value;
    const taskStatus = "todo";

    const task = new Task(" ", taskNameInput, taskStatus, taskNameInput);

    callApi(`ToDoList`, "GET", null)
        .then((result) => {
            const taskList = result.data;

            //check task name chưa nhập hoặc task trùng 
            const isValid = Validate(taskNameInput, taskList);
            if (isValid) {
                callApi(`ToDoList`, "POST", task)
                    .then(() => {
                        alert("Thêm task thành công!");
                        renderListTask();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });

});

window.updateStatus = updateStatus;
function updateStatus(id) {
    callApi(`ToDoList/${id}`, "GET", null)
        .then((result) => {
            const id = result.data.id;
            const taskName = result.data.taskName;
            let taskStatus = result.data.taskStatus;
            const taskText = result.data.taskText;

            if (taskStatus === "todo") {
                taskStatus = "completed";
            } else {
                taskStatus = "todo";
            }

            const taskUpdate = new Task(id, taskName, taskStatus, taskText);

            callApi(`ToDoList/${id}`, "PUT", taskUpdate)
                .then((result) => {
                    alert("Thay đổi trạng thái task thành công!")
                    renderListTask();
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

}
