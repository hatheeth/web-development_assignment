function formatText(button, command) {
    document.execCommand(command, false, null);

    updateButtonState(button, command);
}

function updateButtonState(button, command) {
    let isActive = document.queryCommandState(command);
    let img = button.querySelector("img");
    const iconMap = {
        bold: ["icons8-bold-50 (1).png", "icons8-bold-50.png"],
        italic: ["icons8-italic-50.png", "icons8-italic-50 (1).png"],
        underline: ["icons8-underline-50 (1).png", "icons8-underline-50.png"],

    }
    if (iconMap[command]) {
        img.src = isActive ? iconMap[command][1] : iconMap[command][0];
    }
}

function alignment(button, align) {
    let editor = document.getElementById("editor");
    editor.style.textAlign = align;
    document.querySelectorAll(".aliB").forEach(btn => {
        btn.classList.remove("active");
        btn.querySelector("img").src = getIcon(btn.getAttribute("onclick"));
    });

    button.querySelector("img").src = getActiveIcon(align);
    button.classList.add("active");

}

document.addEventListener("selectionchange", function () {
    let boldButton = document.querySelector("button[onclick*='bold']");
    let italicButton = document.querySelector("button[onclick*='italic']");
    let underlineButton = document.querySelector("button[onclick*='underline']");

    updateButtonState(boldButton, 'bold');
    updateButtonState(italicButton, 'italic');
    updateButtonState(underlineButton, 'underline');

})


function getIcon(align) {
    const icons = {
        "alignment(this,'right')": "icons8-align-right-50.png",
        "alignment(this,'left')": "icons8-align-left-50 (1).png",
        "alignment(this,'center')": "icons8-align-center-50.png",
        "alignment(this,'justify')": "icons8-align-justify-50.png"
    };
    return icons[align] || "";
}

function getActiveIcon(align) {
    const activeIcons = {
        "right": "icons8-align-right-50 (1).png",
        "left": "icons8-align-left-50.png",
        "center": "icons8-align-center-50 (1).png",
        "justify": "icons8-align-justify-50 (1).png"
    };
    return activeIcons[align] || "";
}


function color() {
    document.getElementById("colorPickerBtn").addEventListener("click", function () {
        document.getElementById("colorPicker").click(); // Opens color picker
    });

    document.getElementById("colorPicker").addEventListener("input", function () {
        document.execCommand("foreColor", false, this.value); // Apply selected color
    });
}

window.onload = function () {
    let editor = document.getElementById("editor");
    editor.style.textAlign = "left";

    let leftButton = document.querySelector("button[onclick*='left']");
    leftButton.classList.add("active");
    leftButton.querySelector("img").src = "icons8-align-left-50.png";

}

let history = [];
let currentStep = -1;

document.addEventListener("DOMContentLoaded", function() {
    let editor = document.getElementById("editor");
    if (editor) {
        editor.addEventListener("input", saveState);
    } else {
        console.error("Editor element not found."); 
    }
});


function saveState() {
    console.log("Saving state...");
    let editorContent = document.getElementById("editor").innerHTML;
    history = history.slice(0, currentStep + 1); 
    history.push(editorContent);
    currentStep++;
}

function undo() {
    if (currentStep > 0) {
        currentStep--;
        document.getElementById("editor").innerHTML = history[currentStep];
    }
}

function redo() {
    if (currentStep < history.length - 1) {
        currentStep++;
        document.getElementById("editor").innerHTML = history[currentStep];
    }
}


document.getElementById("editor").addEventListener("input", saveState);



