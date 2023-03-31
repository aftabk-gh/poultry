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
)

router = routers.DefaultRouter()
router.register(r"farm_expense", FarmExpenseViewSet, basename="farm_expense")
router.register(r"medicne", MedicineViewSet, basename="medicne")
router.register(r"feed", FeedViewSet, basename="feed")
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
    path("flocks/<int:flock_id>/", include(router.urls)),
    path(
        "flocks/<int:flock_id>/profit_and_loss/",
        ProfitAndLossApiView.as_view(),
    ),
]
