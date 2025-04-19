import React, { useState, useEffect } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

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

  return (
    <div className="p-8">
      {/* Cabeçalho similar ao App.jsx */}
      <h1 className="text-6xl text-left font-bold text-black px-4 mb-6">
        JSON Generator
      </h1>

      {/* Botões posicionados acima do JSON */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleCopy}
          className={`bg-${copied ? "green" : "purple"}-500 text-white px-3 pr-1 py-1.8 rounded hover:bg-${copied ? "green" : "purple"
            }-600 transition flex items-center gap-2`}
        >
          <i className="fa-solid fa-copy mr-2"></i>
          <span>{copied ? "Copiado" : "Copiar"}</span>
        </button>
        <button
          onClick={handleBack}
          className="bg-purple-500 text-white px-3 pr-1 py-1.8 rounded hover:bg-purple-600 transition flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          <span>Voltar</span>
        </button>
      </div>

      {/* Área de exibição do JSON */}
      <div className="bg-black text-white p-4 rounded-lg shadow-lg overflow-auto">
        {responseData ? (
          <pre className="text-left bg-black text-green-400 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
