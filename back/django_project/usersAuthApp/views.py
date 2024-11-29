
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from .myutils.custom_serializers import ProfileSerializer

from .models import Profile
from rest_framework.parsers import MultiPartParser, FormParser




# Create your views here.
AUTH_COOKIE = 'access'  # not used 
AUTH_COOKIE_MAX_AGE = 60 * 60 * 24
AUTH_COOKIE_SECURE =  'True'
AUTH_COOKIE_HTTP_ONLY = True
AUTH_COOKIE_PATH = '/'
AUTH_COOKIE_SAMESITE = 'None'




class ProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # For handling image uploads

    def get(self, request, *args, **kwargs):
        profile , created = Profile.objects.get_or_create(PRF_user= self.request.user)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        profile, created = Profile.objects.get_or_create(PRF_user=self.request.user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






class CustomProviderAuthView(ProviderAuthView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=AUTH_COOKIE_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTP_ONLY,
                samesite=AUTH_COOKIE_SAMESITE,

            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=AUTH_COOKIE_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTP_ONLY,
                samesite=AUTH_COOKIE_SAMESITE,

            )

        return response





class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=AUTH_COOKIE_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTP_ONLY,
                samesite=AUTH_COOKIE_SAMESITE,

            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=AUTH_COOKIE_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTP_ONLY,
                samesite=AUTH_COOKIE_SAMESITE,

            )


        return response













class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=AUTH_COOKIE_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTP_ONLY,
                samesite=AUTH_COOKIE_SAMESITE,

            )

        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response