import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import logo from '../assets/logo-roxo.svg';
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-okaidia.css";

const ResultPage = () => {
  const location = useLocation();
  const [responseData, setResponseData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedResponse = localStorage.getItem("jsonResponse");
    if (storedResponse) {
      try {
        setResponseData(JSON.parse(storedResponse));
      } catch (e) {
        console.error("Erro ao fazer parse do JSON:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (responseData) {
      Prism.highlightAll();
    }
  }, [responseData]);

  const handleBack = () => {
    localStorage.removeItem("jsonResponse");
    window.close();
  };

  const handleCopy = () => {
    if (responseData) {
      navigator.clipboard
        .writeText(JSON.stringify(responseData, null, 2))
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Erro ao copiar:", err));
    }
  };

  // Função para colorir diferentes partes do JSON
  const formatJSON = (json) => {
    if (!json) return "";
  
    return JSON.stringify(json, null, 2)
      // Keys em roxo claro com aspas
      .replace(/"([^"]+)":/g, '<span style="color: #C084FC">"$1"</span>:')
      // Strings em verde limão
      .replace(/: "([^"]*)"/g, ': <span style="color: #4ADE80">"$1"</span>')
      // Números em azul claro
      .replace(/: ([0-9.]+)/g, ': <span style="color: #60A5FA">$1</span>')
      // Booleanos em amarelo vibrante
      .replace(/: (true|false)/g, ': <span style="color: #FACC15">$1</span>')
      // null em rosa suave
      .replace(/: null/g, ': <span style="color: #FB7185">null</span>')
      // Símbolos estruturais: chaves e colchetes
      .replace(/{/g, '<span style="color: #8BE9FD">{</span>')
      .replace(/}/g, '<span style="color: #8BE9FD">}</span>')
      .replace(/\[/g, '<span style="color: #8BE9FD">[</span>')
      .replace(/]/g, '<span style="color: #8BE9FD">]</span>');
  };
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

      <main className="pt-[64px] px-4 pb-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-7xl mx-auto">
          {/* Botões com design moderno */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleCopy}
              className={`${
                copied 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-purple-500 hover:bg-purple-600'
              } text-white px-4 py-2 rounded-md shadow-md transition-all duration-200 flex items-center gap-2 transform hover:translate-y-[-1px]`}
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-lg`}></i>
              <span className="font-medium">{copied ? "Copiado!" : "Copiar JSON"}</span>
            </button>
            <button
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition-all duration-200 flex items-center gap-2 transform hover:translate-y-[-1px]"
            >
              <i className="fa-solid fa-arrow-left text-lg"></i>
              <span className="font-medium">Voltar</span>
            </button>
          </div>

          {/* Card do JSON com design moderno */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700/40 bg-[#23272f]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/60 bg-[#23272f]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono ml-2">JSON Output</span>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(100vh-280px)] bg-[#23272f]" style={{ borderRadius: '0 0 0.75rem 0.75rem' }}>
              {responseData ? (
                <pre className="language-json text-left rounded-lg overflow-auto text-base whitespace-pre font-mono leading-relaxed bg-transparent border-none shadow-none" style={{ margin: 0, padding: '1.5rem', background: 'transparent', color: '#d4d4d4' }}>
                  <code className="language-json">
                    {JSON.stringify(responseData, null, 2)}
                  </code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Footer com informações adicionais */}
        </div>
      </main>

      <footer className="py-4 mt-8 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">
              © 2025 Felippe Silva. All rights reserved.
            </div>
            <div>
              <a 
                href="https://jwkset.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                <i className="fas fa-globe text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultPage;
