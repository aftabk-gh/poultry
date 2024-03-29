from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as CoreUserAdmin

from app import models


@admin.register(models.User)
class CustomUserAdmin(CoreUserAdmin):
    fieldsets = CoreUserAdmin.fieldsets + (
        (
            "More Info",
            {"fields": ("company",)},
        ),
    )


admin.site.register(models.Comapny)
admin.site.register(models.Farm)
admin.site.register(models.Flock)
admin.site.register(models.FarmExpense)
admin.site.register(models.Medicine)
admin.site.register(models.Feed)
admin.site.register(models.Sale)
admin.site.register(models.OtherExpense)
admin.site.register(models.OtherIncome)
admin.site.register(models.MedicineUsage)
