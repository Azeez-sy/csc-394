#Purpose:
This internal application is designed to streamline scheduling, note-taking, hour logging, and inter-program communication within the GoSTEM organization. Whether a user is an administrator managing schedules or a tutor keeping track of tutoring sessions, this application provides an intuitive and secure environment to enhance collaboration and efficiency.

#Project Team:
##Frontend
Abubaker Surangiwala
Aamar Khan – Scrum Master
Mya Von Behren
##Backend
Aadil Patel – Web Master
Daniel Allard
Roberto Nieves
Dylan Frohling
Haaris Shakir
Azeez Syed – Software Architect
Cielo Roman – Product Owner

#How to Run:
Clone Final-Build branch
Open in IDE and open terminal
cd into backend_gostem
python3 -m venv venv
Mac: source “venv/bin/activate”	Windows: source “venv/Scripts/activate”
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
Open a new terminal
cd into frontend_gostem
npm run install
npm run start
The localhost will automatically open in your browser

#Languages:
##Frontend 
React.js
Javascript

##Backend
Python
REST API

#Frameworks:
Django


#Libraries & Packages:
CORs Headers
Channels
Admin
Allauth
Daphne
SQLite3
REST Frameworks

#requirements.txt:
asgiref==3.8.1
attrs==25.3.0
autobahn==24.4.2
Automat==24.8.1
cffi==1.17.1
channels==4.2.0
constantly==23.10.4
cryptography==44.0.2
daphne==4.1.2
Django==5.1.7
django-cors-headers==4.7.0
djangorestframework==3.15.2
hyperlink==21.0.0
idna==3.10
incremental==24.7.2
pyasn1==0.6.1
pyasn1_modules==0.4.1
pycparser==2.22
pyOpenSSL==25.0.0
service-identity==24.2.0
setuptools==76.0.0
sqlparse==0.5.3
Twisted==24.11.0
txaio==23.1.1
typing_extensions==4.12.2
zope.interface==7.2

#Any important variables:
Those defined in the settings.py file

#.env:
SECRET_KEY="django-insecure-j-pe4^680&z4fepz1fxp0iculhm@wuzu@dihs%8s0dio^r(!9k"
DEBUG=False  
CLIENT_ID = "863327870751-7r4s2lgmv2pgljdnfpqqcu165bvglk9a.apps.googleusercontent.com"
CLIENT_SECRET="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"
# Set to False in production
