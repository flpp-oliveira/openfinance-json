import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import logo from '../assets/logo.svg';

const ResultPage = () => {
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
      .replace(/"([^"]+)":/g, '<span style="color: #FF79C6">$1</span>:') // Chaves em rosa
      .replace(/: "([^"]+)"/g, ': <span style="color: #50FA7B">$1</span>') // Strings em verde
      .replace(/: ([0-9]+)/g, ': <span style="color: #BD93F9">$1</span>') // Números em roxo
      .replace(/: (true|false)/g, ': <span style="color: #FFB86C">$1</span>') // Booleanos em laranja
      .replace(/: (null)/g, ': <span style="color: #FF5555">$1</span>'); // Null em vermelho
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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

      <main className="pt-[64px]">
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
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-[#282A36] p-1">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono ml-2">JSON Output</span>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(100vh-280px)]">
              {responseData ? (
                <pre 
                  className="text-left rounded overflow-auto text-sm whitespace-pre font-mono"
                  style={{ backgroundColor: '#282A36' }}
                  dangerouslySetInnerHTML={{ __html: formatJSON(responseData) }}
                />
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer com informações adicionais */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Copie o JSON gerado ou volte para gerar um novo</p>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
