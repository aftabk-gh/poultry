# Generated by Django 4.1.4 on 2023-03-29 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_alter_medicine_opening_alter_medicine_rate_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Feed",
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
                ("date", models.DateField()),
                ("feed_type", models.CharField(max_length=255)),
                ("bags", models.PositiveIntegerField()),
                ("rate", models.PositiveIntegerField()),
                ("discount", models.FloatField()),
                ("cr", models.PositiveIntegerField(blank=True, null=True)),
                ("comments", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.comapny"
                    ),
                ),
                (
                    "flock",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.flock"
                    ),
                ),
            ],
        ),
    ]
