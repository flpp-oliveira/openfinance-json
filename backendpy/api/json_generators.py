import os
import base64
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend


def read_file_content(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

class BaseTestBuilder:
    def __init__(self, data):
        self.data = data

    def build_common_fields(self):
        return {
            "statement1": self.data.get("statement1"),
            "alias": self.data.get("alias"),
            "clientIdDirectory": self.data.get("clientIdDirectory"),
            "wellknown": self.data.get("wellknown"),
            "consentApi": self.data.get("consentApi"),
            "resourceApi": self.data.get("resourceApi"),
            "webhook": self.data.get("webhook", False),
            "client1Certs": self.data.get("client1Certs"),
        }

    def build(self):
        raise NotImplementedError("Subclasse deve implementar o método build")


def normalize_cert_fields(cert_data):
    if not isinstance(cert_data, dict):
        return cert_data

    for field in ["sigkey", "enckey", "brseal", "brcacPem", "brcacKey"]:
        if field in cert_data and isinstance(cert_data[field], str):
            cert_data[field] = cert_data[field].replace("\\n", "\n")
    return cert_data

def base64url(n):
    return base64.urlsafe_b64encode(
        n.to_bytes((n.bit_length() + 7) // 8, 'big')
    ).decode().rstrip('=')

def generate_jwk_from_key(pem_key, use, alg, kid):
    key = serialization.load_pem_private_key(
        pem_key.encode(), password=None, backend=default_backend()
    )
    numbers = key.private_numbers()
    pub = numbers.public_numbers
    return {
        "use": use,
        "alg": alg,
        "kid": kid,
        "kty": "RSA",
        "n": base64url(pub.n),
        "e": base64url(pub.e),
        "d": base64url(numbers.d),
        "p": base64url(numbers.p),
        "q": base64url(numbers.q),
        "dp": base64url(numbers.dmp1),
        "dq": base64url(numbers.dmq1),
        "qi": base64url(numbers.iqmp),
    }

class PagamentosTestBuilder(BaseTestBuilder):
    def build(self):
        cert1 = normalize_cert_fields(self.data.get("client1Certs", {}))
        ca_cert_path = os.path.join(os.path.dirname(__file__), "certs", "ca_cert.pem")
        ca_cert_content = read_file_content(ca_cert_path)

        client = {
            "scope": "openid payments",
            "jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("sigkey", ""), "sig", "PS256", cert1.get("sigkeyId")),
                    generate_jwk_from_key(cert1.get("enckey", ""), "enc", "RSA-OAEP", cert1.get("enckeyId"))
                ]
            },
            "org_jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("brseal", ""), "sig", "PS256", cert1.get("brsealId", "org-kid"))
                ]
            }
        }

        mtls = {
            "cert": cert1.get("brcacPem", ""),
            "key": cert1.get("brcacKey", ""),
            "ca": ca_cert_content
        }

        resource = {
            "resourceUrl": self.data.get("resourceApi"),
            "consentUrl": self.data.get("consentApi"),
            "brazilCpf": "06832981945",
            "brazilCnpj": "08916776000168",
            "brazilOrganizationId": "357eb23b-f14d-5323-936d-f5b47dcb0eb6",
            "brazilPaymentConsent": {
                "data": {
                    "loggedUser": {
                        "document": {
                            "identification": "06832981945",
                            "rel": "CPF"
                        }
                    },
                    "businessEntity": {
                        "document": {
                            "identification": "01234567000123",
                            "rel": "CNPJ"
                        }
                    },
                    "creditor": {
                        "personType": "PESSOA_NATURAL",
                        "cpfCnpj": "01234567890",
                        "name": "Joao Silva"
                    },
                    "payment": {
                        "type": "PIX",
                        "date": "2024-01-25",
                        "currency": "BRL",
                        "amount": "1.00",
                        "ibgeTownCode": "5300108",
                        "details": {
                            "localInstrument": "DICT",
                            "proxy": "cliente-a00001@pix.bcb.gov.br",
                            "creditorAccount": {
                                "ispb": "99999004",
                                "issuer": "0001",
                                "number": "12345678",
                                "accountType": "CACC"
                            }
                        }
                    },
                    "debtorAccount": {
                        "ispb": "82639451",
                        "issuer": "0001",
                        "number": "97693154",
                        "accountType": "CACC"
                    }
                }
            },
            "brazilPixPayment": {
                "data": {
                    "localInstrument": "DICT",
                    "payment": {
                        "amount": "1.00",
                        "currency": "BRL"
                    },
                    "creditorAccount": {
                        "ispb": "99999004",
                        "issuer": "0001",
                        "number": "12345678",
                        "accountType": "CACC"
                    },
                    "remittanceInformation": "Pagamento da nota XPTO035-002.",
                    "proxy": "cliente-a00001@pix.bcb.gov.br",
                    "cnpjInitiator": "00000000000191",
                    "ibgeTownCode": "5300108"
                }
            }
        }

        return {
            "alias": self.data.get("alias"),
            "description": self.data.get("alias"),
            "server": {"discoveryUrl": self.data.get("wellknown")},
            "client": client,
            "mtls": mtls,
            "resource": resource,
            "consent": {
                "productType": "business"
            },
            "directory": {
                "client_id": self.data.get("statement1"),
                "discoveryUrl": "https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration",
                "apibase": "https://matls-api.sandbox.directory.openbankingbrasil.org.br/",
                "keystore": "https://keystore.sandbox.directory.openbankingbrasil.org.br/"
            }
        }

