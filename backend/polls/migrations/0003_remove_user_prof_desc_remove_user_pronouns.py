# Generated by Django 5.1.5 on 2025-02-08 22:22

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("polls", "0002_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="prof_desc",
        ),
        migrations.RemoveField(
            model_name="user",
            name="pronouns",
        ),
    ]
