# Generated by Django 4.1.4 on 2023-09-02 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_remove_medicine_usage_medicineusage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feed',
            name='cr',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='moved',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='opening',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='rate',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='recieving',
            field=models.IntegerField(default=0),
        ),
    ]
