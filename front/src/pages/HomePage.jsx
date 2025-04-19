import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const HomePage = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: 'Geração de JSON',
      description: 'Gere JSONs padronizados para testes de Open Finance',
      icon: 'fa-solid fa-code'
    },
    {
      title: 'Suporte a Certificados',
      description: 'Gerenciamento de certificados para autenticação segura',
      icon: 'fa-solid fa-certificate'
    },
    {
      title: 'Múltiplos Endpoints',
      description: 'Suporte para diferentes APIs do Open Finance',
      icon: 'fa-solid fa-network-wired'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="w-1/3 flex justify-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-10 h-auto" />
            </Link>
          </div>
          <nav className="w-1/3 flex justify-center space-x-6 text-sm">
            <Link to="/" className="hover:text-purple-600 transition">Home</Link>
            <Link to="/generate" className="hover:text-purple-600 transition">Generate</Link>
            {/* Removi o link Inspect pois não existe essa página ainda */}
            <a href="https://github.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-purple-600 transition">
              Github
            </a>
          </nav>
          <div className="w-1/3" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 transform -skew-y-6"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-8">
              Open Finance JSON Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Simplifique seus testes de integração com nossa ferramenta especializada em gerar JSONs padronizados para o Open Finance Brasil.
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
            >
              Começar Agora
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos Principais
            </h2>
            <p className="text-lg text-gray-600">
              Tudo que você precisa para testar suas integrações com o Open Finance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200"
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
        </div>
      </section>

      {/* API Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500">output.json</div>
                </div>
                <pre className="bg-gray-800 rounded-lg p-4 text-sm">
                  <code className="text-green-400">
                    {`{
  "alias": "example",
  "server": {
    "discoveryUrl": "..."
  },
  "client": {
    "scope": "openid"
  }
  // ...
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
              <span className="text-gray-600">Open Finance JSON Generator</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-book text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;