from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from .forms import CustomUserCreationForm

def homepage(request):
    return render(request, 'homepage.html')


def login(request):
    if request.method == "GET":
        return render(request, 'login.html')
    else:
        usernameOrEmail = request.POST.get("usernameOrEmail")
        password = request.POST.get("password")

        userVerify = authenticate(username=usernameOrEmail, password=password) or authenticate(email=usernameOrEmail, password=password)
        print(usernameOrEmail, password, userVerify)
        if userVerify:
            login_django(request, userVerify)
            return redirect('study_tracks:homepage')
        else:
            return render(request, 'login.html', {"erro": "Ocorreu um erro no login, por favor verifique os dados e tente novamente!"})


def cadastro(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            return redirect('study_tracks:login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'cadastro.html', {'form': form})


