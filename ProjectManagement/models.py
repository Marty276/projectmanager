from django.db import models

# Create your models here.

class proyectos(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    startdate = models.DateField()

class tareas(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    done = models.BooleanField(default=False)
    father_project = models.ForeignKey(proyectos, on_delete=models.CASCADE)