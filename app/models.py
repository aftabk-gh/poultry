from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Add any additional fields you want to the user model
    email = models.EmailField(unique=True, db_index=True)

    company = models.ForeignKey("Comapny", on_delete=models.CASCADE, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class Comapny(models.Model):
    name = models.CharField(max_length=255, unique=True)
    key_activity = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Farm(models.Model):
    class Category(models.TextChoices):
        LAYING_BREEDS = "laying_breeds", "Laying Breeds"
        MEAT_PRODUCTION = "meat_production", "Meat Production"
        DUAL_PURPOSE = "dual_purpose", "Dual Purpose"

    name = models.CharField(max_length=255)
    category = models.SlugField(choices=Category.choices)
    manager = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    no_of_employees = models.IntegerField(default=0)
    no_of_sheds = models.IntegerField()
    address = models.CharField(max_length=255)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Flock(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    no = models.IntegerField()
    input_date = models.DateField(null=True, blank=True)
    input_quantity = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.no}-{self.company}"

    @property
    def sale_date(self):
        return (
            Sale.objects.filter(flock=self).last().date
            if Sale.objects.filter(flock=self).last()
            else None
        )

    @property
    def sale_qty(self):
        sale_qty = 0
        for sale in Sale.objects.filter(flock=self):
            sale_qty += sale.weight
        return sale_qty

    @property
    def total_sale(self):
        total_sale = 0
        for sale in Sale.objects.filter(flock=self):
            total_sale += sale.amount
        return total_sale

    @property
    def total_exp(self):
        other_exp = 0
        for exp in OtherExpense.objects.filter(flock=self):
            other_exp = other_exp + exp.value
        total_farm_exp = 0
        for exp in FarmExpense.objects.filter(flock=self):
            total_farm_exp += exp.total
        total_medicine_exp = 0
        for med in MedicineUsage.objects.filter(flock=self):
            total_medicine_exp += med.total
        total_feed_exp = 0
        # for feed in Feed.objects.filter(flock=self):
        #     total_feed_exp += feed.dr
        total_exp = total_farm_exp + total_medicine_exp + total_feed_exp + other_exp
        return total_exp


class FarmExpense(models.Model):
    flock = models.ForeignKey(Flock, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()
    items = models.JSONField(default=list)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.from_date}-{self.company}"

    def clean(self):
        super().clean()
        if not isinstance(self.items, list):
            raise ValidationError("Data must be a list of objects")
        for obj in self.items:
            if not isinstance(obj, dict):
                raise ValidationError("Objects in list must be dictionaries")
            if set(obj.keys()) != {"title", "value"}:
                raise ValidationError(
                    'Objects in list must have only "title" and "value" attributes'
                )
            if not isinstance(int(obj["value"]), int):
                raise ValidationError("Value attribute must be an integer")

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    @property
    def total(self):
        total = 0
        for item in self.items:
            value_str = item["value"].replace(",", "")
            total += int(value_str)
        return total


class Medicine(models.Model):
    name = models.CharField(max_length=255)
    packing = models.CharField(max_length=255)
    opening = models.IntegerField(default=0)
    recieving = models.IntegerField(default=0)
    description = models.TextField(default="")
    moved = models.IntegerField(default=0)
    rate = models.IntegerField(default=0)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.farm.name}"

    @property
    def total(self):
        return self.opening + self.recieving - self.moved

    @property
    def amount(self):
        return self.rate * self.qty_used

    @property
    def closing_stock(self):
        return self.total - self.qty_used

    @property
    def qty_used(self):
        total = 0
        usage = MedicineUsage.objects.filter(medicine=self)
        for item in usage:
            total = total + item.quantity
        return total


class MedicineUsage(models.Model):
    medicine = models.ForeignKey(
        Medicine, on_delete=models.CASCADE, related_name="usage"
    )
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name="used_medicines"
    )
    date = models.DateField()
    quantity = models.IntegerField()
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.medicine}-{str(self.date)}"

    @property
    def total(self):
        return self.quantity * self.medicine.rate


class Feed(models.Model):
    date = models.DateField()
    feed_type = models.CharField(max_length=255)
    bags = models.PositiveIntegerField()
    rate = models.PositiveIntegerField()
    moved = models.IntegerField(default=0)
    discount = models.FloatField()
    cr = models.PositiveIntegerField(default=0)
    comments = models.TextField(null=True, blank=True)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.feed_type} - {self.farm.name}"

    @property
    def dr(self):
        total = self.rate * self.bags
        if self.discount:
            discount = (self.discount / 100) * total
            return int(total - discount)
        return total

    @property
    def balance(self):
        return self.dr - self.cr


class Sale(models.Model):
    date = models.DateField()
    dealer = models.CharField(max_length=255, null=True, blank=True)
    vehicle_no = models.PositiveIntegerField()
    # a_rate = models.CharField(max_length=255)
    # a_rate = models.CharField(max_length=255)
    f_rate = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    flock = models.ForeignKey(Flock, on_delete=models.CASCADE)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.date)

    @property
    def amount(self):
        return self.f_rate * self.weight


class OtherExpense(models.Model):
    title = models.CharField(max_length=255)
    value = models.PositiveIntegerField()
    flock = models.ForeignKey(Flock, on_delete=models.CASCADE)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    @property
    def vlaue_percentage(self):
        percentage = (self.value / Flock.objects.get(id=self.flock.id).total_exp) * 100
        return round(percentage, 2)


class OtherIncome(models.Model):
    title = models.CharField(max_length=255)
    value = models.PositiveIntegerField()
    flock = models.ForeignKey(Flock, on_delete=models.CASCADE)
    company = models.ForeignKey(Comapny, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    @property
    def vlaue_percentage(self):
        percentage = (self.value / Flock.objects.get(id=self.flock.id).total_exp) * 100
        return round(percentage, 2)
