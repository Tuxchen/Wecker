async function loadData(url = "", contentType = "application/json", data = {}) {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-Type": contentType
        },
    });
    return response.json();
}

function createFilesBtn(wecker) {
    var filesBtn = wecker.getButton("Show Files");
    filesBtn.addEventListener("click", () => {
        loadData("https://clatcher.org/user/files")
        .then(data => {
            path = Object.keys(data);
            data[path].forEach(elem => {
                var row = document.createElement("tr");
                var cell = document.createElement("td");
                var linkBtn = document.createElement("a");
                linkBtn.innerText = elem;
                linkBtn.href = "javascript:void(0);";
                linkBtn.addEventListener("click", () => {
                    if(timeSelect.value == "") {
                        wecker.showInfo("Select a time!");
                    }
                    else {
                        filesplace.innerHTML = "";
                        let timeH3 = document.createElement("h3");
                        let now = new Date();

                        filesplace.append(timeH3);

                        wecker.showInfo("Wecker gestellt auf " + timeSelect.value);

                        let intv = setInterval(() => {
                            let hours = now.getHours();
                            let minutes = now.getMinutes();

                            if(hours < 10) hours = "0" + hours;
                            if(minutes < 10) minutes = "0" + minutes;

                            timeH3.innerText = hours + ":" + minutes;

                            now = new Date();

                            if(timeH3.innerText == timeSelect.value) {
                                timeSelect.value = "";
                                clearInterval(intv);
                                let pos = elem.lastIndexOf(".");
                                let ext = elem.substr(pos+1, elem.length);
                                        
                                filesplace.innerHTML = "";
                                        
                                if(ext == "mp3" || ext == "ogg" || ext == "opus") {
                                    let audio = document.createElement("audio");
                                    audio.id = "audioplayer";
                                    audio.controls = "true";
                                    audio.loop = "true";
                                    audio.autoplay = "true";
                                    let source = document.createElement("source");
                                    source.src = "https://clatcher.org/show/file?file=" + path + "/" + elem;
                                    source.type = "video/ogg";
                                    audio.append(source);
                                    filesplace.append(audio);
                                }
                                else if(ext == "mp4" || ext == "webm") {
                                    let video = document.createElement("video");
                                    video.id = "videoplayer";
                                    video.controls = "true";
                                    video.loop = "true";
                                    video.autoplay = "true";
                                    let source = document.createElement("source");
                                    source.src = "https://clatcher.org/show/file?file=" + path + "/" + elem;
                                    source.type = "video/" + ext;
                                    video.append(source);
                                    filesplace.append(video);
                                }
                                else {
                                    timeH3.innerText = "Wähle eine Video- oder Audiodatei!";
                                }
                                        
                                let stopBtn = document.createElement("a");
                                stopBtn.classList.add("stylish");
                                stopBtn.innerText = "STOP";
                                stopBtn.addEventListener("click", () => {
                                    filesplace.innerHTML = "";
                                });
                                filesplace.append(stopBtn);
                            }

                        }, 100);

                    }
                    
                });
                cell.append(linkBtn);
                row.append(cell);
                table.append(row);
            });
        });
    });

    return filesBtn;
}

function createClearBtn(wecker) {
    var clearBtn = wecker.getButton("Clear");
    clearBtn.addEventListener("click", () => {
        table.innerHTML = "";
    });
    
    return clearBtn;
}