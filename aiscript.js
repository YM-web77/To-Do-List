let inputTask = document.getElementById("task-input");
let btn = document.getElementById("btn");
let tasksList = document.getElementById("tasks-list");

// 1. استرجاع المهام المحفوظة ملي تفتح الصفحة
// window.addEventListener("DOMContentLoaded", loadTasks);

// 2. الإضافة بالكليك على الزر أو بالضغط على Enter
btn.addEventListener("click", addTask);
inputTask.addEventListener("keypress", function (e) {  
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let inputValue = inputTask.value.trim();

    if (inputValue === "") {
        return;
    } else {
        createTaskElement(inputValue, false); // false = مازال ما تكملاتش
        saveTasks(); // حفظ فـ LocalStorage
        inputTask.value = "";
    }
}

// دالة كتنشئ الـ li باش نستعملوها سوا فالإضافة الجديدة أو فالاسترجاع
function createTaskElement(text, isCompleted) {
    let li = document.createElement("li");

    // كنحددو واش الأيقونة والنص غايبانو مشطوب عليهم ولا عاديين
    const iconClass = isCompleted ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
    const textClass = isCompleted ? "line-through" : "";

    li.innerHTML = `<span class="circle"><i class="${iconClass}"></i></span>
    <span class="${textClass}">${text}</span>
    <span class="del-icon"><i class="fa-solid fa-delete-left"></i></span>`;

    tasksList.append(li);
}

// 3. التفاعل مع التحديد والحذف
tasksList.addEventListener("click", function (e) {
    // --- تحديد المهمة ---
    const circle = e.target.closest(".circle");
    if (circle) {
        const icon = circle.querySelector("i");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-circle");
        icon.classList.toggle("fa-solid");
        icon.classList.toggle("fa-circle-check");

        const content = circle.nextElementSibling;
        if (content) {
            content.classList.toggle("line-through");
        }
        saveTasks(); // تحديث الحالة فـ LocalStorage
    }

    // --- حذف المهمة ---
    const delBtn = e.target.closest(".del-icon");
    if (delBtn) {
        const li = delBtn.closest("li");
        if (li) {
            li.remove();
            saveTasks(); // تحديث اللائحة فـ LocalStorage
        }
    }
});

// 4. دالة حفظ جميع المهام فـ LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#tasks-list li").forEach(li => {
    
        const textSpan = li.querySelector("span:nth-child(2)"); // الـ span الثاني هو النص
        tasks.push({
            text: textSpan.textContent,
            completed: textSpan.classList.contains("line-through")
        });
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}


// 5. دالة قراءة المهام من LocalStorage وإظهارها
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("myTasks") || [] ) ;
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

loadTasks()