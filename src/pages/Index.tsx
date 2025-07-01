
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Zap, Phone, MessageSquare, ArrowDown, ArrowUp } from 'lucide-react';

const Index = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const plans = [
    { followers: 100, price: 5.00, popular: false },
    { followers: 500, price: 15.00, popular: true },
    { followers: 1000, price: 25.00, popular: false },
    { followers: 2500, price: 50.00, popular: false },
    { followers: 5000, price: 85.00, popular: false },
    { followers: 10000, price: 150.00, popular: false },
  ];

  const benefits = [
    { icon: <Zap className="w-8 h-8 text-neon-blue" />, title: "Entrega Imediata", description: "Seus seguidores chegam em até 10 minutos" },
    { icon: <div className="w-8 h-8 text-2xl">🔒</div>, title: "100% Seguro", description: "Sem senha e totalmente protegido" },
    { icon: <div className="w-8 h-8 text-2xl">🧑</div>, title: "Seguidores Reais", description: "Perfis ativos de pessoas reais" },
    { icon: <div className="w-8 h-8 text-2xl">💳</div>, title: "PIX e Cartão", description: "Pague como preferir" },
    { icon: <div className="w-8 h-8 text-2xl">📲</div>, title: "Suporte 24h", description: "WhatsApp sempre disponível" },
  ];

  const testimonials = [
    { stars: 5, comment: "Entrega super rápida! Perfeito para dar aquele up no perfil.", user: "@joaodigital" },
    { stars: 5, comment: "Seguidores de qualidade, recomendo demais!", user: "@mariafashion" },
    { stars: 5, comment: "Atendimento excelente e resultado incrível.", user: "@carlosfit" },
    { stars: 5, comment: "Melhor investimento que fiz para meu Instagram.", user: "@anabeauty" },
  ];

  const faqs = [
    {
      question: "Os seguidores são reais?",
      answer: "Sim, trabalhamos com perfis reais para maior credibilidade e engajamento natural."
    },
    {
      question: "Quanto tempo demora a entrega?",
      answer: "Normalmente de 1 a 10 minutos após confirmação do pagamento."
    },
    {
      question: "É seguro comprar?",
      answer: "100%. Não pedimos senha nem acesso à sua conta. Trabalhamos apenas com o nome de usuário."
    },
    {
      question: "Posso perder os seguidores?",
      answer: "Oferecemos garantia de reposição por 30 dias para qualquer perda natural."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Aceitamos PIX (desconto especial) e cartão de crédito. Pagamento 100% seguro."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-[#111111] uppercase mb-6 leading-tight">
            GANHE SEGUIDORES REAIS<br />E ATIVOS NO INSTAGRAM
          </h1>
          <h2 className="text-xl md:text-2xl text-[#666666] mb-12 max-w-3xl mx-auto">
            Entrega rápida, sem senha e 100% segura.
          </h2>
          <Button 
            onClick={scrollToPlans}
            className="bg-neon-blue hover:bg-blue-600 text-white px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            COMPRAR AGORA
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Planos e Preços */}
      <section id="planos" className="bg-[#f9f9f9] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">Escolha Seu Plano</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                  plan.popular ? 'border-purple-modern' : 'border-[#e0e0e0]'
                } ${hoveredPlan === index ? 'shadow-2xl' : ''}`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-modern text-white px-4 py-1">
                    MAIS POPULAR
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold text-[#111111]">
                    {plan.followers.toLocaleString()} Seguidores
                  </CardTitle>
                  <CardDescription className="text-4xl font-bold text-neon-blue mt-4">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-purple-modern hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    COMPRAR AGORA
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-[#f9f9f9] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">Por Que Escolher a Banhato Social?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#666666]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">O Que Nossos Clientes Dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <span key={i} className="text-gold text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-[#555555] mb-4 italic">"{testimonial.comment}"</p>
                  <p className="font-semibold text-[#111111]">— {testimonial.user}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f3f4f6] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-16">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left text-[#111111] font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Banhato Social</h3>
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
              <a 
                href="https://wa.me/5511999999999" 
                className="inline-flex items-center text-whatsapp hover:text-green-400 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp: (11) 99999-9999
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-[#cccccc]">
            <p>© 2025 Banhato Social. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp */}
      <a
        href="https://wa.me/5511999999999"
        className="fixed bottom-6 right-6 bg-whatsapp hover:bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Contato via WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Index;
