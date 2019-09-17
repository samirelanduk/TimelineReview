# Generated by Django 2.1.4 on 2019-09-17 07:26

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='pdf',
            field=models.FileField(blank=True, max_length=500, null=True, upload_to=core.models.Paper.create_filename),
        ),
    ]