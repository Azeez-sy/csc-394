# Generated by Django 5.1.5 on 2025-01-31 03:35

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='admin',
            old_name='tutor',
            new_name='admin',
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to='polls.user')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='polls.user')),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('noteId', models.AutoField(primary_key=True, serialize=False)),
                ('contentType', models.CharField(max_length=50)),
                ('content', models.TextField()),
                ('authorName', models.CharField(max_length=100)),
                ('event', models.CharField(max_length=100)),
                ('courseName', models.CharField(max_length=100)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('authorId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.user')),
            ],
        ),
    ]
