from django.contrib.auth import authenticate
from django.db import transaction
from rest_framework.serializers import (
    CharField,
    EmailField,
    IntegerField,
    ModelSerializer,
    PrimaryKeyRelatedField,
    Serializer,
    ValidationError,
)

from app.models import (
    Comapny,
    Farm,
    FarmExpense,
    Feed,
    Flock,
    Medicine,
    MedicineUsage,
    OtherExpense,
    OtherIncome,
    Sale,
    User,
)


class LoginSerializer(Serializer):
    email = EmailField()
    password = CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                msg = {"error": "Please enter correct Email/Password."}
                raise ValidationError(msg, code="authorization")
        else:
            msg = {"error": "Must include 'email' and 'password'."}
            raise ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class MeSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "company",
            "is_superuser",
        ]


class CompanySerializer(ModelSerializer):
    class Meta:
        model = Comapny
        fields = "__all__"


class SignUpSerializer(ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "password",
            "company",
        )
        required_fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "company",
        ]

    @transaction.atomic
    def create(self, validated_data):
        company_serializer = CompanySerializer(data=validated_data.pop("company"))
        password = validated_data.pop("password")
        company_serializer.is_valid(raise_exception=True)
        company = company_serializer.save()
        validated_data["company_id"] = company.id
        user = super().create(validated_data)
        user.set_password(password)
        user.username = user.email
        user.save()
        return user


class FarmSerializer(ModelSerializer):
    class Meta:
        model = Farm
        exclude = ["company"]


class FlockSerializer(ModelSerializer):
    class Meta:
        model = Flock
        exclude = ["company", "farm"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["sale_date"] = instance.sale_date
        data["sale_qty"] = instance.sale_qty
        return data


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = FarmExpense
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["total"] = instance.total
        return data


class MedicineSerializer(ModelSerializer):
    class Meta:
        model = Medicine
        exclude = ["company", "farm"]
        read_only_fields = ("moved",)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["total"] = instance.total
        data["amount"] = instance.amount
        data["closing_stock"] = instance.closing_stock
        data["qty_used"] = instance.qty_used
        return data


class MedicineMoveSerializer(Serializer):
    farm = PrimaryKeyRelatedField(queryset=Farm.objects.all())
    quantity = IntegerField()

    def validate(self, attrs):
        medicine = self.context.get("medicine")
        quantity = attrs.get("quantity")

        if Medicine.objects.get(id=medicine.id).closing_stock < quantity:
            msg = {"error": "Please move medicine less then stock."}
            raise ValidationError(msg)

        return attrs


class MedicineUsageSerializer(ModelSerializer):
    class Meta:
        model = MedicineUsage
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["medicine"] = {
            "id": instance.medicine.id,
            "name": instance.medicine.name,
        }
        return data


class FeedSerializer(ModelSerializer):
    class Meta:
        model = Feed
        exclude = ["company", "farm"]
        read_only_fields = ("moved",)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["balance"] = instance.balance
        data["dr"] = instance.dr
        return data


class FeedMoveSerializer(Serializer):
    farm = PrimaryKeyRelatedField(queryset=Farm.objects.all())
    bags = IntegerField()

    def validate(self, attrs):
        feed = self.context.get("feed")
        bags = attrs.get("bags")

        if Feed.objects.get(id=feed.id).bags < bags:
            msg = {"error": "Please move feed less then avaialable."}
            raise ValidationError(msg)

        return attrs


class SaleSerializer(ModelSerializer):
    class Meta:
        model = Sale
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["amount"] = instance.amount
        return data


class OtherIncomeSerializer(ModelSerializer):
    class Meta:
        model = OtherIncome
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["vlaue_percentage"] = instance.vlaue_percentage
        return data


class OtherExpenseSerializer(ModelSerializer):
    class Meta:
        model = OtherExpense
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["vlaue_percentage"] = instance.vlaue_percentage
        return data