class PagamentosAutomaticosTestBuilder(BaseTestBuilder):
    def build(self):
        cert1 = normalize_cert_fields(self.data.get("client1Certs", {}))
        ca_cert_path = os.path.join(os.path.dirname(__file__), "certs", "ca_cert.pem")
        ca_cert_content = read_file_content(ca_cert_path)

        client = {
            "scope": "openid payments",
            "jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("sigkey", ""), "sig", "PS256", cert1.get("sigkeyId")),
                    generate_jwk_from_key(cert1.get("enckey", ""), "enc", "RSA-OAEP", cert1.get("enckeyId"))
                ]
            },
            "org_jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("brseal", ""), "sig", "PS256", cert1.get("brsealId", "org-kid"))
                ]
            }
        }

        mtls = {
            "cert": cert1.get("brcacPem", ""),
            "key": cert1.get("brcacKey", ""),
            "ca": ca_cert_content
        }

        resource = {
            "resourceUrl": self.data.get("resourceApi"),
            "consentUrl": self.data.get("consentApi"),
            "brazilCpf": "06832981945",
            "brazilCnpj": "08916776000168",
            "brazilOrganizationId": "357eb23b-f14d-5323-936d-f5b47dcb0eb6",
            "brazilPaymentConsent": {
                "data": {
                    "loggedUser": {
                        "document": {
                            "identification": "06832981945",
                            "rel": "CPF"
                        }
                    },
                    "businessEntity": {
                        "document": {
                            "identification": "01234567000123",
                            "rel": "CNPJ"
                        }
                    },
                    "creditor": {
                        "personType": "PESSOA_NATURAL",
                        "cpfCnpj": "01234567890",
                        "name": "Joao Silva"
                    },
                    "payment": {
                        "type": "PIX",
                        "date": "2024-01-25",
                        "currency": "BRL",
                        "amount": "1.00",
                        "ibgeTownCode": "5300108",
                        "details": {
                            "localInstrument": "DICT",
                            "proxy": "cliente-a00001@pix.bcb.gov.br",
                            "creditorAccount": {
                                "ispb": "99999004",
                                "issuer": "0001",
                                "number": "12345678",
                                "accountType": "CACC"
                            }
                        }
                    },
                    "debtorAccount": {
                        "ispb": "82639451",
                        "issuer": "0001",
                        "number": "97693154",
                        "accountType": "CACC"
                    }
                }
            },
            "brazilPixPayment": {
                "data": {
                    "localInstrument": "DICT",
                    "payment": {
                        "amount": "1.00",
                        "currency": "BRL"
                    },
                    "creditorAccount": {
                        "ispb": "99999004",
                        "issuer": "0001",
                        "number": "12345678",
                        "accountType": "CACC"
                    },
                    "remittanceInformation": "Pagamento da nota XPTO035-002.",
                    "proxy": "cliente-a00001@pix.bcb.gov.br",
                    "cnpjInitiator": "00000000000191",
                    "ibgeTownCode": "5300108"
                }
            }
        }

        return {
            "alias": self.data.get("alias"),
            "description": self.data.get("alias"),
            "server": {"discoveryUrl": self.data.get("wellknown")},
            "client": client,
            "mtls": mtls,
            "resource": resource,
            "consent": {
                "productType": "business"
            },
            "directory": {
                "client_id": self.data.get("statement1"),
                "discoveryUrl": "https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration",
                "apibase": "https://matls-api.sandbox.directory.openbankingbrasil.org.br/",
                "keystore": "https://keystore.sandbox.directory.openbankingbrasil.org.br/"
            }
        }

