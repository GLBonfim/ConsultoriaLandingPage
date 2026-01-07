import React, { useState } from 'react';
import { Calendar, Clock, Check, X, CreditCard, MapPin, ArrowRight, User, Briefcase, Star, Shield } from 'lucide-react';

// Serviços disponíveis
const SERVICOS = {
  atendimento: {
    id: 'atendimento',
    nome: 'Atendimento',
    duracao: 35,
    valorPresencial: 35,
    valorOnline: 31.50,
    descricao: 'Consulta individual focada em sua necessidade específica'
  },
  mentoria: {
    id: 'mentoria',
    nome: 'Mentoria',
    duracao: 60,
    valorPresencial: 75,
    valorOnline: 67.50,
    descricao: 'Sessão completa de orientação e desenvolvimento'
  }
};

// Mock de horários disponíveis por data
const gerarHorariosDisponiveis = (data) => {
  const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  // Simular alguns horários já ocupados
  const ocupados = ['10:00', '15:00'];
  return horarios.map(h => ({
    horario: h,
    disponivel: !ocupados.includes(h)
  }));
};

// Mock de datas disponíveis
const gerarDatasDisponiveis = () => {
  const datas = [];
  const hoje = new Date();
  for (let i = 1; i <= 14; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    datas.push(data);
  }
  return datas;
};

