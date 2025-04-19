import React from 'react';

const SendData = ({ data, onSuccess, onError }) => {
  const handleSendData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/receive/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);
      if (onSuccess) onSuccess(result);
    } catch (error) {
      console.error("Erro na requisição:", error);
      if (onError) onError(error);
    }
  };

  return (
    <button 
      onClick={handleSendData} 
      className="bg-purple-500 text-white px-3 pr-1 py-1.8 mt-1 rounded hover:bg-purple-600 transition flex items-center gap-2"
    >
      Generate
      <i className="fa-solid fa-gears mr-2"></i>
    </button>
  );
};

export default SendData;