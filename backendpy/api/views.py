from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DataReceiverSerializer
from .json_generators import (
    generate_pagamentos,
    generate_pagamentos_automaticos,
    generate_auth_server
)

class DataReceiver(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DataReceiverSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            print("Dados recebidos:", data)  # Para depuração

            if data.get("tipoTeste") == "funcional":
                opcao = data.get("opcaoDetalhe")
                if opcao == "Pagamentos":
                    test_json = generate_pagamentos(data)
                    return Response(test_json, status=status.HTTP_200_OK)
                elif opcao == "Pagamentos Automaticos":
                    test_json = generate_pagamentos_automaticos(data)
                    return Response(test_json, status=status.HTTP_200_OK)

            if data.get("tipoTeste") == "seguranca":
                opcao = data.get("opcaoDetalhe")
                if opcao == "Authorization Server":
                    test_json = generate_auth_server(data)
                    return Response(test_json, status=status.HTTP_200_OK)
                elif opcao == "DCR":
                    from .json_generators import generate_dcr
                    test_json = generate_dcr(data)
                    return Response(test_json, status=status.HTTP_200_OK)

            return Response({
                "message": "Dados recebidos, mas não há regra definida para esses parâmetros.",
                "data": data
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
