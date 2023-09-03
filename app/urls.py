from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework import routers
from app.views import (
    LoginView,
    SignUpViewSet,
    FarmViewSet,
    FlockViewSet,
    FarmExpenseViewSet,
    MedicineViewSet,
    FeedViewSet,
    SaleViewSet,
    OtherExpenseViewSet,
    OtherIncomeViewSet,
    ProfitAndLossApiView,
    MeApiView,
    MedicineUsageView,
)

router = routers.DefaultRouter()
router.register(r"farm_expense", FarmExpenseViewSet, basename="farm_expense")
router.register(r"sale", SaleViewSet, basename="sale")
router.register(r"other_income", OtherIncomeViewSet, basename="other_income")
router.register(r"other_expense", OtherExpenseViewSet, basename="other_expense")

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", auth_views.LogoutView.as_view(next_page="/")),
    path("signup/", SignUpViewSet.as_view()),
    path("me/", MeApiView.as_view()),
    path("farms/", FarmViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "farms/<int:pk>/",
        FarmViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}),
    ),
    path(
        "farms/<int:farm_id>/flocks/",
        FlockViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "flocks/<int:pk>/",
        FlockViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}),
    ),
    path(
        "farms/<int:farm_id>/medicines/",
        MedicineViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "medicine/<int:pk>/",
        MedicineViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path(
        "medicine/<int:pk>/move/",
        MedicineViewSet.as_view({"put": "move"}),
    ),
    path(
        "flocks/<int:flock_id>/medicines/",
        MedicineUsageView.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "medicine_usage/<int:pk>/",
        MedicineUsageView.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("flocks/<int:flock_id>/", include(router.urls)),
    path(
        "flocks/<int:flock_id>/profit_and_loss/",
        ProfitAndLossApiView.as_view(),
    ),
    path(
        "farms/<int:farm_id>/feed/",
        FeedViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "feed/<int:pk>/",
        FeedViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}),
    ),
    path(
        "feed/<int:pk>/move/",
        FeedViewSet.as_view({"put": "move"}),
    ),
]
