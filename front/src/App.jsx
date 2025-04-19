import { useState } from 'react';
import { Link } from 'react-router-dom';
import reactLogo from './assets/logo.svg';
import './App.css';
import 'virtual:windi.css';
import SendData from './services/api'; // Componente responsável por enviar os dados
import ResultPage from "./pages/ResultPage.jsx";


function App() {
  // Estados dos campos do formulário
  const [tipoTeste, setTipoTeste] = useState("");
  const [opcaoDetalhe, setOpcaoDetalhe] = useState("");
  const [statement1, setStatement1] = useState("");
  const [statement2, setStatement2] = useState("");
  const [alias, setAlias] = useState("");
  const [clientIdDirectory, setClientIdDirectory] = useState("");
  const [wellknown, setWellknown] = useState("");
  const [consentApi, setConsentApi] = useState("");
  const [resourceApi, setResourceApi] = useState("");
  const [webhook, setWebhook] = useState(false);

  // Certificados do Cliente 1
  const [client1SigkeyId, setClient1SigkeyId] = useState("");
  const [client1EnckeyId, setClient1EnckeyId] = useState("");
  const [client1BrsealId, setClient1BrsealId] = useState("");
  const [client1BrcacPemId, setClient1BrcacPemId] = useState("");
  const [client1BrcacKeyId, setClient1BrcacKeyId] = useState("");
  const [client1Sigkey, setClient1Sigkey] = useState("");
  const [client1Enckey, setClient1Enckey] = useState("");
  const [client1Brseal, setClient1Brseal] = useState("");
  const [client1BrcacPem, setClient1BrcacPem] = useState("");
  const [client1BrcacKey, setClient1BrcacKey] = useState("");

  // Certificados do Cliente 2 (para "Authorization Server")
  const [client2SigkeyId, setClient2SigkeyId] = useState("");
  const [client2EnckeyId, setClient2EnckeyId] = useState("");
  const [client2BrsealId, setClient2BrsealId] = useState("");
  const [client2BrcacPemId, setClient2BrcacPemId] = useState("");
  const [client2BrcacKeyId, setClient2BrcacKeyId] = useState("");
  const [client2Sigkey, setClient2Sigkey] = useState("");
  const [client2Enckey, setClient2Enckey] = useState("");
  const [client2Brseal, setClient2Brseal] = useState("");
  const [client2BrcacPem, setClient2BrcacPem] = useState("");
  const [client2BrcacKey, setClient2BrcacKey] = useState("");

  // Estado para armazenar a resposta do backend
  const [responseData, setResponseData] = useState(null);

  const opcoesPorTipo = {
    funcional: ["Pagamentos", "Pagamentos Automaticos"],
    seguranca: ["Authorization Server", "DCR"]
  };

  // Dados agregados a enviar
  const aggregatedData = {
    tipoTeste,
    opcaoDetalhe,
    statement1,
    statement2,
    alias,
    clientIdDirectory,
    wellknown,
    consentApi,
    resourceApi,
    webhook,
    client1Certs: {
      sigkey: client1Sigkey,
      sigkeyId: client1SigkeyId,
      enckey: client1Enckey,
      enckeyId: client1EnckeyId,
      brseal: client1Brseal,
      brsealId: client1BrsealId,
      brcacPem: client1BrcacPem,
      brcacPemId: client1BrcacPemId,
      brcacKey: client1BrcacKey,
      brcacKeyId: client1BrcacKeyId,
    },
  };
  if (opcaoDetalhe === "Authorization Server") {
    aggregatedData.client2Certs = {
      sigkey: client2Sigkey,
      sigkeyId: client2SigkeyId,
      enckey: client2Enckey,
      enckeyId: client2EnckeyId,
      brseal: client2Brseal,
      brsealId: client2BrsealId,
      brcacPem: client2BrcacPem,
      brcacPemId: client2BrcacPemId,
      brcacKey: client2BrcacKey,
      brcacKeyId: client2BrcacKeyId,
    };
  }

  // Callbacks para o envio dos dados
  const handleSuccess = (result) => {
    console.log("Sucesso ao enviar dados:", result);
    // Armazena o resultado no localStorage
    localStorage.setItem("jsonResponse", JSON.stringify(result));
    // Abre uma nova aba na rota "/resultado"
    window.open("/resultado", "_blank");
  };

  const handleError = (error) => {
    console.error("Erro ao enviar dados:", error);
  };

  return (
    <>
      {/* Cabeçalho fixo */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="w-1/3 flex justify-start">
            <Link to="/">
              <img src={reactLogo} alt="Logo" className="w-10 h-auto" />
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

      {/* Corpo do site */}
      <main className="pt-[64px] px-0">
        <div className="bg-white border min-h-[855px] border-gray-200 rounded-xl shadow-md px-5 p-6 max-w-5xl mx-auto">
          <p className="text-sm text-left text-purple-600 font-mono uppercase tracking-wide px-4 mb-2.5 mt-7">
            Open source self-host instructions here
          </p>
          <h1 className="text-6xl text-left font-bold text-black px-4 mb-6">JSON Generator</h1>
          <p className="text-left text-gray-500 mb-6 px-4">
            Use PEM encoded ASN.1 DER data for SEC 1, PKCS #1, PKCS #8, PKIX, or certificates to generate a JWK or generate a new key.
          </p>

          {/* Caixa interna com formulário e botão */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg px-5 py-3 p-6 mt-14 shadow-sm">
            <div className="flex items-center justify-between mb-0">
              <p className="text-gray-700 mt-2 font-medium">Generate using PEM</p>
              {/* Botão para envio dos dados */}
              <SendData data={aggregatedData} onSuccess={handleSuccess} onError={handleError} />
            </div>

            <p className="text-gray-700 mb-0 mt-0 font-mono text-left">
              Generate a JWK given a PEM encoded key or certificate.
            </p>
            <p className="text-gray-700 font-mono text-left">
              Do not upload a private key unless this website is self-hosted.
            </p>

            {/* Formulário */}
            <div className="flex gap-4 mt-6">
              {/* Caixa 1 */}
              <div className="flex-1 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col gap-4">
                  {/* Seletor 1 */}
                  <div>
                    <label htmlFor="tipo-teste" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                      Tipo de teste <span className="text-sm text-gray-400 ml-1">(obrigatório)</span>
                    </label>
                    <select
                      id="tipo-teste"
                      value={tipoTeste}
                      onChange={(e) => {
                        setTipoTeste(e.target.value);
                        setOpcaoDetalhe("");
                      }}
                      className="w-full border border-gray-300 bg-white rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-1"
                    >
                      <option value="">Selecione...</option>
                      <option value="funcional">Funcional</option>
                      <option value="seguranca">Segurança</option>
                    </select>
                  </div>
                  <hr className="border-t border-gray-200 my-0.01" />
                  {/* Seletor 2 (dependente) */}
                  <div>
                    <label htmlFor="opcao-detalhe" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                      API de teste <span className="text-sm text-gray-400 ml-1">(obrigatório)</span>
                    </label>
                    <select
                      id="opcao-detalhe"
                      value={opcaoDetalhe}
                      onChange={(e) => setOpcaoDetalhe(e.target.value)}
                      disabled={!tipoTeste}
                      className={`w-full border rounded px-3 py-2 mt-1 ${tipoTeste ? "border-gray-300 text-gray-700 bg-white" : "border-gray-200 bg-gray-100 text-gray-700 cursor-not-allowed"}`}
                    >
                      <option value="">Selecione...</option>
                      {tipoTeste &&
                        opcoesPorTipo[tipoTeste].map((op, idx) => (
                          <option key={idx} value={op}>
                            {op}
                          </option>
                        ))}
                    </select>
                  </div>
                  {["Pagamentos", "Pagamentos Automaticos"].includes(opcaoDetalhe) && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="webhook"
                        checked={webhook}
                        onChange={(e) => setWebhook(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                      />
                      <label htmlFor="webhook" className="text-gray-700">
                        Webhook
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Caixa 2 */}
              <div className="flex-1 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col gap-4">
                  {/* Campo 1 - sempre habilitado */}
                  <div>
                    <label htmlFor="statement1" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                      Software statement ID 1
                    </label>
                    <input
                      type="text"
                      id="statement1"
                      placeholder="Ex: 123e4567-e89b-12d3-a456-426614174000"
                      value={statement1}
                      onChange={(e) => setStatement1(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <hr className="border-t border-gray-200 my-0.01" />
                  {/* Campo 2 - habilitado somente se for Authorization Server */}
                  <div>
                    <label htmlFor="statement2" className="text-gray-900 font-extrabold text-base font-mono font-medium">
                      Software Statement ID 2
                    </label>
                    <input
                      type="text"
                      id="statement2"
                      placeholder="Ex: 123e4567-e89b-12d3-a456-426614174000"
                      value={statement2}
                      onChange={(e) => setStatement2(e.target.value)}
                      disabled={opcaoDetalhe !== "Authorization Server"}
                      className={`w-full rounded px-3 py-2 mt-1 text-gray-700 focus:outline-none ${opcaoDetalhe === "Authorization Server"
                        ? "border border-gray-300 focus:ring-2 focus:ring-purple-500 bg-white"
                        : "border border-gray-200 bg-gray-100 cursor-not-allowed text-gray-400"
                        }`}
                    />
                  </div>
                </div>
              </div>

              {/* Caixa 3 */}
              <div className="flex-1 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col gap-4">
                  {/* Campo Alias */}
                  <div>
                    <label htmlFor="alias" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                      Alias
                    </label>
                    <input
                      type="text"
                      id="alias"
                      placeholder="ex: SensediaOpenCertification"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 bg-white py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <hr className="border-t border-gray-200 my-0.01" />
                  {/* Campo Client ID Directory */}
                  <div>
                    <label htmlFor="clientIdDirectory" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                      Client ID Directory
                    </label>
                    <input
                      type="text"
                      id="clientIdDirectory"
                      placeholder="Ex: 123e4567-e89b-12d3-a456-426614174000"
                      value={clientIdDirectory}
                      onChange={(e) => setClientIdDirectory(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex flex-col gap-4">
                {/* Campo 1 - Well-Known */}
                <div>
                  <label htmlFor="wellknown" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                    Well-Known URL
                  </label>
                  <input
                    type="text"
                    id="wellknown"
                    placeholder="https://cliente.com/.well-known/openid-configuration"
                    value={wellknown}
                    onChange={(e) => setWellknown(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 bg-white py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {/* Campo 2 - API de Consentimento */}
                <div>
                  <label htmlFor="consentApi" className="text-gray-900 font-extrabold text-sm font-mono font-medium">
                    API de Consentimento
                  </label>
                  <input
                    type="text"
                    id="consentApi"
                    placeholder="https://api.cliente.com/consents"
                    value={consentApi}
                    onChange={(e) => setConsentApi(e.target.value)}
                    className="w-full border border-gray-300 rounded bg-white px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {/* Campo 3 - API de Recursos */}
                <div>
                  <label htmlFor="resourceApi" className="text-gray-800 font-extrabold text-sm font-mono font-medium">
                    API de Recursos
                  </label>
                  <input
                    type="text"
                    id="resourceApi"
                    placeholder="https://api.cliente.com/accounts"
                    value={resourceApi}
                    onChange={(e) => setResourceApi(e.target.value)}
                    className="w-full border border-gray-300 rounded bg-white px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            {/* Caixa de certificados - Cliente 1 */}
            <div className="flex flex-col gap-4 mb-6">
              <p className="font-semibold text-gray-700 mt-4 mb-4 border-b border-gray-300 pb-2">
                Certificados do Cliente 1
              </p>
              {/* Linha com 3 campos lado a lado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["sigkey.key", "enckey.key", "brseal.key"].map((label) => (
                  <div key={label} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                    {/* Campo de ID para o certificado */}
                    <label htmlFor={`client1-${label}-id`} className="text-gray-600 text-xs font-mono">
                      ID Certificado
                    </label>
                    <input
                      type="text"
                      id={`client1-${label}-id`}
                      placeholder="ID"
                      value={
                        label === "sigkey.key"
                          ? client1SigkeyId
                          : label === "enckey.key"
                            ? client1EnckeyId
                            : client1BrsealId
                      }
                      onChange={(e) => {
                        if (label === "sigkey.key") setClient1SigkeyId(e.target.value);
                        else if (label === "enckey.key") setClient1EnckeyId(e.target.value);
                        else if (label === "brseal.key") setClient1BrsealId(e.target.value);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                    />
                    <label htmlFor={`client1-${label}`} className="text-gray-800 font-extrabold text-sm font-mono font-medium capitalize">
                      {label}
                    </label>
                    <textarea
                      id={`client1-${label}`}
                      placeholder={`-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBtW2F+MPtPcN+t5YtYcq8dluVBimcJ3cwTT/Hqrls0iHzpPVANAFRGqhvZnOb4rz7bh3bRqSmzRNXT9lRJhg07gIA8n2j87Vg5r2FNwlRfD5eMNN3g+o62HUsB9sBfpMiGvLphgvyg7Mtub7of4eBNphHTBvh3GU+S9TEHvTNP3Ja0aU=\n-----END PUBLIC KEY-----`} rows={12}
                      value={
                        label === "sigkey.key"
                          ? client1Sigkey
                          : label === "enckey.key"
                            ? client1Enckey
                            : client1Brseal
                      }
                      onChange={(e) => {
                        if (label === "sigkey.key") setClient1Sigkey(e.target.value);
                        else if (label === "enckey.key") setClient1Enckey(e.target.value);
                        else if (label === "brseal.key") setClient1Brseal(e.target.value);
                      }}
                      className="w-full border border-gray-300 bg-white rounded px-1 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y overflow-hidden"
                    />
                  </div>
                ))}
              </div>
              {/* Linha com 2 campos abaixo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["brcac.pem", "brcac.key"].map((label) => (
                  <div key={label} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                    {/* Campo de ID para o certificado */}
                    <label htmlFor={`client1-${label}`} className="text-gray-800 font-extrabold text-sm font-mono font-medium capitalize">
                      {label}
                    </label>
                    <textarea
                      id={`client1-${label}`}
                      placeholder={`-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBtW2F+MPtPcN+t5YtYcq8dluVBimcJ3cwTT/Hqrls0iHzpPVANAFRGqhvZnOb4rz7bh3bRqSmzRNXT9lRJhg07gIA8n2j87Vg5r2FNwlRfD5eMNN3g+o62HUsB9sBfpMiGvLphgvyg7Mtub7of4eBNphHTBvh3GU+S9TEHvTNP3Ja0aU=\n-----END PUBLIC KEY-----`} rows={12}
                      value={label === "brcac.pem" ? client1BrcacPem : client1BrcacKey}
                      onChange={(e) => {
                        if (label === "brcac.pem") setClient1BrcacPem(e.target.value);
                        else if (label === "brcac.key") setClient1BrcacKey(e.target.value);
                      }}
                      className="w-full border border-gray-300 bg-white rounded px-1 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y overflow-hidden"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>

            {/* Cliente 2 - visível se opcaoDetalhe for Authorization Server */}
            {opcaoDetalhe === "Authorization Server" && (
              <div className="flex flex-col gap-4">
                <p className="font-semibold text-gray-700 mt-0 mb-4 border-b border-gray-300 pb-2">
                  Certificados do Cliente 2
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["sigkey.key", "enckey.key", "brseal.key"].map((label) => (
                    <div key={label} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                      {/* Campo de ID para o certificado */}
                      <label htmlFor={`client2-${label}-id`} className="text-gray-600 text-xs font-mono">
                      ID Certificado
                      </label>
                      <input
                        type="text"
                        id={`client2-${label}-id`}
                        placeholder="ID"
                        value={
                          label === "sigkey.key"
                            ? client2SigkeyId
                            : label === "enckey.key"
                              ? client2EnckeyId
                              : client2BrsealId
                        }
                        onChange={(e) => {
                          if (label === "sigkey.key") setClient2SigkeyId(e.target.value);
                          else if (label === "enckey.key") setClient2EnckeyId(e.target.value);
                          else if (label === "brseal.key") setClient2BrsealId(e.target.value);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                      />
                      <label htmlFor={`client2-${label}`} className="text-gray-800 font-extrabold text-sm font-mono font-medium capitalize">
                        {label}
                      </label>
                      <textarea
                        id={`client2-${label}`}
                        placeholder={`-----BEGIN PUBLIC KEY-----\n...`}
                        rows={12}
                        value={
                          label === "sigkey.key"
                            ? client2Sigkey
                            : label === "enckey.key"
                              ? client2Enckey
                              : client2Brseal
                        }
                        onChange={(e) => {
                          if (label === "sigkey.key") setClient2Sigkey(e.target.value);
                          else if (label === "enckey.key") setClient2Enckey(e.target.value);
                          else if (label === "brseal.key") setClient2Brseal(e.target.value);
                        }}
                        className="w-full border border-gray-300 bg-white rounded px-1 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y overflow-hidden"
                      ></textarea>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["brcac.pem", "brcac.key"].map((label) => (
                    <div key={label} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label htmlFor={`client2-${label}`} className="text-gray-800 font-extrabold text-sm font-mono font-medium capitalize">
                        {label}
                      </label>
                      <textarea
                        id={`client2-${label}`}
                        placeholder={`-----BEGIN PUBLIC KEY-----\n...`}
                        rows={12}
                        value={label === "brcac.pem" ? client2BrcacPem : client2BrcacKey}
                        onChange={(e) => {
                          if (label === "brcac.pem") setClient2BrcacPem(e.target.value);
                          else if (label === "brcac.key") setClient2BrcacKey(e.target.value);
                        }}
                        className="w-full border border-gray-300 bg-white rounded px-1 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y overflow-hidden"
                      ></textarea>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Bloco para exibir a resposta do backend */}
          {responseData && (
            <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">Resposta do Backend</h2>
              <pre className="text-sm font-mono">{JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
