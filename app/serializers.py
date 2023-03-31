from django.db import transaction
from django.contrib.auth import authenticate
from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    EmailField,
    CharField,
    ValidationError,
)
from app.models import (
    Farm,
    Flock,
    FarmExpense,
    Medicine,
    Feed,
    Sale,
    OtherIncome,
    OtherExpense,
    Comapny,
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
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["total"] = instance.total
        data["amount"] = instance.amount
        data["closing_stock"] = instance.closing_stock
        data["qty_used"] = instance.qty_used
        return data


class FeedSerializer(ModelSerializer):
    class Meta:
        model = Feed
        exclude = ["company", "flock"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["balance"] = instance.balance
        data["dr"] = instance.dr
        return data


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
