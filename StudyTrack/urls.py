from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('calendar_diary.urls')),
    path('', include('community.urls')),
    path('', include('integrations.urls')),
    path('', include('motivation.urls')),
    path('', include('planner.urls')),
    path('', include('quizzes.urls')),
    path('', include('reports.urls')),
    path('', include('study_materials.urls')),
    path('', include('study_tracks.urls')),
    path('', include('tasks.urls')),

]
