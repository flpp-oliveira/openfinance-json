from rest_framework import serializers

class DataReceiverSerializer(serializers.Serializer):
    tipoTeste = serializers.CharField(required=True)
    opcaoDetalhe = serializers.CharField(required=True)
    statement1 = serializers.CharField(required=True)
    statement2 = serializers.CharField(required=False, allow_blank=True)
    alias = serializers.CharField(required=True)
    clientIdDirectory = serializers.CharField(required=True)
    wellknown = serializers.CharField(required=True)
    consentApi = serializers.CharField(required=True)
    resourceApi = serializers.CharField(required=True)
    webhook = serializers.BooleanField(required=False)
    client1Certs = serializers.DictField(required=True)
    client2Certs = serializers.DictField(required=False)
