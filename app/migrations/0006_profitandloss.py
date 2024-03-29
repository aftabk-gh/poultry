# Generated by Django 4.1.4 on 2023-03-29 17:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0005_sale"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProfitAndLoss",
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
                ("input_date", models.DateField()),
                ("input_qty", models.PositiveIntegerField()),
                ("other_expenses", models.JSONField(default=list)),
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
