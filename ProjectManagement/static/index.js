document.addEventListener("click", detect_click);
            
var body = document.getElementById("body");
var clicked;

var create_button = document.getElementById("create_button");
var page_shadow = document.getElementById("page_shadow");

var create_task = document.getElementById("create_task_1");
var create_task_content;
var create_new_task = document.getElementById("create_new_task");

var is_editing_a_task = false;
var task_editing;

var is_a_project_opened = false;
var project_opened;
var project_clicked;
var opened_description;
var clicked_description;

var task_clicked;

function detect_click(e){
    clicked = e.target;
    if(clicked.id.substring(0, 8) == "proyecto"){
        project_clicked = clicked;
        
        id_desc = project_clicked.id.replace("proyecto", "contenido");

        clicked_description = document.getElementById(id_desc);
        
        project_clicked_function();
    }
    
    else if(clicked.id == create_button.id){
        go_to_top();
        setTimeout(create_clicked_function, 300);
    }
    
    else if(clicked.id == "page_shadow"){
        page_shadow.style.display = "none";
        console.log("jhdbkdbn");
        body.style.overflow = "visible";
    }
    
    else if(clicked.id.substring(0, 11) == "create_task"){
        create_task = clicked;
        let create_task_content_id = create_task.id.replace("create_task", "create_task_content");
        console.log(create_task_content_id);
        create_task_content = document.getElementById(create_task_content_id);
        create_task_clicked_function();
    }
    
    else if(clicked.id.substring(0, 14) == "task_done_icon"){
        setTimeout(task_done_icon_function, 200);
    }
    
    else if(clicked.id.substring(0, 16) == "task_undone_icon"){
        setTimeout(task_undone_icon_function, 200);
    }
    
    else if(clicked.id.substring(0, 16) == "edit_task_button"){
        edit_task_button_function();
    }
    
    else if(clicked.id.substring(0, 9) == "save_task"){
        save_task_function();
    }
    
    else if(clicked.id.substring(0, 11) == "delete_task"){
        setTimeout(delete_project_function, 200, ("tarea_" + clicked.id.replace("delete_task_", "")));
    }

    else if(clicked.id.substring(0, 14) == "delete_project"){
        setTimeout(delete_project_function, 200, ("proyecto_" + clicked.id.replace("delete_project_", "")));
    }
    
    else{
        console.log("Elemento desconocido_")
    }
}
function delete_project_function(project_id){
    document.getElementById(project_id).remove();
}

function delete_task_function(task_id){
    document.getElementById(task_id).remove();
}

function save_task_function(){
    document.getElementById("edit_task_" + task_editing).style.display = "none";
    document.getElementById("task_text_" + task_editing).style.display = "inline";

    document.getElementById("task_title_" + task_editing).innerHTML = document.getElementById("title_editing_task_"+task_editing).value;
    document.getElementById("task_description_" + task_editing).innerHTML = document.getElementById("description_editing_task_"+task_editing).value;

    console.log(task_editing);

    setTimeout(clear_edit_task_inputs, 100);
}

function clear_edit_task_inputs(){
    document.getElementById("title_editing_task_"+task_editing).value = "";
    document.getElementById("description_editing_task_"+task_editing).value = "";
}

function edit_task_button_function(){
    if(is_editing_a_task == true){
        if(task_editing == clicked.id.replace("edit_task_button_", "")){
            document.getElementById("edit_task_"+task_editing).style.display = "none";
            document.getElementById("task_text_"+task_editing).style.display = "inline";
            is_editing_a_task = false;
        }else{
            document.getElementById("edit_task_"+task_editing).style.display = "none";
            document.getElementById("task_text_"+task_editing).style.display = "inline";

            is_editing_a_task = true;
            task_editing = clicked.id.replace("edit_task_button_", "");
        
            document.getElementById("edit_task_"+task_editing).style.display = "inline";
            document.getElementById("task_text_"+task_editing).style.display = "none";
        }
    }else{
        is_editing_a_task = true;
        task_editing = clicked.id.replace("edit_task_button_", "");
        
        document.getElementById("edit_task_"+task_editing).style.display = "inline";
        document.getElementById("task_text_"+task_editing).style.display = "none";
    }
}

function task_done_icon_function(){
    clicked.className = "icon_undone";
    clicked.name = "task_undone_to_done";
    clicked.id = "task_undone_icon";
}
function task_undone_icon_function(){
    clicked.className = "icon_done";
    clicked.name = "task_done_to_undone";
    clicked.id = "task_done_icon";
}
function create_task_clicked_function(){

    if (create_task.className == "create_task"){
        create_task.className = "create_task_abierto";
        create_task_content.style.display = "flex";
        console.log(create_task_content);
    }else if(create_task.className == "create_task_abierto"){
        create_task.className = "create_task";
        create_task_content.style.display = "none";
    }
}

function create_clicked_function(){
    body.style.overflow = "hidden";
    page_shadow.style.display = "flex";
}

function go_to_top(){
    var currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(go_to_top);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
    }
}

function project_clicked_function(){
    if(is_a_project_opened == true){
        project_opened.className = "tarjeta";
        opened_description.style.display = "none";
        is_a_project_opened = false;
    }
    if(project_clicked != project_opened){
        project_clicked.className = "tarjeta_abierta";
        clicked_description.style.display = "block";

        project_opened = project_clicked;
        opened_description = clicked_description;
        is_a_project_opened = true;
    }else{
        project_opened = "";
    }
    create_task.className = "create_task";
}
