from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response



class MyCustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
               
    def get_current_page_url(self):
        if not self.request:
            return None
        current_page = self.page.number
        request = self.request
        url = request.build_absolute_uri(request.path)
        query_params = request.query_params.copy()
        query_params[self.page_query_param] = current_page

        return f"{url}?{query_params.urlencode()}"

    def get_paginated_response(self, data):
        return Response({
        'page_size': self.page_size,
        'total_objects': self.page.paginator.count,
        'total_objects_in_current_page': len(data),
        'total_pages': self.page.paginator.num_pages,
        'current_page_number': self.page.number,
        'next_page_url': self.get_next_link(),
        'previous_page_url': self.get_previous_link(),
        'current_page_url': self.get_current_page_url(),

        'results': data,
        })