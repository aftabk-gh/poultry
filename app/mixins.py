from rest_framework.mixins import CreateModelMixin, ListModelMixin


class CompanyMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        return self.queryset.filter(company=self.request.user.company)

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)


class FlockMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        qs = self.queryset.filter(flock_id=self.kwargs.get("flock_id"))
        import pdb

        pdb.set_trace()
        return qs

    def perform_create(self, serializer):
        serializer.save(
            flock_id=self.kwargs.get("flock_id"), company=self.request.user.company
        )
