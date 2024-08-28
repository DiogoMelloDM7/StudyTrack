from django.contrib import admin
from .models import CustomUser
from django.utils.translation import gettext_lazy as _ 
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    # Campos a serem exibidos na listagem de usuários no admin
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')

    # Campos a serem exibidos ao visualizar ou editar um usuário
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'date_of_birth', 'profile_picture', 'bio', 'phone_number')}),
        (_('Study Info'), {'fields': ('study_goals', 'current_study_plan', 'preferred_study_subjects')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    # Campos a serem exibidos ao criar um novo usuário
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'first_name', 'last_name')}
        ),
    )

    # Campos que podem ser pesquisados no admin
    search_fields = ('username', 'email', 'first_name', 'last_name')

    # Campo de ordenação padrão
    ordering = ('username',)

# Registra o modelo e a configuração personalizada no admin
admin.site.register(CustomUser, CustomUserAdmin)