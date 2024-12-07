from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Client
from .serializers import ClientSerializer

class ClientAPIView(APIView):
    def get(self, request, client_id=None):
        if client_id:
            client = Client.objects.get(pk=client_id)
            serializer = ClientSerializer(client)
            return Response(serializer.data)
        
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, client_id): 
        client = Client.objects.get(pk=client_id)
        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, client_id):
        client = Client.objects.get(pk=client_id)
        client.delete()
        return Response('Deleted Successfully', status=status.HTTP_204_NO_CONTENT)