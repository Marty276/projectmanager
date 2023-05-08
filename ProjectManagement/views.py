from django.shortcuts import render, redirect, HttpResponse
from .models import proyectos, tareas

# Create your views here.

def index(request):

    lista = list()
    aux_indice = 0
    for register in proyectos.objects.all():
        
        aux_indice += 1
        
        lista.append({
            "id" : register.id,
            "id_proyecto" : f"proyecto_{register.id}",
            "id_contenido" : f"contenido_{register.id}",
            "indice_proyecto" : aux_indice,
            "title" : register.title,
            "description" : register.description,
            "startdate" : register.startdate,
            "tareas" : list(),
            "create_task_id" : f"create_task_{register.id}",
            "create_task_content_id" : f"create_task_content_{register.id}",
        })
        
        for task in tareas.objects.filter(father_project = register.id):
            
            if (task.done == True):
                done_class_aux = "done"
            elif (task.done == False):
                done_class_aux = "undone"
            
            lista[-1]["tareas"].append({
                "numeric_id" : task.id,
                "id" : f"tarea_{task.id}",
                "task_title_id" : f"task_title_{task.id}",
                "task_description_id" : f"task_description_{task.id}",
                "title" : task.title,
                "description" : task.description,
                "done" : task.done,
                "task_done_button_id" : f"task_done_button_{task.done}_{task.id}",
                "task_edit_button_id" : f"task_edit_button_{task.id}",
                "task_delete_button_id" : f"task_delete_button_{task.id}",
            })
    indices_proyectos = list()
    
    if request.method == "GET":
        return render(request, "project_index.html", {
            "lista" : lista,
        })
        
    elif request.method == "POST":
        if "create_new_project" in request.POST:
        
            proyectos.objects.create(
                title = request.POST["title"],
                description = request.POST["description"],
                startdate = request.POST["startdate"]
            )
            return redirect("/projectmanagement")
        
        elif "delete_project" in request.POST:
            
            proyectos.objects.get(id = request.POST["deleted_project_id"]).delete()
            return HttpResponse(status = 204)
        
        elif "create_new_task" in request.POST:
            
            tareas.objects.create(
                title = request.POST["title"],
                description = request.POST["description"],
                father_project_id = request.POST["father_project_id"]
            )
            return redirect("/projectmanagement")
        
        elif "task_undone_to_done" in request.POST:
            
            done_task = tareas.objects.get(id = request.POST["task_id"].replace("tarea_", ""))
            done_task.done = True
            done_task.save()
            
            print("task_undone_to_done")
            return HttpResponse(status = 204)
        
        elif "task_done_to_undone" in request.POST:
            
            undone_task = tareas.objects.get(id = request.POST["task_id"].replace("tarea_", ""))
            undone_task.done = False
            undone_task.save()
            
            print("task_done_to_undone")
            
            return HttpResponse(status = 204)
        
        elif "edit_task" in request.POST:
            edited_task = tareas.objects.get(id = request.POST["task_id"])
            
            edited_task.title = request.POST["title"]
            edited_task.description = request.POST["description"]
            
            edited_task.save()
            
            return HttpResponse(status = 204)
        
        elif "delete_task" in request.POST:
            tareas.objects.get(id = request.POST["task_id"]).delete()
            return HttpResponse(status = 204)