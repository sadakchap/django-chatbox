from django.urls import re_path

app_name = 'chat'

from .views import index, room

urlpatterns = [
    re_path(r'^$', index, name='index'),
    re_path(r'^(?P<room_name>[^/]+)/$', room, name='room'),
]