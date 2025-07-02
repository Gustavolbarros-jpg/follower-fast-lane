import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Zap, Phone, MessageSquare, ArrowDown, ArrowUp } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

const Index = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [usernames, setUsernames] = useState<{
    [key: number]: string;
  }>({});
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleUsernameChange = (planIndex: number, value: string) => {
    setUsernames(prev => ({
      ...prev,
      [planIndex]: value
    }));
  };
  const plans = [{
    name: "Pacote Iniciante",
    followers: 1000,
    bonusFollowers: 500,
    bonusEngagement: 10000,
    price: 97.00,
    originalPrice: 197.00,
    popular: false,
    badge: null
  }, {
    name: "Pacote Amador",
    followers: 2500,
    bonusFollowers: 1000,
    bonusEngagement: 20000,
    price: 149.90,
    originalPrice: 297.00,
    popular: true,
    badge: "MAIS VENDIDO"
  }, {
    name: "Pacote Avançado",
    followers: 5000,
    bonusFollowers: 1500,
    bonusEngagement: 30000,
    price: 197.00,
    originalPrice: 497.00,
    popular: false,
    badge: null
  }, {
    name: "Pacote Profissional",
    followers: 10000,
    bonusFollowers: 2000,
    bonusEngagement: 50000,
    price: 399.00,
    originalPrice: 997.00,
    popular: false,
    badge: "MAIOR CUSTO-BENEFÍCIO"
  }, {
    name: "Pacote VIP",
    followers: 20000,
    bonusFollowers: 5000,
    bonusEngagement: 100000,
    price: 799.00,
    originalPrice: 1997.00,
    popular: false,
    badge: null
  }, {
    name: "Pacote Premium",
    followers: 50000,
    bonusFollowers: 10000,
    bonusEngagement: 100000,
    price: 1200.00,
    originalPrice: 3500.00,
    popular: false,
    badge: "ÚLTIMOS 3 PACOTES!"
  }, {
    name: "Pacote Elite",
    followers: 100000,
    bonusFollowers: 20000,
    bonusEngagement: 150000,
    price: 1997.00,
    originalPrice: 4500.00,
    popular: false,
    badge: null
  }];
  const benefits = [{
    icon: <Zap className="w-8 h-8 text-neon-blue" />,
    title: "Entrega Imediata",
    description: "Seus seguidores chegam em até 10 minutos"
  }, {
    icon: <div className="w-8 h-8 text-2xl">🔒</div>,
    title: "100% Seguro",
    description: "Sem senha e totalmente protegido"
  }, {
    icon: <div className="w-8 h-8 text-2xl">🧑</div>,
    title: "Seguidores Reais",
    description: "Perfis ativos de pessoas reais"
  }, {
    icon: <div className="w-8 h-8 text-2xl">💳</div>,
    title: "PIX e Cartão",
    description: "Pague como preferir"
  }, {
    icon: <div className="w-8 h-8 text-2xl">📲</div>,
    title: "Suporte 24h",
    description: "WhatsApp sempre disponível"
  }];
  const testimonials = [{
    stars: 5,
    comment: "Entrega super rápida! Perfeito para dar aquele up no perfil.",
    user: "@joaodigital"
  }, {
    stars: 5,
    comment: "Seguidores de qualidade, recomendo demais!",
    user: "@mariafashion"
  }, {
    stars: 5,
    comment: "Atendimento excelente e resultado incrível.",
    user: "@carlosfit"
  }, {
    stars: 5,
    comment: "Melhor investimento que fiz para meu Instagram.",
    user: "@anabeauty"
  }];
  const faqs = [{
    question: "Os seguidores são reais?",
    answer: "Sim, trabalhamos com perfis reais para maior credibilidade e engajamento natural."
  }, {
    question: "Quanto tempo demora a entrega?",
    answer: "Normalmente de 1 a 10 minutos após confirmação do pagamento."
  }, {
    question: "É seguro comprar?",
    answer: "100%. Não pedimos senha nem acesso à sua conta. Trabalhamos apenas com o nome de usuário."
  }, {
    question: "Posso perder os seguidores?",
    answer: "Oferecemos garantia de reposição por 30 dias para qualquer perda natural."
  }, {
    question: "Como funciona o pagamento?",
    answer: "Aceitamos PIX (desconto especial) e cartão de crédito. Pagamento 100% seguro."
  }];
  return <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gold uppercase mb-6 leading-tight">
            GANHE SEGUIDORES REAIS<br />E ATIVOS NO INSTAGRAM
          </h1>
          <h2 className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-red-500">
            Entrega rápida, sem senha e 100% segura.
          </h2>
          <Button onClick={scrollToPlans} className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg border-0">
            COMPRAR AGORA
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">O Que Nossos Clientes Dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.stars)].map((_, i) => <span key={i} className="text-gold text-xl">⭐</span>)}
                  </div>
                  <p className="text-[#555555] mb-4 italic">"{testimonial.comment}"</p>
                  <p className="font-semibold text-[#111111]">— {testimonial.user}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section id="planos" className="bg-[#f9f9f9] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-8">Escolha Seu Plano</h2>
          
          {/* Cronômetro de Escassez */}
          <div className="max-w-md mx-auto mb-16">
            <CountdownTimer initialHours={6} initialMinutes={48} initialSeconds={41} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plans.map((plan, index) => <Card key={index} className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${plan.popular ? 'border-purple-modern' : 'border-[#e0e0e0]'} ${hoveredPlan === index ? 'shadow-2xl' : ''}`} onMouseEnter={() => setHoveredPlan(index)} onMouseLeave={() => setHoveredPlan(null)}>
                {plan.badge && <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs ${plan.popular ? 'bg-purple-modern' : 'bg-red-500'} text-white`}>
                    {plan.badge}
                  </Badge>}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-bold text-[#111111] mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-1 text-sm">
                    <div className="font-semibold text-purple-modern">
                      {plan.followers.toLocaleString()} Seguidores Instagram
                    </div>
                    <div className="text-green-600">
                      + {plan.bonusFollowers.toLocaleString()} Seguidores Bônus
                    </div>
                    <div className="text-blue-600">
                      +{plan.bonusEngagement.toLocaleString()} Bônus Engajamento
                    </div>
                  </div>
                  <CardDescription className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg text-gray-500 line-through">
                        R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-neon-blue">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-xs text-red-600 font-semibold mt-1">
                      Somente Hoje
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      <span>100% Seguro e Confidencial</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      <span>Não precisamos da sua senha</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      <span>Seguidores Reais e Brasileiros</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Input placeholder="Digite seu @usuario" value={usernames[index] || ''} onChange={e => handleUsernameChange(index, e.target.value)} className="text-center" />
                    <Button className="w-full bg-purple-modern hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                      COMPRAR AGORA
                    </Button>
                    <div className="text-xs text-center text-gray-600">
                      No PIX ou Cartão de Crédito
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-[#f9f9f9] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">Por Que Escolher a Fontana Serviços Digitais?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => <div key={index} className="text-center group">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#666666]">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f3f4f6] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left text-[#111111] font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Fontana Serviços Digitais</h3>
              <p className="text-[#cccccc]">Sua parceira para crescer no Instagram com seguidores reais e ativos.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-[#cccccc]">
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantias</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <a href="https://wa.me/5511999999999" className="inline-flex items-center text-whatsapp hover:text-green-400 transition-colors">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp: (11) 99999-9999
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-[#cccccc]">
            <p>© 2025 Fontana Serviços Digitais. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp */}
      <a href="https://wa.me/5511999999999" className="fixed bottom-6 right-6 bg-whatsapp hover:bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50" aria-label="Contato via WhatsApp">
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>;
};

export default Index;
