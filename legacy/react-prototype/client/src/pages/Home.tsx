import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, Users, Target, ArrowRight, Award, ShieldCheck, BarChart3, AlertCircle, Zap, LineChart, Layers, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.2 }
};

import { useState } from "react";

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      // Usando um endpoint de teste do Formspree
      const response = await fetch('https://formspree.io/f/xzzpqvqj', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-primary tracking-wider cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>ROYAL SKIN</div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('problema')} className="hover:text-primary transition-colors">O Problema</button>
            <button onClick={() => scrollToSection('solucao')} className="hover:text-primary transition-colors">A Solução</button>
            <button onClick={() => scrollToSection('servicos')} className="hover:text-primary transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('resultados')} className="hover:text-primary transition-colors">Resultados</button>
            <button onClick={() => scrollToSection('investimento')} className="hover:text-primary transition-colors">Investimento</button>
          </div>
          <Button onClick={() => scrollToSection('contato')} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8">
            Falar com Especialista
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <motion.div 
          className="container mx-auto max-w-5xl text-center relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 border border-primary/30 rounded-full px-4 py-1.5 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Agência Especializada em Saúde</span>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Estratégia de Crescimento e <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Alta Performance</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Transformamos clínicas estéticas, dermatológicas e odontológicas em negócios previsíveis, escaláveis e altamente lucrativos.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button onClick={() => scrollToSection('contato')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 h-14 text-lg w-full sm:w-auto group">
              Receber Proposta <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={() => scrollToSection('solucao')} size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-none px-10 h-14 text-lg w-full sm:w-auto">
              Conhecer Metodologia
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* O Problema */}
      <section id="problema" className="py-24 bg-card/50 border-y border-border/50 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">O Ciclo Quebrado</h2>
            <p className="text-xl text-muted-foreground">Por que a maioria das clínicas não cresce</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A realidade enfrentada pelas clínicas hoje é clara: investe-se muito em marketing sem previsibilidade ou retorno consistente. O problema não está na qualidade técnica, mas no modelo de aquisição que permanece desatualizado.
              </p>
              <ul className="space-y-4">
                {[
                  "Investimentos em marketing sem visibilidade de ROI",
                  "Fluxo irregular de leads com conversão imprevisível",
                  "Dependência exclusiva de indicações e boca a boca",
                  "Ausência de processos comerciais estruturados",
                  "Faturamento mensal incerto e sem planejamento"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="relative p-8 border border-border/50 bg-background"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-destructive/10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-destructive">O Custo da Inércia</h3>
              <p className="text-muted-foreground italic border-l-2 border-destructive pl-4">
                "Se sairmos desta reunião sem tomar uma decisão, daqui a três meses você provavelmente estará no mesmo lugar — sem previsibilidade, sem escala, sem controle."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* A Solução */}
      <section id="solucao" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">A Solução: Sistema Integrado</h2>
            <p className="text-xl text-muted-foreground">Uma máquina de crescimento previsível, mensurável e escalável.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { icon: Zap, title: "Aquisição", desc: "Tráfego pago estratégico e qualificado para atrair o paciente ideal." },
              { icon: Target, title: "Conversão", desc: "Funil de vendas e processos comerciais estruturados para fechar mais tratamentos." },
              { icon: Users, title: "Retenção", desc: "Estratégia de fidelização para aumentar o Lifetime Value (LTV) de cada paciente." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="p-8 border border-primary/20 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
                variants={fadeIn}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
                <item.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sobre Nós / +230 Clínicas */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Experiência Comprovada no Mercado de Saúde</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A Royal Skin Agency possui ampla experiência no mercado da saúde, com atuação especializada em nichos de alta performance. Nosso objetivo é posicionar cada clínica como referência em sua região.
              </p>
              <div className="space-y-4">
                {[
                  "Estratégias de marketing digital orientadas por dados",
                  "Gestão de indicadores comerciais e performance",
                  "Estruturação de processos de atendimento e conversão",
                  "Planejamento de crescimento sustentável e escalável"
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl -z-10"></div>
              <div className="bg-background border border-border p-12 text-center relative z-10">
                <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                <div className="text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 mb-4">+230</div>
                <div className="text-xl tracking-widest uppercase text-muted-foreground">Clínicas Atendidas</div>
                <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">Odontologia</div>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <div className="text-sm font-medium text-foreground">Dermatologia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">Estética</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Escopo do Trabalho</h2>
            <p className="text-xl text-muted-foreground">Nenhuma fragmentação, apenas crescimento integrado.</p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { icon: TrendingUp, title: "Tráfego Pago", desc: "Gestão profissional de campanhas no Google Ads e Meta Ads focada em conversão e ROI positivo." },
              { icon: Users, title: "Social Media", desc: "Estratégia de conteúdo para posicionamento de autoridade e engajamento com pacientes qualificados." },
              { icon: Target, title: "Funil de Vendas", desc: "Estruturação da jornada do paciente, desde o primeiro clique até o agendamento e fidelização." },
              { icon: BarChart3, title: "Gestão de Crescimento", desc: "Acompanhamento contínuo de KPIs, otimização de processos e consultoria estratégica." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                className="group p-8 border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300"
                variants={fadeIn}
              >
                <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resultados Comprovados */}
      <section id="resultados" className="py-24 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Resultados Comprovados</h2>
            <p className="text-xl text-muted-foreground">Transformação real em 90 dias de implementação.</p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { title: "Agenda Cheia", desc: "Fluxo consistente de pacientes qualificados" },
              { title: "Faturamento", desc: "Receita mensal calculável e escalável" },
              { title: "Autoridade", desc: "Posicionamento como referência no mercado" },
              { title: "Eficiência", desc: "Redução de custos e aumento de margem" }
            ].map((res, i) => (
              <motion.div 
                key={i} 
                className="p-6 bg-background border border-border/50 text-center"
                variants={fadeIn}
              >
                <LineChart className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-foreground">{res.title}</h4>
                <p className="text-sm text-muted-foreground">{res.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modelos de Crescimento */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Modelos Escaláveis</h2>
            <p className="text-xl text-muted-foreground">Crescimento alinhado com o estágio da sua clínica.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { phase: "Fase 1", title: "Captação", desc: "Construção da base de pacientes" },
              { phase: "Fase 2", title: "Escala", desc: "Aceleração do crescimento" },
              { phase: "Fase 3", title: "Consolidação", desc: "Otimização e eficiência" },
              { phase: "Fase 4", title: "Expansão", desc: "Novos serviços e mercados" }
            ].map((model, i) => (
              <motion.div 
                key={i} 
                className="p-6 border border-border/50 bg-card/20 relative"
                variants={fadeIn}
              >
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{model.phase}</div>
                <h4 className="text-xl font-serif font-bold mb-2">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.desc}</p>
                {i < 3 && <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-border bg-background rounded-full w-6 h-6 z-10" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investimento */}
      <section id="investimento" className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Investimento</h2>
            <p className="text-xl text-muted-foreground">A Solução Completa para o Seu Crescimento</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Mercado */}
            <motion.div 
              className="p-8 border border-border/50 opacity-70"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <h3 className="text-xl font-medium text-muted-foreground mb-6 uppercase tracking-wider text-center">Custo de Mercado</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Tráfego Pago</span><span>R$ 3.000</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Social Media</span><span>R$ 2.000</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Consultoria</span><span>R$ 4.000</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Funil de Vendas</span><span>R$ 3.000</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Gestão</span><span>R$ 5.000</span></div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Total Mensal Estimado</div>
                <div className="text-3xl font-serif text-foreground/50 line-through">R$ 17.000+</div>
              </div>
            </motion.div>

            {/* Royal Skin */}
            <motion.div 
              className="p-10 border-2 border-primary bg-background relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold tracking-widest uppercase">
                Oferta Exclusiva
              </div>
              <h3 className="text-2xl font-serif font-bold text-center mb-2 text-primary">Investimento Royal Skin</h3>
              <p className="text-center text-muted-foreground mb-8 text-sm">Pacote completo de aceleração</p>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-serif font-bold text-foreground mb-2">
                  R$ 3k <span className="text-2xl text-muted-foreground font-sans font-light">a</span> R$ 6k
                </div>
                <div className="text-sm text-muted-foreground">/ mês *</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-primary" /><span>Gestão Completa de Tráfego</span></div>
                <div className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-primary" /><span>Estratégia de Social Media</span></div>
                <div className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-primary" /><span>Consultoria Comercial</span></div>
                <div className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-primary" /><span>Relatórios de Performance</span></div>
              </div>

              <Button onClick={() => scrollToSection('contato')} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-lg">
                Solicitar Proposta Personalizada
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4 italic">* Investimento ajustável conforme o porte da clínica.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA / Próximos Passos */}
      <section id="contato" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
          >
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">O Início de uma Nova Era para Sua Clínica</h2>
            <p className="text-xl text-muted-foreground">
              Vamos construir resultados juntos. Dê o primeiro passo para transformar a previsibilidade e o faturamento do seu negócio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div 
              className="space-y-8"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="p-6 border border-primary/20 bg-background/50 backdrop-blur">
                <div className="text-3xl font-serif text-primary mb-4">01</div>
                <h4 className="font-bold mb-2">Diagnóstico</h4>
                <p className="text-sm text-muted-foreground">Análise profunda da situação atual e identificação de gargalos.</p>
              </div>
              <div className="p-6 border border-primary/20 bg-background/50 backdrop-blur">
                <div className="text-3xl font-serif text-primary mb-4">02</div>
                <h4 className="font-bold mb-2">Plano de Ação</h4>
                <p className="text-sm text-muted-foreground">Entrega de um roadmap específico para os próximos 90 dias.</p>
              </div>
              <div className="p-6 border border-primary/20 bg-background/50 backdrop-blur">
                <div className="text-3xl font-serif text-primary mb-4">03</div>
                <h4 className="font-bold mb-2">Implementação</h4>
                <p className="text-sm text-muted-foreground">Início da execução integrada com acompanhamento contínuo.</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-background border border-border/50 p-8 relative"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-serif font-bold mb-6">Agendar Diagnóstico</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Nome Completo</label>
                  <input type="text" id="name" name="name" required className="w-full bg-card/50 border border-border/50 px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Dr. João Silva" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">E-mail Profissional</label>
                  <input type="email" id="email" name="email" required className="w-full bg-card/50 border border-border/50 px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="contato@clinica.com.br" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">WhatsApp</label>
                  <input type="tel" id="phone" name="phone" required className="w-full bg-card/50 border border-border/50 px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Mensagem (Opcional)</label>
                  <textarea id="message" name="message" rows={3} className="w-full bg-card/50 border border-border/50 px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Conte-nos sobre o momento da sua clínica..."></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-lg disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? 'Enviando...' : 'Solicitar Diagnóstico'}
                </Button>

                {formStatus === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                    Ocorreu um erro ao enviar. Tente novamente mais tarde.
                  </div>
                )}
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  * Formulário conectado ao Formspree (Link de Teste).
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Royal Skin Agency. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
