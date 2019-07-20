from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from chat.views import check

urlpatterns = [
    path('chat/', include('chat.urls')),
    path('admin/', admin.site.urls),
    path('check/', check, name="check"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
