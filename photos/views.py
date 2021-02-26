from django.views.generic.list import ListView
from rest_framework import viewsets

from photos.models import Photo
from feedback.forms import FeedbackForm
from photos.serializers import PhotoSerializer


class PhotoView(ListView):
    model = Photo
    template_name = 'photos/photo_list.html'
    paginate_by = 24

    def get_context_data(self, **kwargs):
        context = super(PhotoView, self).get_context_data(**kwargs)
        context['form'] = FeedbackForm()
        return context


class PhotoViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Photo.objects.all().order_by('-published')
    serializer_class = PhotoSerializer
