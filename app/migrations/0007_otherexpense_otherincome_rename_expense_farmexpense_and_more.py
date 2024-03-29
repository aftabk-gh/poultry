# Generated by Django 4.1.4 on 2023-03-30 10:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0006_profitandloss"),
    ]

    operations = [
        migrations.CreateModel(
            name="OtherExpense",
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
                ("title", models.CharField(max_length=255)),
                ("value", models.PositiveIntegerField()),
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
        migrations.CreateModel(
            name="OtherIncome",
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
                ("title", models.CharField(max_length=255)),
                ("value", models.PositiveIntegerField()),
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
        migrations.RenameModel(
            old_name="Expense",
            new_name="FarmExpense",
        ),
        migrations.DeleteModel(
            name="ProfitAndLoss",
        ),
    ]
