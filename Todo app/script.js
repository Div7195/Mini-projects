let pendingTasks = [];
let completedTasks = [];
let editingId = '';
var addButton = document.getElementById('saveButtonView');
let pendingListView = document.getElementById('pendingListView');
let completeListView = document.getElementById('completeListView');
let blogFormView = document.getElementById('blogFormView');
let blogEditView = document.getElementById('blogFormEditView');
let editButtonView = document.getElementById('editTaskButtonView');
let makeNewItemView = document.getElementById('newTaskButtonView');
editButtonView.addEventListener('click', function(){
    let title = document.getElementById('titleEditView');
    let desc = document.getElementById('descEditView');
    for(let i = 0; i < pendingTasks.length; i++){

        if(pendingTasks[i].id === editingId){
            pendingTasks[i].title = title.value;
            pendingTasks[i].description = desc.value;
            break;
        }
        
    }
    while (pendingListView.firstChild) {  
        pendingListView.removeChild(pendingListView.firstChild);  
    }
    updatePendingList(pendingTasks);  
    
});
makeNewItemView.addEventListener('click', function(){
    blogEditView.style.display = 'none';
    blogFormView.style.display = 'block';
    editingId = '';

});
addButton.addEventListener('click', addNewTask);

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


function addNewTask(){
    let titleEntered = document.getElementById('titleView');
    let descEntered = document.getElementById('descView');
    const date = new Date();
    pendingTasks.push({id:makeid(20), title:titleEntered.value, description:descEntered.value, date:date.toDateString()});
    getTaskView(pendingTasks[pendingTasks.length - 1]);
    titleEntered.value = '';
    descEntered.value = '';

}
function updatePendingList(list){

    for(let i = 0; i < list.length; i++){
        getTaskView(list[i]);
    }

}
function updateCompleteList(list){
    for(let i = 0; i < list.length; i++){
        getCompleteTaskView(list[i]);
    }
}

function getTaskView(item){
        var taskItemView = document.createElement("div");
        taskItemView.innerHTML = `<div class="taskItem">
        <div class="dateIcon">
           <div class="dateEntry">
               ${item.date}
           </div>
           <div class="iconEntry" >
               <i class="fa-solid fa-pen-to-square" id="editButtonView" style="color: #4eb814;cursor: pointer; font-size: 20px;padding:6px;"></i>
               <i class="fa-sharp fa-solid fa-trash" id="deleteButtonView" style="color: #f92424;cursor: pointer; font-size: 20px;margin-left: 10px;padding:6px;"></i>
               <i class="fa-solid fa-check"  id="checkButtonView" style="color: #62c610;cursor: pointer; font-size: 20px;margin-left: 10px;padding:6px;"></i>
           </div>
        </div>
        <div class="titleDesc">
           <div class="titleEntry" id="taskTitleView">
           ${item.title}
           </div>
        <div class="descEntry" id="taskDescView">
           ${item.description}
            </div>
        </div>
        
   </div>`;
   var tickView = taskItemView.querySelector('#checkButtonView');
   var deleteView = taskItemView.querySelector('#deleteButtonView');
   var editView = taskItemView.querySelector('#editButtonView');
   tickView.addEventListener('click', function completeTask(){
    completedTasks.push({id:item.id, title:item.title, description:item.description, date:item.date});
    getCompleteTaskView(completedTasks[completedTasks.length - 1]);
    pendingTasks = pendingTasks.filter(e => e.id !== item.id);
    while (pendingListView.firstChild) {  
        pendingListView.removeChild(pendingListView.firstChild);  
    }
    updatePendingList(pendingTasks);  
    });
    deleteView.addEventListener('click', function deleteTask(){
        pendingTasks = pendingTasks.filter(e => e.id !== item.id);
        while (pendingListView.firstChild) {  
            pendingListView.removeChild(pendingListView.firstChild);  
        }
        updatePendingList(pendingTasks);  
    });
    editView.addEventListener('click', function editTask(){
        blogFormView.style.display = 'none';
        blogEditView.style.display = 'block';
        let title = document.getElementById('titleEditView');
        let desc = document.getElementById('descEditView');
        editingId = item.id;
        title.value = item.title;
        desc.value = item.description;
    });

   
   pendingListView.appendChild(taskItemView);
   
        
}

function getCompleteTaskView(item){
    var taskItemView = document.createElement("div");
    taskItemView.innerHTML = `<div class="taskItem">
    <div class="dateIcon">
       <div class="dateEntry">
           ${item.date}
       </div>
       <div class="iconEntry">
           <i class="fa-sharp fa-solid fa-trash" id="deleteButtonView" style="color: #f92424;cursor: pointer; font-size: 20px;margin-left: 10px;padding:6px;"></i>
       </div>
    </div>
    <div class="titleDesc">
       <div class="titleEntry" id="taskTitleView">
       ${item.title}
       </div>
    <div class="descEntry" id="taskDescView">
       ${item.description}
        </div>
    </div>
    
</div>`;
var deleteView = taskItemView.querySelector('#deleteButtonView');
deleteView.addEventListener('click', function deleteCompletedTask(){
    
    completedTasks = completedTasks.filter(e => e.id !== item.id);
    while (completeListView.firstChild) {  
        completeListView.removeChild(completeListView.firstChild);  
    }
    updateCompleteList(completedTasks);  
});
completeListView.appendChild(taskItemView);
    
}