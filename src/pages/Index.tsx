
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Zap, Phone, MessageSquare, ArrowDown, ArrowUp, Clock } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import Autoplay from "embla-carousel-autoplay";

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

  const scrollToTestimonials = () => {
    document.getElementById('depoimentos')?.scrollIntoView({
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
    popular: false,
    badge: null
  }, {
    name: "Pacote Avançado",
    followers: 5000,
    bonusFollowers: 1500,
    bonusEngagement: 30000,
    price: 197.00,
    originalPrice: 497.00,
    popular: true,
    badge: "MAIS VENDIDO"
  }, {
    name: "Pacote Profissional",
    followers: 10000,
    bonusFollowers: 2000,
    bonusEngagement: 50000,
    price: 399.00,
    originalPrice: 997.00,
    popular: false,
    badge: null
  }, {
    name: "Pacote VIP",
    followers: 20000,
    bonusFollowers: 5000,
    bonusEngagement: 100000,
    price: 799.00,
    originalPrice: 1997.00,
    popular: false,
    badge: "MAIOR CUSTO-BENEFÍCIO"
  }, {
    name: "Pacote Premium",
    followers: 50000,
    bonusFollowers: 10000,
    bonusEngagement: 100000,
    price: 1200.00,
    originalPrice: 3500.00,
    popular: false,
    badge: null
  }];

  const benefits = [{
    icon: "⚡",
    title: "Entrega Imediata",
    description: "Seus seguidores podem começar a chegar a partir de 10 minutos"
  }, {
    icon: "🔒",
    title: "100% Seguro",
    description: "Sem senha e totalmente protegido"
  }, {
    icon: "🇧🇷",
    title: "Seguidores Reais",
    description: "Perfis ativos de pessoas reais e brasileiras"
  }, {
    icon: "💳",
    title: "PIX e Cartão",
    description: "Pague como preferir"
  }, {
    icon: "🫂",
    title: "Suporte Humanizado",
    description: "Fale direto com o dono no WhatsApp"
  }, {
    icon: "⭐",
    title: "Experiência",
    description: "Desde 2019 no Digital"
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
  }, {
    stars: 5,
    comment: "Suporte incrível, entrega rápida e seguidores reais!",
    user: "@lucastech"
  }, {
    stars: 5,
    comment: "Superou minhas expectativas, muito satisfeita!",
    user: "@gabrielaart"
  }, {
    stars: 5,
    comment: "Servico de qualidade, entrega conforme prometido.",
    user: "@pedromusic"
  }, {
    stars: 5,
    comment: "Atendimento top e resultados visíveis rapidamente.",
    user: "@juliabeauty"
  }, {
    stars: 5,
    comment: "Recomendo para quem quer crescer no Instagram!",
    user: "@rafaelgym"
  }];

  const faqs = [{
    question: "Os seguidores são reais?",
    answer: "Sim, trabalhamos com perfis reais para maior credibilidade e engajamento natural."
  }, {
    question: "Quanto tempo demora a entrega?",
    answer: "Pagamentos feitos dentro do horário comercial, 8h as 17h, normalmente tem inicio do serviço em 1h"
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

  // Array de 9 placeholders para o carrossel de fotos
  const carouselImages = Array.from({
    length: 9
  }, (_, i) => ({
    id: i + 1,
    alt: `Depoimento ${i + 1}`,
    src: "/placeholder.svg"
  }));

  return <div className="min-h-screen bg-white font-poppins">
      {/* Linha Verde Superior */}
      <div className="bg-[#4ade80] py-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white font-semibold text-sm">Compra 100% segura</p>
        </div>
      </div>

      {/* Header com Logo e Navegação */}
      <div className="bg-white py-4 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Fontana Logo" className="h-12 w-auto" />
          </div>
          <nav className="flex space-x-6">
            <button 
              onClick={scrollToTestimonials}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Depoimentos
            </button>
            <button 
              onClick={scrollToPlans}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Planos
            </button>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-6xl font-bold uppercase mb-6 leading-tight md:text-6xl">
            GANHE <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">SEGUIDORES</span> REAIS<br />
            E ATIVOS NO <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">INSTAGRAM</span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{
          color: '#d84e75'
        }}>
            Os melhores seguidores brasileiro prime com entrega rápida, sem senha e 100% seguro.
          </h2>
          <Button onClick={scrollToPlans} className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]">
            COMPRAR SEGUIDORES AGORA
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-center text-[#666666] mb-8">Quem compra na Fontana fica feliz por cada centavo investido 👇🏼</p>
          
          {/* Carrossel de 9 fotos */}
          <div className="mb-8">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {carouselImages.map(image => <CarouselItem key={image.id} className="md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-[1080/1350] items-center justify-center p-2">
                          <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          
          {/* Carrossel automático de depoimentos escritos */}
          <div className="max-w-2xl mx-auto">
            <Carousel 
              className="w-full" 
              opts={{ align: "start", loop: true }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-3">
                          {[...Array(testimonial.stars)].map((_, i) => <span key={i} className="text-gold text-xl">⭐</span>)}
                        </div>
                        <p className="text-[#555555] mb-4 italic">"{testimonial.comment}"</p>
                        <p className="font-semibold text-[#111111]">— {testimonial.user}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Gatilho de Escassez */}
      <section className="bg-white py-8 px-4">
        <div className="max-w-md mx-auto">
          <CountdownTimer initialHours={6} initialMinutes={48} initialSeconds={41} />
        </div>
      </section>

      {/* Planos e Preços */}
      <section id="planos" className="bg-[#f9f9f9] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-2">
            Conheça nossos <span style={{
            color: '#d84e75'
          }}>Pacotes</span>
          </h2>
          <p className="text-center text-black mb-2">Na compra de qualquer pacote ganhe também Bônus de engajamento: Curtidas + Views!</p>
          <p className="text-center text-black text-sm font-bold mb-8">Escolha o pacote ideal para você 👇</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => <Card key={index} className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-[#874aea] ${hoveredPlan === index ? 'shadow-2xl' : ''}`} onMouseEnter={() => setHoveredPlan(index)} onMouseLeave={() => setHoveredPlan(null)}>
                {plan.badge && <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs ${plan.badge === "MAIS VENDIDO" ? 'bg-[#F97316]' : plan.badge === "MAIOR CUSTO-BENEFÍCIO" ? 'bg-[#10B981]' : 'bg-red-500'} text-white font-bold shadow-md z-10`}>
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
                    <Button className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]" style={{
                  backgroundColor: '#874aea'
                }}>
                      COMPRAR AGORA
                    </Button>
                    <div className="text-xs text-center text-gray-600">
                      No PIX ou Cartão de Crédito
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          
          {/* Aviso dos últimos pacotes */}
          <div className="text-center mt-6">
            <p className="text-xs text-[#555555] uppercase">ÚLTIMOS 3 PACOTES!</p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-[#f9f9f9] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-8">Por Que Escolher a Fontana Serviços Digitais?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => <div key={index} className="text-center group">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#666666]">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Seção WhatsApp */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl mb-4 block">💬</span>
            <h2 className="text-3xl font-bold text-[#111111] mb-4">Compre conosco pelo WhatsApp</h2>
            <p className="text-[#666666] mb-8">
              Caso você prefira, pode realizar a compra dos seguidores diretamente com nossa equipe pelo WhatsApp, só clicar no botão abaixo 👇🏻
            </p>
            <a href="https://wa.me/5511999999999" className="inline-block">
              <Button className="bg-whatsapp hover:bg-green-500 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                COMPRAR PELO WHATSAPP
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f3f4f6] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#111111] mb-8">Perguntas Frequentes</h2>
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

      {/* Rodapé Simples */}
      <footer className="bg-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#666666]">© 2025 Fontana Serviços Digitais. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp */}
      <a href="https://wa.me/5511999999999" className="fixed bottom-6 right-6 bg-whatsapp hover:bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-bounce" aria-label="Contato via WhatsApp">
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>;
};

export default Index;
