# Generated by Django 4.1.4 on 2023-05-02 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_remove_flock_sale_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='usage',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]