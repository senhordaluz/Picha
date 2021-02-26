# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_auto_20150601_2305'),
    ]

    operations = [
        migrations.RunSQL(
            sql=(
                'ALTER TABLE photos_photo ADD COLUMN published timestamp with time zone',
                'UPDATE photos_photo SET published = created_on',
                'ALTER TABLE photos_photo ALTER COLUMN published SET NOT NULL',
            ),
            reverse_sql='ALTER TABLE photos_photo DROP COLUMN published',
            state_operations=[
                migrations.AddField(
                    model_name='photo',
                    name='published',
                    field=models.DateTimeField(
                        verbose_name='Published on',
                        auto_now=True,
                    ),
                ),
            ],
        ),
    ]
