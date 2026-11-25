//select ele
let inputTask = document.getElementById("task-input");
let btn = document.getElementById("btn");
let tasksList = document.getElementById("tasks-list");


//add element when click to btn
btn.addEventListener('click', addTask);
//add ele with enter
inputTask.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        addTask()
    }
})

//function add task to tasks list
function addTask(){
    let inputValue = inputTask.value;

    if(inputValue === ""){
        return;
    }else{

        createTaskElement(inputValue, false);
        inputTask.value = ""
        
    }
    saveTask()
}



function createTaskElement(text, isCompleted){
    let li = document.createElement('li');

    let textClass = isCompleted ? "line-through" : "";
    let circleClass = isCompleted ? "fa-solid fa-circle-check" : "fa-regular fa-circle"
        

    li.innerHTML = `<span class ="circle"><i class ="${circleClass}"></i></span>
    <span class ="${textClass}">${text}</span>
    <span class= "del-icon"><i class = "fa-solid fa-delete-left"></i></span>`


    tasksList.append(li)

}


// add icon || remove li
tasksList.addEventListener('click', function (e) {
    // 1. كنتأكدو بلي الكليك وقع على الدائرة أو الأيقونة اللي وسطها
    const circle = e.target.closest('.circle');

    if (circle) {
        // 2. تبديل الأيقونة من دائرة خاوية لعلامة صح
        const icon = circle.querySelector('i');
        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-circle');
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('fa-circle-check');

        // 3. كنجيبو الـ <span> ديال النص (اللي جاي نيشان مورا .circle) وكنديرو ليه خط
        const content = circle.nextElementSibling;
        
        content.classList.toggle('line-through');
        
    }

    //delete li when we click to delete icon span
    let del = e.target.closest('.del-icon');
    if (del){
        let li = del.closest('li');
        if(li){
            li.remove();
        }
    }
    saveTask()
});


function saveTask(){
    let tasks = [];

    let lis = tasksList.querySelectorAll('li');
    
    lis.forEach(li =>{
        let span2 = li.querySelector('span:nth-child(2)');
        let text = span2.textContent;
        tasks.push(
            {content: text,
            completed: span2.classList.contains("line-through")
        });

    localStorage.setItem("myTasks", JSON.stringify(tasks))
        
        
    })
}


function loadTasks(){
    let myTasks = (JSON.parse(localStorage.getItem('myTasks')));
    console.log(myTasks);
    myTasks.forEach(li =>{
        createTaskElement(li.content, li.completed)
    })
}

loadTasks()