class AuthServerTestBuilder(BaseTestBuilder):
    def build(self):
        cert1 = normalize_cert_fields(self.data.get("client1Certs", {}))
        cert2 = normalize_cert_fields(self.data.get("client2Certs", {}))
        ca_cert_path = os.path.join(os.path.dirname(__file__), "certs", "ca_cert.pem")
        ca_cert_content = read_file_content(ca_cert_path)

        resource = {
            "resourceUrl": self.data.get("resourceApi"),
            "consentUrl": self.data.get("consentApi"),
            "brazilCpf": "06832981945",
            "brazilCnpj": "08916776000168",
            "brazilOrganizationId": "357eb23b-f14d-5323-936d-f5b47dcb0eb6",
            "brazilPaymentConsent": {
                "data": {
                    "loggedUser": {
                        "document": {
                            "identification": "06832981945",
                            "rel": "CPF"
                        }
                    },
                    "businessEntity": {
                        "document": {
                            "identification": "01234567000123",
                            "rel": "CNPJ"
                        }
                    },
                    "creditor": {
                        "personType": "PESSOA_NATURAL",
                        "cpfCnpj": "01234567890",
                        "name": "Joao Silva"
                    },
                    "payment": {
                        "type": "PIX",
                        "date": "2024-01-25",
                        "currency": "BRL",
                        "amount": "1.00",
                        "ibgeTownCode": "5300108",
                        "details": {
                            "localInstrument": "DICT",
                            "proxy": "cliente-a00001@pix.bcb.gov.br",
                            "creditorAccount": {
                                "ispb": "99999004",
                                "issuer": "0001",
                                "number": "12345678",
                                "accountType": "CACC"
                            }
                        }
                    },
                    "debtorAccount": {
                        "ispb": "82639451",
                        "issuer": "0001",
                        "number": "97693154",
                        "accountType": "CACC"
                    }
                }
            },
            "brazilPixPayment": {
                "data": {
                    "localInstrument": "DICT",
                    "payment": {
                        "amount": "1.00",
                        "currency": "BRL"
                    },
                    "creditorAccount": {
                        "ispb": "99999004",
                        "issuer": "0001",
                        "number": "12345678",
                        "accountType": "CACC"
                    },
                    "remittanceInformation": "Pagamento da nota XPTO035-002.",
                    "proxy": "cliente-a00001@pix.bcb.gov.br",
                    "cnpjInitiator": "00000000000191",
                    "ibgeTownCode": "5300108"
                }
            }
        }

        client1 = {
            "client_id": self.data.get("statement1"),
            "scope": "openid payments",
            "jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("sigkey", ""), "sig", "PS256", cert1.get("sigkeyId")),
                    generate_jwk_from_key(cert1.get("enckey", ""), "enc", "RSA-OAEP", cert1.get("enckeyId"))
                ]
            },
            "org_jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("brseal", ""), "sig", "PS256", cert1.get("brsealId", "org-kid"))
                ]
            }
        }

        client2 = {
            "client_id": self.data.get("statement2"),
            "scope": "openid payments",
            "jwks": {
                "keys": [
                    generate_jwk_from_key(cert2.get("sigkey", ""), "sig", "PS256", cert2.get("sigkeyId")),
                    generate_jwk_from_key(cert2.get("enckey", ""), "enc", "RSA-OAEP", cert2.get("enckeyId"))
                ]
            },
            "org_jwks": {
                "keys": [
                    generate_jwk_from_key(cert2.get("brseal", ""), "sig", "PS256", cert2.get("brsealId", "org-kid"))
                ]
            }
        }

        mtls1 = {
            "cert": cert1.get("brcacPem", ""),
            "key": cert1.get("brcacKey", ""),
            "ca": ca_cert_content
        }

        mtls2 = {
            "cert": cert2.get("brcacPem", ""),
            "key": cert2.get("brcacKey", ""),
            "ca": ca_cert_content
        }

        return {
            "alias": self.data.get("alias"),
            "description": self.data.get("alias"),
            "server": {"discoveryUrl": self.data.get("wellknown")},
            "client": client1,
            "mtls": mtls1,
            "client2": client2,
            "mtls2": mtls2,
            "resource": resource,
            "consent": {
                "productType": "business"
            },
            "directory": {
                "client_id": self.data.get("statement1"),
                "discoveryUrl": "https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration",
                "apibase": "https://matls-api.sandbox.directory.openbankingbrasil.org.br/",
                "keystore": "https://keystore.sandbox.directory.openbankingbrasil.org.br/"
            }
        }

