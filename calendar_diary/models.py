from django.db import models
from study_tracks.models import CustomUser

class Event(models.Model):

    title = models.CharField(max_length=75)
    description = models.CharField(max_length=150)
    dateEvent = models.DateTimeField(blank=True)
    localization = models.CharField(max_length=150, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

