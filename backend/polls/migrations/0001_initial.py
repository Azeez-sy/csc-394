# Generated by Django 5.1.6 on 2025-02-11 23:03

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Program",
            fields=[
                ("program_id", models.AutoField(primary_key=True, serialize=False)),
                ("programName", models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("user_id", models.AutoField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=30)),
                ("last_name", models.CharField(max_length=30)),
                ("pronouns", models.CharField(max_length=10)),
                ("role", models.CharField(max_length=30)),
                ("prof_desc", models.CharField(max_length=250)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("username", models.CharField(max_length=10, unique=True)),
                ("_h_pswd", models.CharField(max_length=50)),
                ("isAdmin", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                ("event_id", models.AutoField(primary_key=True, serialize=False)),
                ("date", models.DateField()),
                ("location", models.CharField(max_length=100)),
                (
                    "program_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="polls.program"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Tutor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "tutorId",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="polls.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Note",
            fields=[
                ("noteId", models.AutoField(primary_key=True, serialize=False)),
                ("contentType", models.CharField(max_length=50)),
                ("content", models.TextField()),
                ("authorName", models.CharField(max_length=100)),
                ("event", models.CharField(max_length=100)),
                ("courseName", models.CharField(max_length=100)),
                ("date", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "authorId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="polls_notes",
                        to="polls.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                ("message_id", models.AutoField(primary_key=True, serialize=False)),
                ("content", models.TextField()),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "receiver",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="received_messages",
                        to="polls.user",
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sent_messages",
                        to="polls.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Assignees",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "eventId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="polls.event"
                    ),
                ),
                (
                    "assigneeId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="polls.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Admin",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "adminId",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="polls.user"
                    ),
                ),
            ],
        ),
    ]
