import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [checklistItems, setChecklistItems] = useState([
    // Seção ÓBITO
    { id: 1, title: "Tipo de Óbito", description: "Definir a categoria do óbito", completed: false, section: "obito" },
    { id: 2, title: "Nome Completo", description: "Nome completo do falecido", completed: false, section: "obito" },
    { id: 3, title: "Data de Nascimento", description: "Data de nascimento do falecido", completed: false, section: "obito" },
    { id: 4, title: "Estado Civil", description: "Estado civil no momento do óbito", completed: false, section: "obito" },
    { id: 5, title: "Filiação", description: "Nome do pai e da mãe", completed: false, section: "obito" },
    { id: 6, title: "Nome do Cônjuge", description: "Nome completo do cônjuge", completed: false, section: "obito" },
    { id: 7, title: "Filhos", description: "Quantidade e nomes dos filhos", completed: false, section: "obito" },
    { id: 8, title: "Data do Falecimento", description: "Data e hora do falecimento", completed: false, section: "obito" },
    { id: 9, title: "Tipo de Local", description: "Local do falecimento com endereço completo", completed: false, section: "obito" },
    { id: 10, title: "Grupo de Óbito", description: "Classificação do grupo do óbito", completed: false, section: "obito" },
    { id: 11, title: "CRM do Médico", description: "CRM e nome do médico responsável", completed: false, section: "obito" },
    { id: 12, title: "Causa da Morte", description: "Causa determinada do falecimento", completed: false, section: "obito" },
    { id: 13, title: "Data do Sepultamento", description: "Data e hora do sepultamento", completed: false, section: "obito" },

    // Seção OS
    { id: 14, title: "CPF/CNPJ", description: "Documento de identificação", completed: false, section: "os" },
    { id: 15, title: "RG", description: "Registro Geral", completed: false, section: "os" },
    { id: 16, title: "E-mail", description: "Endereço de e-mail para contato", completed: false, section: "os" },
    { id: 17, title: "Celular", description: "Número de telefone celular", completed: false, section: "os" },
    { id: 18, title: "Tipo de Serviço", description: "Categoria do serviço solicitado", completed: false, section: "os" },
    { id: 19, title: "Emissão da Nota Fiscal", description: "Dados para emissão da NF", completed: false, section: "os" }
  ]);

  const [activeDocument, setActiveDocument] = useState(null);
  const [expandedObservation, setExpandedObservation] = useState(null);

  // Refs para as seções
  const checklistRef = useRef(null);
  const documentsRef = useRef(null);
  const observationsRef = useRef(null);

  const toggleItem = (id) => {
    setChecklistItems(checklistItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const openDocument = (doc) => {
    setActiveDocument(doc);
  };

  const closeDocument = () => {
    setActiveDocument(null);
  };

  const toggleObservation = (id) => {
    setExpandedObservation(expandedObservation === id ? null : id);
  };

  // FUNÇÃO DE SCROLL
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // OBSERVAÇÕES ESPECÍFICAS
  const importantObservations = [
    {
      id: 1,
      icon: "⚠️",
      title: "Ordem de Serviço com falta de preenchimento",
      shortText: "Registrar o motivo da ausência de dados obrigatórios",
      fullText: `• Identificar qual item do checklist está faltando\n• Descrever detalhadamente o motivo da ausência\n• Registrar se é uma situação temporária ou permanente\n• Informar qual ação será tomada para regularização\n• Documentar no sistema as justificativas apropriadas`,
      priority: "high"
    },
    {
      id: 2,
      icon: "🔍",
      title: "Serviço de Exumação",
      shortText: "Procedimentos específicos para serviços de exumação",
      fullText: `• Classificar a OS como INTERNA no sistema\n• Selecionar categorias específicas de exumação\n• Registrar detalhes do serviço prestado nas observações\n• Incluir data, horário e local da exumação\n• Anexar autorizações e documentos necessários`,
      priority: "high"
    },
    {
      id: 3,
      icon: "📎",
      title: "Documentação e Assinaturas",
      shortText: "Verificar documentação completa e assinaturas obrigatórias",
      fullText: `• Confirmar que todos os documentos estão com assinatura do contratante\n• Verificar legibilidade das assinaturas\n• Em caso de documento faltante, solicitar IMEDIATAMENTE ao setor responsável\n• Validar se documentos anexados estão corretos e com assinatura\n• Garantir que cópias estejam legíveis e nítidas`,
      priority: "high"
    }
  ];

  // DOCUMENTOS OBRIGATÓRIOS
  const interactiveDocuments = [
    {
      id: 1,
      title: "Certidão de Óbito",
      type: "obito",
      icon: "📄",
      status: "obrigatório",
      size: "Documento oficial",
      deadline: "Para início do processo",
      color: "#2F4F4F",
      description: "Documento legal que comprova o óbito. Deve conter assinatura do médico.",
      requirements: "Original ou cópia autenticada com assinatura"
    },
    {
      id: 2,
      title: "Entrevista de Gratuidade",
      type: "obito", 
      icon: "📝",
      status: "obrigatório",
      size: "Formulário social",
      deadline: "Durante contratação",
      color: "#2F4F4F",
      description: "Avaliação socioeconômica para concessão de gratuidade nos serviços.",
      requirements: "Formulário preenchido e assinado"
    },
    {
      id: 3,
      title: "Comprovante de Pagamento",
      type: "os",
      icon: "💳",
      status: "obrigatório",
      size: "Comprovante financeiro",
      deadline: "Pré-requisito", 
      color: "#2F4F4F",
      description: "Comprovação do pagamento dos serviços funerários.",
      requirements: "Comprovante original ou transferência identificada"
    },
    {
      id: 4,
      title: "GTC - Guia de Transporte",
      type: "os",
      icon: "🚚",
      status: "obrigatório",
      size: "Documento oficial",
      deadline: "Antes do transporte",
      color: "#2F4F4F",
      description: "Guia de Transporte de Corpo obrigatória para deslocamento.",
      requirements: "Via original emitida pela autoridade competente"
    },
    {
      id: 5,
      title: "Nota de Contratação",
      type: "os",
      icon: "🧾",
      status: "obrigatório",
      size: "Contrato de serviços",
      deadline: "Pré-serviço",
      color: "#2F4F4F",
      description: "Documento formal de contratação dos serviços acordados.",
      requirements: "Duas vias assinadas pelo contratante"
    }
  ];

  return (
    <div className="app">
      {/* Header com Logo e Menu - ATUALIZADO */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo">
              <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" className="logo-image" />
            </div>
          </div>
          
          <nav className="main-nav">
            <button 
              className="nav-item"
              onClick={() => scrollToSection(checklistRef)}
            >
              📋 Checklist
            </button>
            <button 
              className="nav-item"
              onClick={() => scrollToSection(documentsRef)}
            >
              📑 Documentos
            </button>
            <button 
              className="nav-item"
              onClick={() => scrollToSection(observationsRef)}
            >
              💡 Observações
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        {/* Header Informativo */}
        <section className="info-header">
          <div className="header-content">
            <h1>Checklist - Sistema Doth</h1>
            <p className="subtitle">
             Use esse checklist interativo para garantir que todos os dados e documentos necessários sejam preenchidos corretamente no sistema Doth.
              
            </p>
          </div>
        </section>

        {/* Checklist em Duas Colunas */}
        <section ref={checklistRef} className="checklist-section">
          <div className="container">
            <div className="checklist-columns">
              
              {/* Coluna ÓBITO */}
              <div className="checklist-column obito-section">
                <div className="column-header">
                  <div className="section-icon">⚰️</div>
                  <h3>Dados do Óbito</h3>
                  <p>Informações completas sobre o falecimento</p>
                </div>
                <div className="checklist-items">
                  {checklistItems
                    .filter(item => item.section === "obito")
                    .map(item => (
                      <ChecklistItem 
                        key={item.id}
                        item={item}
                        onToggle={toggleItem}
                      />
                    ))
                  }
                </div>
              </div>

              {/* Coluna OS */}
              <div className="checklist-column os-section">
                <div className="column-header">
                  <div className="section-icon">📄</div>
                  <h3>Dados Administrativos</h3>
                  <p>Informações para ordem de serviço</p>
                </div>
                <div className="checklist-items">
                  {checklistItems
                    .filter(item => item.section === "os")
                    .map(item => (
                      <ChecklistItem 
                        key={item.id}
                        item={item}
                        onToggle={toggleItem}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Observações Expandidas */}
        <section ref={observationsRef} className="observations-section">
          <div className="container">
            <div className="observations-header">
              <h2>💡 Observações Importantes</h2>
              <p>Procedimentos críticos que exigem atenção especial</p>
            </div>
            <div className="observations-grid">
              {importantObservations.map((obs, index) => (
                <div 
                  key={obs.id}
                  className={`observation-card ${obs.priority} ${expandedObservation === obs.id ? 'expanded' : ''}`}
                  onClick={() => toggleObservation(obs.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="obs-header">
                    <div className="obs-icon">{obs.icon}</div>
                    <div className="obs-title-content">
                      <h3>{obs.title}</h3>
                      <p className="obs-short">{obs.shortText}</p>
                    </div>
                    <div className="obs-indicator">
                      <div className={`priority-dot ${obs.priority}`}></div>
                      <div className="expand-icon">
                        {expandedObservation === obs.id ? '▲' : '▼'}
                      </div>
                    </div>
                  </div>
                  
                  {expandedObservation === obs.id && (
                    <div className="obs-content">
                      <div className="obs-full-text">
                        {obs.fullText.split('\n').map((line, i) => (
                          <div key={i} className="obs-line">{line}</div>
                        ))}
                      </div>
                      <div className="obs-actions">
                        <span className="obs-priority-badge">
                          Prioridade {obs.priority === 'high' ? 'Alta' : 'Média'}
                        </span>
                        <button className="obs-action-btn">Entendido</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Documentos */}
        <section ref={documentsRef} className="documents-section">
          <div className="container">
            <div className="documents-header">
              <h2>📑 Documentos Necessários</h2>
              <p className="documents-subtitle">
                Todos os documentos abaixo são obrigatórios para conclusão do processo
              </p>
            </div>

            <div className="documents-grid">
              {interactiveDocuments.map((doc, index) => (
                <DocumentCard 
                  key={doc.id} 
                  doc={doc} 
                  index={index}
                  onOpen={openDocument}
                />
              ))}
            </div>

            <div className="documents-notice">
              <div className="notice-icon">💡</div>
              <div className="notice-content">
                <p>
                  <strong>Importante:</strong> Todos os documentos devem ser anexados com assinatura quando necessário 
                  e estar legíveis para validação.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>✅ Checklist interativo - Marque cada item conforme for preenchendo no sistema</p>
          <div className="footer-info">
                    
          </div>
        </div>
      </footer>

      {/* Modal de Documento */}
      {activeDocument && (
        <div className="document-modal" onClick={closeDocument}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: activeDocument.color }}>
              <h3>{activeDocument.title}</h3>
              <button className="close-button" onClick={closeDocument}>×</button>
            </div>
            <div className="modal-body">
              <div className="document-preview">
                <div className="preview-header">
                  <div className="preview-icon" style={{ color: activeDocument.color }}>
                    {activeDocument.icon}
                  </div>
                  <div className="preview-info">
                    <h4>Documento {activeDocument.type === 'obito' ? 'do Óbito' : 'da OS'}</h4>
                    <span className="status-badge obrigatório">OBRIGATÓRIO</span>
                  </div>
                </div>
                
                <div className="preview-content">
                  <div className="preview-description">
                    <p>{activeDocument.description}</p>
                  </div>
                  
                  <div className="preview-details">
                    <div className="detail-item">
                      <span className="detail-label">📋 Requisitos:</span>
                      <span className="detail-value">{activeDocument.requirements}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">⏰ Prazo:</span>
                      <span className="detail-value">{activeDocument.deadline}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📏 Tipo:</span>
                      <span className="detail-value">{activeDocument.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para cada item do checklist
function ChecklistItem({ item, onToggle }) {
  return (
    <div 
      className={`checklist-item ${item.completed ? 'completed' : ''}`}
      onClick={() => onToggle(item.id)}
    >
      <div className="item-checkbox">
        <div className="checkbox">
          {item.completed && (
            <>
              <div className="check-icon">✓</div>
              <div className="pulse-effect"></div>
            </>
          )}
        </div>
      </div>
      <div className="item-content">
        <h4 className="item-title">{item.title}</h4>
        <p className="item-description">{item.description}</p>
      </div>
      <div className="item-number">
        {item.id.toString().padStart(2, '0')}
      </div>
    </div>
  );
}

// Componente DocumentCard
function DocumentCard({ doc, index, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`document-card ${isHovered ? 'hovered' : ''}`}
      onClick={() => onOpen(doc)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="doc-card-header">
        <div className="doc-icon-container">
          <span className="doc-icon" style={{ color: doc.color }}>
            {doc.icon}
          </span>
        </div>
        
        <div className="doc-main-info">
          <h4 className="doc-title">{doc.title}</h4>
          <div className="doc-meta">
            <span className="doc-type">{doc.type.toUpperCase()}</span>
            <span className="doc-status obrigatório">OBRIGATÓRIO</span>
          </div>
        </div>
      </div>

      <div className="doc-content">
        <p className="doc-description">{doc.description}</p>
      </div>

      <div className="doc-details">
        <div className="detail-item">
          <span className="detail-label">Prazo:</span>
          <span className="detail-value">{doc.deadline}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Requisitos:</span>
          <span className="detail-value">{doc.requirements}</span>
        </div>
      </div>

      <div className="doc-hover-effect"></div>
    </div>
  );
}

export default App;