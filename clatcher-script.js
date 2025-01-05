class Layer {
    constructor(title,icon,width) {
        this.title=title;
        this.icon=icon;
        this.width=width;
    }
    
    setBody(body) {
        this.body=body;
    }

    getButton(text) {
        var btn = document.createElement("button");
        btn.classList.add("stylish");
        btn.innerText = text;
        return btn;
    }

    showInfo(text) {
        var elem = document.getElementById("info");
        if(!elem.classList.contains("show")) {
            elem.style.visibility = "visible";
            elem.innerText = text;
            elem.classList.add("show");
            setTimeout(() => {
                elem.style.visibility = "hidden";
                elem.classList.remove("show");
                elem.innerText = "";
            }, 3000);
        }
    }
    
    dragElement(elem) {
        var pos1=0,pos2=0,pos3=0,pos4=0;
        elem.firstChild.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            elem.style.opacity = "0.5";
            elem.style.zIndex = "100";
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e=e||window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            var elemTop = elem.offsetTop - pos2;
            if(elemTop>0)
                elem.style.top=elemTop+"px";
            var elemLeft = elem.offsetLeft - pos1;
            if(elemLeft>-1)
                elem.style.left = elemLeft + "px";
        }
        function closeDragElement() {
            elem.style.opacity="1.0";
            elem.style.zIndex="0";
            document.onmouseup=null;
            document.onmousemove=null
        }
    }
        
    
    build() { 
        const btnCtrl = document.createElement("input");
        btnCtrl.type="checkbox";
        btnCtrl.classList.add("btnCtrl");
            
        const layer = document.createElement("div");
        layer.id = this.title.replace(/\s/g,"-");
        layer.style.cssText = `
            position: absolute;
            top: 0px;
            left: 300px;
            width: ${this.width}px;
            height: auto !important;
            word-wrap: break-word;
            border-radius: 0.25rem;
            resize: horizontal;
            overflow: auto;
            z-index: 9;
                
            transform: rotateX(90deg);
            transform-origin: 0 0;
            transition: transform 250ms ease-in-out;
        `;
        layer.classList.add("clatcher-darktheme");
        layer.setAttribute("resize","");
            
        const header = document.createElement("div");
        header.id = this.title.replace(/\s/g,"-")+"-header";
            
        const icon = document.createElement("div");
        icon.id = this.title.replace(/\s/g,"-") + "-icon";
        icon.innerHTML = '<i class="' + this.icon + '"></i>';
            
        const title = document.createElement("div");
        title.id = this.title.replace(/\s/g,"-") + "-title";
        title.innerText = this.title;
            
        const minButton = document.createElement("label");
        minButton.classList.add("min-button");
        minButton.innerHTML = '<i class="fas fa-window-minimize"></i>';
        minButton.addEventListener("click", () => { 
            btnCtrl.checked = !btnCtrl.checked;
                
            btnCtrl.checked ? layer.style.transform="rotateX(0deg)" : layer.style.transform="rotateX(90deg)";
        });
            
        header.append(icon);
        header.append(title);
        header.append(minButton);
            
        const body = document.createElement("div");
        body.id = this.title.replace(/\s/g,"-") + "-body";
        body.append(this.body);
            
        layer.append(header);
        layer.append(body);
            
        this.dragElement(layer);
            
        document.querySelector(".page-container").append(btnCtrl);
        document.querySelector(".page-container").append(layer);
            
        const menuButton = document.createElement("label");
        menuButton.innerHTML = '<i class="' + this.icon + ' mr-5"></i> ' + this.title;
        menuButton.addEventListener("click", () => { 
            btnCtrl.checked = !btnCtrl.checked;
                
            btnCtrl.checked ? layer.style.transform = "rotateX(0deg)" : layer.style.transform = "rotateX(90deg)"
        });
            
        document.querySelector(".dropdown-content").append(menuButton);
    }
}