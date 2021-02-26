from rest_framework import serializers

from photos.models import Photo


class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        fields = [
            'id',
            'title',
            'image_url',
            'description',
            'link',
            'published',
            'created_on',
            'updated_on',
        ]
