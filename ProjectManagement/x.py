from .models import proyectos, tareas

pry1 = proyectos(title = "Proyecto prueba", description = "Esto es una prueba para guardar un registro en un modelo de sqlite creado en Python", startdate = (1945, 8, 1))

pry1.save()