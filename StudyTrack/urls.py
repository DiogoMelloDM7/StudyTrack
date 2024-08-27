from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('calendar_diary.urls', namespace="calendar_diary")),
    path('', include('community.urls', namespace="community")),
    path('', include('integrations.urls', namespace="integrations")),
    path('', include('motivation.urls', namespace="motivation")),
    path('', include('planner.urls', namespace="planner")),
    path('', include('quizzes.urls', namespace="quizzes")),
    path('', include('reports.urls', namespace="reports")),
    path('', include('study_materials.urls', namespace="study_materials")),
    path('', include('study_tracks.urls', namespace="study_tracks")),
    path('', include('tasks.urls', namespace="tasks")),

]
