
const Validate = (taskName, taskList) => {
    let isValis = true;

    if (taskList.length === 0 && taskName === "") {
        alert("Chưa nhập tên task!");
        isValis = false;
    }
    else{
        for (var i = 0; i < taskList.length; i++) {
            const nameTask = taskList[i].taskName;
            if (taskName === "" ) {
                alert("Chưa nhập tên task!");
                isValis = false;
                break;
            }
            if (taskName.toLowerCase() === nameTask.toLowerCase()) {
                alert("Task đã tồn tại. Vui lòng nhập tên task khác!");
                isValis = false;
                break;
            }

        }
    }
    return isValis;
}
export default Validate;