from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True) 
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)  
    date_of_birth = models.DateField(null=True, blank=True) 
    bio = models.TextField(max_length=500, blank=True)  
    phone_number = models.CharField(max_length=15, blank=True) 
    security_question_and_answers = models.JSONField(default=dict, blank=True)
    study_goals = models.TextField(blank=True)  
    current_study_plan = models.TextField(blank=True)  
    preferred_study_subjects = models.TextField(blank=True)  
    friends_followers = models.IntegerField(default=0)  
    friend_list = models.ManyToManyField('self', related_name='friends', blank=True, symmetrical=False) 
    blocked_users_list = models.ManyToManyField('self', related_name='blocked_users', blank=True, symmetrical=False)

    def __str__(self):
        return self.username