export default function ConsultoriaLanding() {
  const [etapa, setEtapa] = useState('landing'); // landing, servicos, agendamento, pagamento, confirmacao
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [tipoPagamento, setTipoPagamento] = useState(null); // 'online' ou 'presencial'
  const [dadosCliente, setDadosCliente] = useState({ nome: '', email: '', telefone: '' });

  const datas = gerarDatasDisponiveis();
  const horarios = dataSelecionada ? gerarHorariosDisponiveis(dataSelecionada) : [];

  const formatarData = (data) => {
    return data.toLocaleDateString('pt-PT', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const calcularValor = () => {
    if (!servicoSelecionado) return 0;
    const servico = SERVICOS[servicoSelecionado];
    return tipoPagamento === 'online' ? servico.valorOnline : servico.valorPresencial;
  };

  const finalizarAgendamento = () => {
    setEtapa('confirmacao');
  };

  // Landing Page
  if (etapa === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:wght@400;500;600&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Lora', serif;
            color: #2c1810;
          }
          
          .hero-title {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .section-title {
            font-family: 'Playfair Display', serif;
            font-weight: 600;
            color: #92400e;
          }
          
          .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(217, 119, 6, 0.08);
            transition: all 0.3s ease;
          }
          
          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 48px rgba(217, 119, 6, 0.15);
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 18px;
          }
          
          .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 32px rgba(217, 119, 6, 0.3);
          }
          
          .decorative-line {
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #d97706 0%, #b45309 100%);
            border-radius: 2px;
            margin: 16px 0;
          }
          
          .badge {
            background: rgba(217, 119, 6, 0.1);
            color: #92400e;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-in {
            animation: fadeInUp 0.8s ease forwards;
          }
          
          .delay-1 { animation-delay: 0.1s; opacity: 0; }
          .delay-2 { animation-delay: 0.2s; opacity: 0; }
          .delay-3 { animation-delay: 0.3s; opacity: 0; }
          .delay-4 { animation-delay: 0.4s; opacity: 0; }
        `}</style>

        {/* Hero Section */}
        <section className="px-6 py-20 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="badge animate-in">
                <Shield size={16} />
                Atendimento 100% online
              </div>
              <h1 className="hero-title text-5xl md:text-6xl leading-tight animate-in delay-1">
                Orientação clara e segura para suas decisões
              </h1>
              <div className="decorative-line animate-in delay-2"></div>
              <p className="text-xl text-gray-700 leading-relaxed animate-in delay-3">
                Atendimento profissional e humanizado, focado em entender sua necessidade única e oferecer caminhos práticos e seguros.
              </p>
              <button 
                onClick={() => setEtapa('servicos')}
                className="btn-primary animate-in delay-4"
              >
                Agendar atendimento
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="relative animate-in delay-2">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop" 
                alt="Profissional" 
                className="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Star className="text-amber-500" fill="currentColor" size={24} />
                  <div>
                    <div className="font-bold text-2xl text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">+200 atendimentos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section className="px-6 py-20 bg-white/50">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="section-title text-4xl">Sobre o atendimento</h2>
            <div className="decorative-line mx-auto"></div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Com anos de experiência em consultoria e orientação profissional, ofereço um espaço seguro e confidencial para você explorar suas questões, entender suas opções e tomar decisões com mais clareza e confiança.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="card p-8">
                <User className="text-amber-600 mx-auto mb-4" size={40} />
                <h3 className="font-bold text-xl mb-3">Atendimento personalizado</h3>
                <p className="text-gray-600">Cada sessão é única e focada nas suas necessidades específicas</p>
              </div>
              <div className="card p-8">
                <Shield className="text-amber-600 mx-auto mb-4" size={40} />
                <h3 className="font-bold text-xl mb-3">Ambiente seguro</h3>
                <p className="text-gray-600">Confidencialidade total e espaço para se expressar livremente</p>
              </div>
              <div className="card p-8">
                <Briefcase className="text-amber-600 mx-auto mb-4" size={40} />
                <h3 className="font-bold text-xl mb-3">Experiência comprovada</h3>
                <p className="text-gray-600">Anos de prática e centenas de pessoas atendidas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="px-6 py-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-4xl mb-4">Serviços disponíveis</h2>
            <div className="decorative-line mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.values(SERVICOS).map(servico => (
              <div key={servico.id} className="card p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{servico.nome}</h3>
                <p className="text-gray-600 mb-6">{servico.descricao}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="text-amber-600" size={20} />
                    <span>{servico.duracao} minutos</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="text-amber-600" size={20} />
                    <span>€{servico.valorPresencial.toFixed(2)} presencial</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CreditCard className="text-amber-600" size={20} />
                    <span className="font-semibold text-amber-700">€{servico.valorOnline.toFixed(2)} pagamento antecipado</span>
                  </div>
                  <div className="text-sm text-green-700 font-medium bg-green-50 p-2 rounded">
                    Economize 10% pagando online!
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="px-6 py-20 bg-gradient-to-br from-amber-100 to-orange-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title text-4xl mb-4">Como funciona</h2>
              <div className="decorative-line mx-auto"></div>
            </div>
            <div className="space-y-6">
              {[
                { num: 1, title: 'Escolha seu serviço', desc: 'Selecione entre Atendimento (35min) ou Mentoria (1h)' },
                { num: 2, title: 'Agende a data e horário', desc: 'Escolha o melhor dia e horário disponível' },
                { num: 3, title: 'Escolha a forma de pagamento', desc: 'Pague online com 10% de desconto ou presencialmente' },
                { num: 4, title: 'Receba a confirmação', desc: 'Você receberá todos os detalhes por email' }
              ].map(passo => (
                <div key={passo.num} className="flex gap-6 items-start bg-white p-6 rounded-xl shadow-md">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    {passo.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">{passo.title}</h3>
                    <p className="text-gray-600">{passo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button 
                onClick={() => setEtapa('servicos')}
                className="btn-primary"
              >
                Começar agendamento
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white px-6 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">© 2026 Consultoria Profissional • Todos os direitos reservados</p>
            <p className="text-sm text-gray-500 mt-2">Atendimento 100% online e confidencial</p>
          </div>
        </footer>
      </div>
    );
  }

  // Seleção de Serviços
  if (etapa === 'servicos') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setEtapa('landing')}
            className="text-amber-700 hover:text-amber-900 mb-8 flex items-center gap-2"
          >
            ← Voltar
          </button>
          
          <h1 className="section-title text-4xl mb-2">Escolha seu serviço</h1>
          <p className="text-gray-600 mb-8">Selecione o tipo de atendimento que melhor atende suas necessidades</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(SERVICOS).map(servico => (
              <button
                key={servico.id}
                onClick={() => {
                  setServicoSelecionado(servico.id);
                  setEtapa('agendamento');
                }}
                className="card p-8 text-left hover:scale-105 transition-transform cursor-pointer"
              >
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{servico.nome}</h3>
                <p className="text-gray-600 mb-6">{servico.descricao}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="text-amber-600" size={20} />
                    <span>{servico.duracao} minutos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-amber-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 line-through">€{servico.valorPresencial.toFixed(2)}</div>
                      <div className="font-bold text-xl text-amber-700">€{servico.valorOnline.toFixed(2)}</div>
                      <div className="text-xs text-green-600">10% off pagamento online</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-amber-700 font-semibold flex items-center gap-2">
                  Selecionar <ArrowRight size={18} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Agendamento
  if (etapa === 'agendamento') {
    const servico = SERVICOS[servicoSelecionado];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => {
              setEtapa('servicos');
              setDataSelecionada(null);
              setHorarioSelecionado(null);
            }}
            className="text-amber-700 hover:text-amber-900 mb-8 flex items-center gap-2"
          >
            ← Voltar
          </button>
          
          <div className="mb-8">
            <h1 className="section-title text-4xl mb-2">Agendar {servico.nome}</h1>
            <p className="text-gray-600">Duração: {servico.duracao} minutos • Valor: €{servico.valorOnline.toFixed(2)} (online) ou €{servico.valorPresencial.toFixed(2)} (presencial)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Seleção de data */}
            <div className="card p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Calendar className="text-amber-600" size={24} />
                Escolha a data
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {datas.map((data, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDataSelecionada(data);
                      setHorarioSelecionado(null);
                    }}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      dataSelecionada?.toDateString() === data.toDateString()
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-white hover:bg-amber-50'
                    }`}
                  >
                    {formatarData(data)}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de horário */}
            <div className="card p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Clock className="text-amber-600" size={24} />
                Escolha o horário
              </h3>
              {!dataSelecionada ? (
                <p className="text-gray-500">Selecione uma data primeiro</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {horarios.map((h, idx) => (
                    <button
                      key={idx}
                      onClick={() => h.disponivel && setHorarioSelecionado(h.horario)}
                      disabled={!h.disponivel}
                      className={`p-4 rounded-lg font-medium transition-all ${
                        !h.disponivel
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : horarioSelecionado === h.horario
                          ? 'bg-amber-600 text-white shadow-lg'
                          : 'bg-white hover:bg-amber-50'
                      }`}
                    >
                      {h.horario}
                      {!h.disponivel && <div className="text-xs mt-1">Ocupado</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dados do cliente */}
          {dataSelecionada && horarioSelecionado && (
            <div className="card p-6 mt-8">
              <h3 className="font-bold text-xl mb-4">Seus dados</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={dadosCliente.nome}
                  onChange={(e) => setDadosCliente({...dadosCliente, nome: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={dadosCliente.email}
                  onChange={(e) => setDadosCliente({...dadosCliente, email: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={dadosCliente.telefone}
                  onChange={(e) => setDadosCliente({...dadosCliente, telefone: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* Botão continuar */}
          {dataSelecionada && horarioSelecionado && dadosCliente.nome && dadosCliente.email && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setEtapa('pagamento')}
                className="btn-primary"
              >
                Continuar para pagamento
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Seleção de Pagamento
  if (etapa === 'pagamento') {
    const servico = SERVICOS[servicoSelecionado];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setEtapa('agendamento')}
            className="text-amber-700 hover:text-amber-900 mb-8 flex items-center gap-2"
          >
            ← Voltar
          </button>
          
          <h1 className="section-title text-4xl mb-2">Forma de pagamento</h1>
          <p className="text-gray-600 mb-8">Escolha como deseja pagar seu atendimento</p>

          {/* Resumo do agendamento */}
          <div className="card p-6 mb-8 bg-amber-50">
            <h3 className="font-bold text-lg mb-4">Resumo do agendamento</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Serviço:</span>
                <span className="font-semibold">{servico.nome}</span>
              </div>
              <div className="flex justify-between">
                <span>Data:</span>
                <span className="font-semibold">{formatarData(dataSelecionada)}</span>
              </div>
              <div className="flex justify-between">
                <span>Horário:</span>
                <span className="font-semibold">{horarioSelecionado}</span>
              </div>
              <div className="flex justify-between">
                <span>Duração:</span>
                <span className="font-semibold">{servico.duracao} minutos</span>
              </div>
            </div>
          </div>

          {/* Opções de pagamento */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pagamento online */}
            <button
              onClick={() => setTipoPagamento('online')}
              className={`card p-8 text-left transition-all ${
                tipoPagamento === 'online' ? 'ring-4 ring-amber-500 shadow-xl' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <CreditCard className="text-amber-600" size={32} />
                {tipoPagamento === 'online' && (
                  <Check className="text-amber-600" size={24} />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">Pagamento antecipado</h3>
              <p className="text-gray-600 mb-4">Pague agora e economize</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-500 line-through">€{servico.valorPresencial.toFixed(2)}</div>
                <div className="text-3xl font-bold text-amber-700">€{servico.valorOnline.toFixed(2)}</div>
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Economize 10%
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-600">
                ✓ Pagamento seguro<br/>
                ✓ Confirmação imediata<br/>
                ✓ Melhor preço garantido
              </div>
            </button>

            {/* Pagamento presencial */}
            <button
              onClick={() => setTipoPagamento('presencial')}
              className={`card p-8 text-left transition-all ${
                tipoPagamento === 'presencial' ? 'ring-4 ring-amber-500 shadow-xl' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <MapPin className="text-amber-600" size={32} />
                {tipoPagamento === 'presencial' && (
                  <Check className="text-amber-600" size={24} />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">Pagamento presencial</h3>
              <p className="text-gray-600 mb-4">Pague no dia do atendimento</p>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">€{servico.valorPresencial.toFixed(2)}</div>
              </div>
              <div className="mt-6 text-sm text-gray-600">
                ✓ Pague no dia<br/>
                ✓ Dinheiro ou transferência<br/>
                ✓ Sem compromisso antecipado
              </div>
            </button>
          </div>

          {/* Política de cancelamento */}
          {tipoPagamento === 'online' && (
            <div className="card p-6 mt-8 bg-red-50 border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 mb-2">⚠️ Política de cancelamento</h4>
              <p className="text-red-800 text-sm">
                Pagamentos antecipados não são reembolsáveis. Certifique-se da data e horário antes de confirmar.
              </p>
            </div>
          )}

          {/* Botão finalizar */}
          {tipoPagamento && (
            <div className="mt-8 text-center">
              <button 
                onClick={finalizarAgendamento}
                className="btn-primary"
              >
                {tipoPagamento === 'online' ? 'Confirmar pagamento' : 'Confirmar agendamento'}
                <Check size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Confirmação
  if (etapa === 'confirmacao') {
    const servico = SERVICOS[servicoSelecionado];
    const valor = calcularValor();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-8">
            <Check className="text-white" size={48} />
          </div>
          
          <h1 className="section-title text-4xl mb-4">Agendamento confirmado!</h1>
          <p className="text-xl text-gray-600 mb-8">
            {tipoPagamento === 'online' 
              ? 'Seu pagamento foi processado com sucesso' 
              : 'Seu horário foi reservado'}
          </p>

          <div className="card p-8 text-left mb-8">
            <h3 className="font-bold text-xl mb-6 text-center">Detalhes do agendamento</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Cliente:</span>
                <span className="font-semibold">{dadosCliente.nome}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Serviço:</span>
                <span className="font-semibold">{servico.nome}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Data:</span>
                <span className="font-semibold">{formatarData(dataSelecionada)}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Horário:</span>
                <span className="font-semibold">{horarioSelecionado}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Duração:</span>
                <span className="font-semibold">{servico.duracao} minutos</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Valor:</span>
                <span className="font-bold text-xl text-amber-700">€{valor.toFixed(2)}</span>
              </div>
              <div className={`p-4 rounded-lg ${tipoPagamento === 'online' ? 'bg-green-100' : 'bg-amber-100'}`}>
                <div className="font-semibold mb-1">
                  {tipoPagamento === 'online' ? '✓ Pagamento antecipado confirmado' : '⏳ Pagamento presencial pendente'}
                </div>
                <div className="text-sm text-gray-700">
                  {tipoPagamento === 'online' 
                    ? 'Pagamento processado com sucesso' 
                    : 'Pagamento será realizado no dia do atendimento'}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-blue-50 text-left mb-8">
            <h4 className="font-bold mb-3">📧 Próximos passos</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Você receberá um email de confirmação em {dadosCliente.email}</li>
              <li>• Um lembrete será enviado 24h antes do atendimento</li>
              <li>• Em caso de dúvidas, entre em contato conosco</li>
            </ul>
          </div>

          <button 
            onClick={() => {
              setEtapa('landing');
              setServicoSelecionado(null);
              setDataSelecionada(null);
              setHorarioSelecionado(null);
              setTipoPagamento(null);
              setDadosCliente({ nome: '', email: '', telefone: '' });
            }}
            className="btn-primary"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return null;
}