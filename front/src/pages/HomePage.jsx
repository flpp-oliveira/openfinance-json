import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo-roxo.svg';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const features = [
    {
      title: 'Geração de JSON',
      description: 'Gere JSONs padronizados para testes de Open Finance',
      icon: 'fa-solid fa-code'
    },
    {
      title: 'Sempre Atualizado',
      description: 'Acompanha as mudanças dos testes do Open Finance',
      icon: 'fa-solid fa-certificate'
    },
    {
      title: 'Múltiplos JSONS',
      description: 'Suporte a todos os testes do Open Finance Brasil',
      icon: 'fa-solid fa-network-wired'
    }
  ];

  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="w-1/3 flex justify-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-50 h-auto" />
            </Link>
          </div>
          <nav className="w-1/3 flex justify-center space-x-6 text-sm">
            <Link 
              to="/" 
              className={`transition border-b-2 ${
                location.pathname === '/' 
                  ? 'text-purple-600 border-purple-600' 
                  : 'text-gray-600 border-transparent hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`transition border-b-2 ${
                location.pathname === '/generate' 
                  ? 'text-purple-600 border-purple-600' 
                  : 'text-gray-600 border-transparent hover:text-purple-600'
              }`}
            >
              Generate
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-purple-600 transition border-b-2 border-transparent"
            >
              Github
            </a>
          </nav>
          <div className="w-1/3" />
        </div>
      </header>

      {/* Main content wrapped in form-like container */}
      <main className="pt-[64px] px-4 pb-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-7xl mx-auto">
          <p className="text-sm text-left text-purple-600 font-mono uppercase tracking-wide mb-4">
            bem vindo! =)
          </p>
          
          {/* Hero Section */}
          <section className="relative overflow-hidden mb-16">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-8">
              JSONify Open Finance
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Simplifique a geração de JSONs padronizados para testes funcionais e de segurança no Open Finance Brasil.
              </p>
              <Link
                to="/generate"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                Começar Agora
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <i className={`${feature.icon} text-purple-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* API Support Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Suporte Completo às APIs do Open Finance
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nossa ferramenta suporta a geração de JSONs para as principais APIs do ecossistema Open Finance Brasil:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Pagamentos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Pagamentos Automáticos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Authorization Server
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Dynamic Client Registration
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md bg-gray-50 p-8 rounded-xl shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-500">output.json</div>
                  </div>
                  <pre className="bg-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                    <code className="text-green-400 block text-left whitespace-pre font-mono">
{`{
  "alias": "SensediaOpenCertification",
  "Description": "funcional",
    "server": {
        "discoveryUrl": "https://open-tls.openbanking.sensedia.com.br/of-auth/realms/sensedia-sbx/.well-known/openid-configuration"
    },
  "client": {
    "scope": "openid",
    "clientId": "12345678-1234-1234-1234-123456789012",
    "jwks": {
      "keys": [
        {
          "kty": "EC",
          "kid": "ABC123",
          "use": "sig",
          "crv": "P-256",
          "x": "example-x-value",
          "y": "example-y-value"
        }
      ]
    }
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              © 2025 Felippe Silva. All rights reserved.
            </div>
            <div>
              <a 
                href="https://jwkset.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <i className="fas fa-globe text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;