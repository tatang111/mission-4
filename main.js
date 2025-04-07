const listTodo = document.getElementById("listTodo");
const textList = document.getElementById("textList");
const dateList = document.getElementById("dateList");
const priorityList = document.getElementById("priorityList");
const doneSection = document.getElementById("doneSection");

let doneArray = []
let textDone = ""

function handleDeleteButtonDone() {
    doneArray = [];
    showDoneSection();
}

function handleDeleteButtonList() {
    while (listTodo.lastElementChild) {
        listTodo.removeChild(listTodo.lastElementChild)
    }
    showDoneSection();
}

function handleAddTodo(e) {
    e.preventDefault();
    let jamTersisa, hariTersisa, priorityColor, dateNow = new Date(), listDeadline = new Date(dateList.value);
    let timeRemain;

    // For button disabled sebelum semua terisi
    console.log(priorityList.value)
    if (textList.value.trim() === "" || dateList.value === "" || priorityList.value === "") {
        alert("Isi semua terlebih dahulu ya...😉")
        return;
    }

    // For Time Remain
    jamTersisa = 24 - dateNow.getHours();
    hariTersisa = (listDeadline.getMonth() === dateNow.getMonth()) ? listDeadline.getDate() - dateNow.getDate() - 1 : 30 + listDeadline.getDate() - dateNow.getDate() - 1;
    if (!jamTersisa && !hariTersisa) {
        timeRemain = `<span class="text-3xl -mt-1 text-red-500 font-[700] border-b-3">OVERDUE</span>`
    } else {
        timeRemain = `<span>Time Remain: ${hariTersisa}h ${jamTersisa}j ${" "}</span>`
    }

    // For Awalan
    let list = document.createElement("div");
    let checkboxValue = document.getElementById("doneList")
    let uniqueID = Date.now();
    list.id = uniqueID;
    list.className = "p-[15px] flex justify-between bg-[#FF9149] w-full rounded-xl flex-col md:flex-row md:h-[50px]";

    // For Priority Color
    if (priorityList.value === "low") {
        priorityColor = "text-red-500";
    } else if (priorityList.value === "medium") {
        priorityColor = "text-yellow-200";
    } else {
        priorityColor = "text-green-300";
    }


    // For Left Div List
    let leftDiv = document.createElement("div");
    leftDiv.innerHTML = `${textList.value}`
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    leftDiv.classList.add("flex", 'gap-2', "items-center")
    leftDiv.appendChild(checkbox);
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            leftDiv.classList.add("line-through", "opacity-70");
            doneArray.push({
                text: leftDiv.textContent,
                id: uniqueID
            })
        } else {
            leftDiv.classList.remove("line-through", "opacity-70");
            doneArray = doneArray.filter(value => value.id !== uniqueID)
            console.log(doneArray)
        }
        showDoneSection();
    });

    // For Right Div List
    let rightDiv = document.createElement("div");
    rightDiv.innerHTML = ` <div class="flex items-center -mt-1 gap-1">
                         ${timeRemain}
                         <span class="${priorityColor} italic border-b uppercase text-lg font-[600]">${" "} ${priorityList.value}</span>
                     </div>`

    list.appendChild(leftDiv);
    list.appendChild(rightDiv);

    textList.value = ""
    dateList.value = ""
    priorityList.value = ""
    priorityColor = ""
    listTodo.appendChild(list)

}

function showDoneSection() {
    doneSection.innerHTML = ""

    // Create Done List
    doneArray.forEach((doneList) => {
        let div = document.createElement("div");
        div.innerHTML = `<div class="w-full bg-[#ff9149] flex justify-between p-[15px] rounded-xl text-xl">
                    <span>${doneList.text}</span>
                    <i class="fa-solid fa-square-check text-2xl pt-[2px]" style="color: #00ffb3;"></i>
                </div>`
        doneSection.appendChild(div)
    })
}

// For Time Remain
document.addEventListener("DOMContentLoaded", () => {
    // Validasi nama dan jabatan
    let nama = ''
    let jabatan = ''
    while (!nama || nama.trim() == "") {
        nama = prompt("Masukkan nama anda : ")
        if (nama === null) {
            alert("Harus diisi yah😁")
        } else if (!nama || nama.trim() == "") {
            alert("Harus diisi yah😁")
        }
    }
    while (!jabatan || jabatan.trim() == "") {
        jabatan = prompt("Masukkan jabatan anda : ")
        if (jabatan === null) {
            alert("Harus diisi yah😁")
        } else if (!jabatan || jabatan.trim() == "") {
            alert("Harus diisi yah😁")
        }
    }
    document.getElementById("userName").innerHTML = nama
    document.getElementById("userJob").innerHTML = jabatan

    // Logic time remaining
    const today = new Date();
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    let maxDateString = maxDate.toISOString().substring(0, 10)
    const minDateString = today.toISOString().substring(0, 10);
    dateList.setAttribute("min", minDateString)
    dateList.setAttribute("max", maxDateString)
})