from django import forms
from .models import CustomUser

class CustomUserCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    profile_picture = forms.ImageField(required=False)
    date_of_birth = forms.DateField(required=False, widget=forms.TextInput(attrs={'type': 'date'}))
    bio = forms.CharField(required=False, widget=forms.Textarea)
    phone_number = forms.CharField(required=False)
    security_questions = forms.ChoiceField(
        choices=[
            ('question1', 'Pergunta 1'),
            ('question2', 'Pergunta 2'),
            ('question3', 'Pergunta 3'),
            ('question4', 'Pergunta 4'),
            ('question5', 'Pergunta 5')
        ],
        required=True
    )
    response_security = forms.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'profile_picture', 'date_of_birth', 'bio', 'phone_number', 'security_questions', 'response_security']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].help_text = 'Insira um nome de usuário exclusivo. Máximo de 150 caracteres contendo letras, dígitos e @/./+/-/_ apenas.'       

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.pop('password')
        security_question = self.cleaned_data.pop('security_questions')
        response_security = self.cleaned_data.pop('response_security')

        # Armazenar a pergunta e a resposta como um dicionário
        user.security_question_and_answers = {security_question: response_security}

        if commit:
            user.set_password(password)
            user.save()
        return user
