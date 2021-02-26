from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers

from photos.views import PhotoView, PhotoViewSet
from feedback.views import FeedbackView

router = routers.DefaultRouter()
router.register(r'photo', PhotoViewSet)

# photo_list = PhotoViewSet.as_view({
#     'get': 'list',
# })

# photo_detail = PhotoViewSet.as_view({
#     'get': 'retrieve',
# })

urlpatterns = [
    url(r'^$', PhotoView.as_view(), name="home"),
    url(r'^feedback/$', FeedbackView.as_view(), name="feedback"),
    url(r'^admin/', include(admin.site.urls)),
    # url(r'^photo', photo_list, name="photo-list"),
    # url(r'^photo/(?P<pk>\w+)/$', photo_detail, name="photo-detail"),
    url('api/', include(router.urls)),
]
