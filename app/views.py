from django.contrib.auth import authenticate, login
from django.db import transaction
from django.middleware import csrf
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    GenericAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from app.mixins import CompanyMixin, FlockMixin
from app.models import (
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
from app.serializers import (
    ExpenseSerializer,
    FarmSerializer,
    FeedMoveSerializer,
    FeedSerializer,
    FlockSerializer,
    LoginSerializer,
    MedicineMoveSerializer,
    MedicineSerializer,
    MedicineUsageSerializer,
    MeSerializer,
    OtherExpenseSerializer,
    OtherIncomeSerializer,
    SaleSerializer,
    SignUpSerializer,
)


class HomeView(TemplateView):
    template_name = "app/index.html"


class LoginView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = data["email"]
        password = data["password"]

        try:
            user = authenticate(email=email, password=password)

            if user is not None:
                login(request, user)
                return Response(
                    {"detail": "User authenticated", "csrf": csrf.get_token(request)}
                )
            else:
                return Response(
                    {"detail": "Wrong email or password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception:
            return Response(
                {"detail": "Something went wrong when logging in"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SignUpViewSet(CreateAPIView):
    serializer_class = SignUpSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


class MeApiView(RetrieveAPIView):
    serializer_class = MeSerializer

    def get_object(self):
        return self.request.user


class FarmViewSet(ModelViewSet, CompanyMixin):
    serializer_class = FarmSerializer
    queryset = Farm.objects.all()


class FlockViewSet(ModelViewSet, CompanyMixin):
    serializer_class = FlockSerializer
    queryset = Flock.objects.all()

    def get_queryset(self):
        if self.action == "list":
            return Flock.objects.filter(farm=self.kwargs.get("farm_id"))
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(
            farm_id=self.kwargs.get("farm_id"), company=self.request.user.company
        )


class FarmExpenseViewSet(ModelViewSet, FlockMixin):
    serializer_class = ExpenseSerializer
    queryset = FarmExpense.objects.all()


class FeedViewSet(ModelViewSet, FlockMixin):
    serializer_class = FeedSerializer
    queryset = Feed.objects.all()
    http_method_names = ["get", "post", "delete", "put"]

    def get_queryset(self):
        if self.action == "list":
            return Feed.objects.filter(farm=self.kwargs.get("farm_id"))
        else:
            return self.queryset

    def get_serializer_class(self):
        if self.action == "move":
            return FeedMoveSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(
            farm_id=self.kwargs.get("farm_id"), company=self.request.user.company
        )

    @transaction.atomic()
    def move(self, request, *args, **kwargs):
        feed = self.get_object()
        ser = FeedMoveSerializer(data=request.data, context={"feed": feed})
        ser.is_valid(raise_exception=True)
        feed.moved = feed.moved + request.data.get("bags")
        feed.bags = feed.bags - request.data.get("bags")
        feed.save()
        # try:
        #     existing_feed = Feed.objects.get(id=feed.id)
        #     existing_feed.bags = existing_feed.bags + request.data.get("bags")
        #     existing_feed.save()
        # except Feed.DoesNotExist:
        #     Feed.objects.create(
        #         date=feed.date,
        #         feed_type=feed.feed_type,
        #         rate=feed.rate,
        #         discount=feed.discount,
        #         cr=feed.cr,
        #         bags=request.data.get("bags"),
        #         comments=f"This feed was recieved from {feed.farm.name}",
        #         farm_id=request.data.get("farm"),
        #         company=request.user.company,
        #     )
        Feed.objects.create(
            date=feed.date,
            feed_type=feed.feed_type,
            rate=feed.rate,
            discount=feed.discount,
            cr=feed.cr,
            bags=request.data.get("bags"),
            comments=f"This feed was recieved from {feed.farm.name}",
            farm_id=request.data.get("farm"),
            company=request.user.company,
        )

        return Response(status=status.HTTP_200_OK)


class SaleViewSet(ModelViewSet, FlockMixin):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()
    http_method_names = ["get", "post", "delete", "put"]

    def get_queryset(self):
        return Sale.objects.filter(flock=self.kwargs.get("flock_id"))


class OtherExpenseViewSet(ModelViewSet, FlockMixin):
    serializer_class = OtherExpenseSerializer
    queryset = OtherExpense.objects.all()
    http_method_names = ["get", "post", "delete", "put"]

    def get_queryset(self):
        return OtherExpense.objects.filter(flock=self.kwargs.get("flock_id"))


class OtherIncomeViewSet(ModelViewSet, FlockMixin):
    serializer_class = OtherIncomeSerializer
    queryset = OtherIncome.objects.all()
    http_method_names = ["get", "post", "delete", "put"]

    def get_queryset(self):
        return OtherIncome.objects.filter(flock=self.kwargs.get("flock_id"))


class ProfitAndLossApiView(APIView):
    def get(self, request, *args, **kwargs):
        flock = Flock.objects.get(id=kwargs.get("flock_id"))
        sales = Sale.objects.filter(flock=flock)
        other_incomes = OtherIncome.objects.filter(flock=flock)
        company_name = self.request.user.company.name
        company_address = self.request.user.company.address
        email = self.request.user.email
        input_date = flock.input_date
        input_quantity = flock.input_quantity
        sale_qty = flock.sale_qty
        total_sale = flock.total_sale
        sale_date = sales.last().date if sales.last() else None
        flock_duration = (sale_date - input_date).days if sale_date else None
        total_sale_percent = (total_sale / total_sale) * 100 if total_sale else 0
        other_inc = 0
        for inc in other_incomes:
            other_inc += inc.value
        total_exp = flock.total_exp
        total_exp_percent = (total_exp / total_sale) * 100 if total_sale else 100

        profit_loss = total_sale + other_inc - total_exp
        profit_loss_percent = (
            total_sale_percent - total_exp_percent
            if total_sale_percent and total_exp_percent
            else -100
        )

        return Response(
            {
                "company_name": company_name,
                "email": email,
                "company_address": company_address,
                "input_date": input_date,
                "input_quantity": input_quantity,
                "sale_date": sale_date,
                "sale_qty": sale_qty,
                "flock_duration": flock_duration,
                "total_sale": total_sale,
                "total_expense": total_exp,
                "total_sale_percent": round(total_sale_percent, 2),
                "total_exp_percent": round(total_exp_percent, 2),
                "profit_loss": profit_loss,
                "profit_loss_percent": round(profit_loss_percent, 2),
            }
        )


class MedicineViewSet(ModelViewSet):
    serializer_class = MedicineSerializer
    queryset = Medicine.objects.all()

    def get_queryset(self):
        if self.action == "list":
            return Medicine.objects.filter(farm=self.kwargs.get("farm_id"))
        else:
            return self.queryset

    def get_serializer_class(self):
        if self.action == "move":
            return MedicineMoveSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(
            farm_id=self.kwargs.get("farm_id"), company=self.request.user.company
        )

    @transaction.atomic()
    def move(self, request, *args, **kwargs):
        medicine = self.get_object()
        ser = MedicineMoveSerializer(data=request.data, context={"medicine": medicine})
        ser.is_valid(raise_exception=True)
        medicine.moved = medicine.moved + request.data.get("quantity")
        medicine.save()
        try:
            existing_medicine = Medicine.objects.get(
                name=medicine.name, farm_id=request.data.get("farm")
            )
            existing_medicine.recieving = (
                existing_medicine.recieving + request.data.get("quantity")
            )
            existing_medicine.save()
        except Medicine.DoesNotExist:
            Medicine.objects.create(
                name=medicine.name,
                packing=medicine.packing,
                rate=medicine.rate,
                recieving=request.data.get("quantity"),
                description=f"This medicine was recieved from {medicine.farm.name}",
                farm_id=request.data.get("farm"),
                company=request.user.company,
            )

        return Response(status=status.HTTP_200_OK)


class MedicineUsageView(ModelViewSet, FlockMixin):
    serializer_class = MedicineUsageSerializer
    queryset = MedicineUsage.objects.all()

    def get_queryset(self):
        if self.action == "list":
            return MedicineUsage.objects.filter(flock=self.kwargs.get("flock_id"))
        else:
            return self.queryset
