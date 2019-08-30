# Generated by Django 2.1.4 on 2019-08-30 15:10

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=512)),
                ('date', models.DateField()),
                ('authors', models.CharField(max_length=512)),
                ('pdf', models.FileField(blank=True, null=True, upload_to=core.models.Paper.create_filename)),
            ],
            options={
                'db_table': 'papers',
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('papers', models.ManyToManyField(related_name='tags', to='core.Paper')),
            ],
            options={
                'db_table': 'tags',
                'ordering': ['name'],
            },
        ),
    ]
