let wecker = new Layer("Wecker", "fa-solid fa-clock", 700);

let path = "";

let body = document.createElement("div");

let filesplace = document.createElement("div");
filesplace.classList.add("file-group");
filesplace.classList.add("mt-n15");

let timeSelect = document.createElement("input");
timeSelect.classList.add("stylish");
timeSelect.type = "time";

let filesBtn = createFilesBtn(wecker);

let clearBtn = createClearBtn(wecker);

let inputGroup = document.createElement("div");
inputGroup.classList.add("input-group");
inputGroup.classList.add("mb-15");

inputGroup.append(timeSelect);
inputGroup.append(filesBtn);
inputGroup.append(clearBtn);

let tableWrapper = document.createElement("div");
tableWrapper.classList.add("table-wrapper");

let table = document.createElement("table");

tableWrapper.append(table);

body.append(filesplace);
body.append(inputGroup);
body.append(tableWrapper);

wecker.setBody(body);

wecker.build();