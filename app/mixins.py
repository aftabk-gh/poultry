from rest_framework.mixins import CreateModelMixin, ListModelMixin


class CompanyMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        return self.queryset.filter(company=self.request.user.company)

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)


class FlockMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        qs = self.queryset.filter(flock_id=self.kwargs.get("flock_id"))
        return qs

    def perform_create(self, serializer):
        serializer.save(
            flock_id=self.kwargs.get("flock_id"), company=self.request.user.company
        )


class FarmMixinMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        qs = self.queryset.filter(farm_id=self.kwargs.get("farm_id"))
        return qs

    def perform_create(self, serializer):
        serializer.save(
            farm_id=self.kwargs.get("farm_id"), company=self.request.user.company
        )
