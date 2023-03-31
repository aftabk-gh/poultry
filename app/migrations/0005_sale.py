# Generated by Django 4.1.4 on 2023-03-29 16:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0004_feed"),
    ]

    operations = [
        migrations.CreateModel(
            name="Sale",
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
                ("dealer", models.CharField(blank=True, max_length=255, null=True)),
                ("vehicle_no", models.PositiveIntegerField()),
                ("f_rate", models.PositiveIntegerField()),
                ("weight", models.PositiveIntegerField()),
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