class DcrTestBuilder(BaseTestBuilder):
    def build(self):
        cert1 = normalize_cert_fields(self.data.get("client1Certs", {}))
        ca_cert_path = os.path.join(os.path.dirname(__file__), "certs", "ca_cert.pem")
        ca_cert_content = read_file_content(ca_cert_path)

        client = {
            "scope": "openid payments",
            "jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("sigkey", ""), "sig", "PS256", cert1.get("sigkeyId")),
                    generate_jwk_from_key(cert1.get("enckey", ""), "enc", "RSA-OAEP", cert1.get("enckeyId"))
                ]
            },
            "org_jwks": {
                "keys": [
                    generate_jwk_from_key(cert1.get("brseal", ""), "sig", "PS256", cert1.get("brsealId", "org-kid"))
                ]
            }
        }

        mtls = {
            "cert": cert1.get("brcacPem", ""),
            "key": cert1.get("brcacKey", ""),
            "ca": ca_cert_content
        }

        resource = {
            "resourceUrl": self.data.get("resourceApi"),
            "consentUrl": self.data.get("consentApi"),
            "brazilCpf": "06832981945",
            "brazilCnpj": "08916776000168",
            "brazilOrganizationId": "357eb23b-f14d-5323-936d-f5b47dcb0eb6",
            "brazilPaymentConsent": {
                "data": {
                    "loggedUser": {
                        "document": {
                            "identification": "06832981945",
                            "rel": "CPF"
                        }
                    },
                    "businessEntity": {
                        "document": {
                            "identification": "01234567000123",
                            "rel": "CNPJ"
                        }
                    },
                    "creditor": {
                        "personType": "PESSOA_NATURAL",
                        "cpfCnpj": "01234567890",
                        "name": "Joao Silva"
                    },
                    "payment": {
                        "type": "PIX",
                        "date": "2024-01-25",
                        "currency": "BRL",
                        "amount": "1.00",
                        "ibgeTownCode": "5300108",
                        "details": {
                            "localInstrument": "DICT",
                            "proxy": "cliente-a00001@pix.bcb.gov.br",
                            "creditorAccount": {
                                "ispb": "99999004",
                                "issuer": "0001",
                                "number": "12345678",
                                "accountType": "CACC"
                            }
                        }
                    },
                    "debtorAccount": {
                        "ispb": "82639451",
                        "issuer": "0001",
                        "number": "97693154",
                        "accountType": "CACC"
                    }
                }
            },
            "brazilPixPayment": {
                "data": {
                    "localInstrument": "DICT",
                    "payment": {
                        "amount": "1.00",
                        "currency": "BRL"
                    },
                    "creditorAccount": {
                        "ispb": "99999004",
                        "issuer": "0001",
                        "number": "12345678",
                        "accountType": "CACC"
                    },
                    "remittanceInformation": "Pagamento da nota XPTO035-002.",
                    "proxy": "cliente-a00001@pix.bcb.gov.br",
                    "cnpjInitiator": "00000000000191",
                    "ibgeTownCode": "5300108"
                }
            }
        }

        return {
            "alias": self.data.get("alias"),
            "description": self.data.get("alias"),
            "server": {"discoveryUrl": self.data.get("wellknown")},
            "client": client,
            "mtls": mtls,
            "resource": resource,
            "consent": {
                "productType": "business"
            },
            "directory": {
                "client_id": self.data.get("statement1"),
                "discoveryUrl": "https://auth.sandbox.directory.openbankingbrasil.org.br/.well-known/openid-configuration",
                "apibase": "https://matls-api.sandbox.directory.openbankingbrasil.org.br/",
                "keystore": "https://keystore.sandbox.directory.openbankingbrasil.org.br/"
            }
        }


def generate_pagamentos(data):
    return PagamentosTestBuilder(data).build()

def generate_pagamentos_automaticos(data):
    return PagamentosAutomaticosTestBuilder(data).build()

def generate_auth_server(data):
    return AuthServerTestBuilder(data).build()

def generate_dcr(data):
    return DcrTestBuilder(data).build()
