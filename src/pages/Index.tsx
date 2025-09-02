import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Zap,
  Phone,
  MessageSquare,
  ArrowDown,
  ArrowUp,
  Clock,
  Loader2,
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [usernames, setUsernames] = useState<{
    [key: number]: string;
  }>({});
  const [loading, setLoading] = useState<{
    [key: number]: boolean;
  }>({});

  // URL da sua função do Supabase - SUBSTITUA PELA SUA URL REAL
  const SUPABASE_FUNCTION_URL =
    "https://dxlwwzahqcgcpajunbbv.functions.supabase.co/criar-checkout";

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTestimonials = () => {
    document.getElementById("depoimentos")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleUsernameChange = (planIndex: number, value: string) => {
    setUsernames((prev) => ({
      ...prev,
      [planIndex]: value,
    }));
  };
  // ⚠️ ATUALIZAR ESSA URL PARA A NOVA!
  // ⚠️ ATUALIZAR ESSA URL PARA A NOVA!
  const BACKEND_URL = "https://dxlwwzahqcgcpajunbbv.supabase.co";

  const plans = [
    {
      name: "Pacote Iniciante",
      followers: 1000,
      bonusFollowers: 500,
      bonusEngagement: 10000,
      price: 97.0,
      originalPrice: 197.0,
      popular: false,
      badge: null,
      caktoUrl: "https://pay.cakto.com.br/39j3r5j_471102",
    },
    {
      name: "Pacote Amador",
      followers: 2500,
      bonusFollowers: 1000,
      bonusEngagement: 20000,
      price: 149.9,
      originalPrice: 297.0,
      popular: false,
      badge: null,
      caktoUrl: "https://pay.cakto.com.br/39nx9jr_474721",
    },
    {
      name: "Pacote Avançado",
      followers: 5000,
      bonusFollowers: 1500,
      bonusEngagement: 30000,
      price: 197.0,
      originalPrice: 497.0,
      popular: true,
      badge: "MAIS VENDIDO",
      caktoUrl: "https://pay.cakto.com.br/ysjjsww_474722",
    },
    {
      name: "Pacote Profissional",
      followers: 10000,
      bonusFollowers: 2000,
      bonusEngagement: 50000,
      price: 399.0,
      originalPrice: 997.0,
      popular: false,
      badge: null,
      caktoUrl: "https://pay.cakto.com.br/6ozb4xt_474724",
    },
    {
      name: "Pacote VIP",
      followers: 20000,
      bonusFollowers: 5000,
      bonusEngagement: 100000,
      price: 799.0,
      originalPrice: 1997.0,
      popular: false,
      badge: null,
      caktoUrl: "https://pay.cakto.com.br/7ddzkg3_474726",
    },
    {
      name: "Pacote Premium",
      followers: 50000,
      bonusFollowers: 10000,
      bonusEngagement: 100000,
      price: 1200.0,
      originalPrice: 3500.0,
      popular: false,
      badge: null,
      caktoUrl: "https://pay.cakto.com.br/dfuhu7t_474727",
    },
  ];

  // 👇 ADICIONE SUA CHAVE AQUI 👇
  const SUPABASE_SERVICE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bHd3emFocWNnY3BhanVuYmJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjE2OTA1NywiZXhwIjoyMDY3NzQ1MDU3fQ.XsdAE4aAc6M-CtfjZjDiCKZt1cie2GjH_bCIAUeT4Do";

  // Frontend - handlePurchase CORRIGIDO
  const handlePurchase = async (planIndex) => {
    const rawUsername = usernames[planIndex] || "";
    const cleanUsername = rawUsername.replace("@", "").trim();

    if (cleanUsername.length < 3) {
      alert("Digite um @usuário válido");
      return;
    }

    const planoSelecionado = plans[planIndex];
    setLoading((prev) => ({ ...prev, [planIndex]: true }));

    try {
      // 1. CRIAR PEDIDO NO BANCO PRIMEIRO - USANDO A URL CORRETA
      const response = await fetch(
        `${BACKEND_URL}/functions/v1/criar-checkout`,
        {
          method: "POST",
          headers: {
            // 👈 AJUSTE FEITO AQUI
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          },
          body: JSON.stringify({
            usuario_instagram: cleanUsername,
            plano: planoSelecionado.name,
            preco: planoSelecionado.price,
            quantidade_seguidores: planoSelecionado.followers,
            bonus_followers: planoSelecionado.bonusFollowers,
            bonus_engagement: planoSelecionado.bonusEngagement,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Erro ao criar pedido");
      }

      // 2. REDIRECIONAR PARA A URL ESPECÍFICA DO PRODUTO
      const caktoUrl = `${planoSelecionado.caktoUrl}?customer_identifier=${cleanUsername}`;
      console.log(`🔄 Redirecionando para: ${caktoUrl}`);

      window.location.href = caktoUrl;
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar pedido: " + error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [planIndex]: false }));
    }
  };

  // Função para criar checkout - USANDO A URL CORRETA
  async function criarCheckout(plan, usuarioInstagram) {
    try {
      console.log("🚀 Criando checkout para:", plan.name);
      console.log("👤 Usuário:", usuarioInstagram);

      const response = await fetch(
        `${BACKEND_URL}/functions/v1/criar-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            usuario_instagram: usuarioInstagram,
            plano: plan.name,
            preco: plan.price,
            quantidade_seguidores: plan.followers,
            bonus_followers: plan.bonusFollowers,
            bonus_engagement: plan.bonusEngagement,
          }),
        }
      );

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erro HTTP:", response.status, errorText);
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("📄 Result:", result);

      if (result.success) {
        console.log("✅ Pedido criado com sucesso! ID:", result.pedido.id);

        // Aguardar um pouco antes de redirecionar
        setTimeout(() => {
          window.location.href = plan.caktoUrl;
        }, 1000);
      } else {
        console.error("❌ Erro no resultado:", result.error);
        alert("Erro ao processar pedido: " + result.error);
      }
    } catch (error) {
      console.error("❌ Erro de conexão:", error);
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  }

  // Função para validar usuário do Instagram
  function validarUsuarioInstagram(usuario) {
    // Remove @ se tiver
    usuario = usuario.replace("@", "");

    // Validar formato básico
    const regex = /^[a-zA-Z0-9._]{1,30}$/;
    return regex.test(usuario);
  }

  // Função para testar conexão - USANDO A URL CORRETA
  async function testarConexao() {
    try {
      console.log("🔍 Testando conexão...");
      const response = await fetch(
        `${BACKEND_URL}/functions/v1/criar-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            usuario_instagram: "teste_conexao",
            plano: "Teste",
            preco: 1.0,
            quantidade_seguidores: 1,
          }),
        }
      );

      console.log("✅ Conexão OK! Status:", response.status);
      return true;
    } catch (error) {
      console.error("❌ Erro de conexão:", error);
      return false;
    }
  }

  // Event listeners
  document.addEventListener("DOMContentLoaded", function () {
    // Testar conexão quando a página carregar
    testarConexao();

    // Configurar botões
    const buttons = document.querySelectorAll(".btn-comprar");

    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        const usuarioInstagram = document
          .getElementById("usuario-instagram")
          .value.trim();

        if (!usuarioInstagram) {
          alert("Por favor, informe seu usuário do Instagram");
          document.getElementById("usuario-instagram").focus();
          return;
        }

        if (!validarUsuarioInstagram(usuarioInstagram)) {
          alert(
            "Por favor, informe um usuário válido do Instagram (sem @ e sem espaços)"
          );
          document.getElementById("usuario-instagram").focus();
          return;
        }

        // Desabilitar botão durante o processamento
        button.disabled = true;
        button.textContent = "Processando...";

        // Usar o plano correspondente ao índice do botão
        criarCheckout(plans[index], usuarioInstagram).finally(() => {
          // Reabilitar botão
          button.disabled = false;
          button.textContent = "Comprar Agora";
        });
      });
    });
  });
  const benefits = [
    {
      icon: "⚡",
      title: "Entrega Imediata",
      description:
        "Seus seguidores podem começar a chegar a partir de 10 minutos",
    },
    {
      icon: "🔒",
      title: "100% Seguro",
      description: "Sem senha e totalmente protegido",
    },
    {
      icon: "🇧🇷",
      title: "Seguidores Reais",
      description: "Perfis ativos de pessoas reais e brasileiras",
    },
    {
      icon: "💳",
      title: "PIX e Cartão",
      description: "Pague como preferir",
    },
    {
      icon: "🫂",
      title: "Suporte Humanizado",
      description: "Fale direto com o dono no WhatsApp",
    },
    {
      icon: "⭐",
      title: "Experiência",
      description: "Desde 2019 no Digital",
    },
  ];

  const testimonials = [
    {
      stars: 5,
      comment: "Entrega super rápida! Perfeito para dar aquele up no perfil.",
      user: "@joaodigital",
    },
    {
      stars: 5,
      comment: "Seguidores de qualidade, recomendo demais!",
      user: "@mariafashion",
    },
    {
      stars: 5,
      comment: "Atendimento excelente e resultado incrível.",
      user: "@carlosfit",
    },
    {
      stars: 5,
      comment: "Melhor investimento que fiz para meu Instagram.",
      user: "@anabeauty",
    },
    {
      stars: 5,
      comment: "Suporte incrível, entrega rápida e seguidores reais!",
      user: "@lucastech",
    },
    {
      stars: 5,
      comment: "Superou minhas expectativas, muito satisfeita!",
      user: "@gabrielaart",
    },
    {
      stars: 5,
      comment: "Servico de qualidade, entrega conforme prometido.",
      user: "@pedromusic",
    },
    {
      stars: 5,
      comment: "Atendimento top e resultados visíveis rapidamente.",
      user: "@juliabeauty",
    },
    {
      stars: 5,
      comment: "Recomendo para quem quer crescer no Instagram!",
      user: "@rafaelgym",
    },
  ];

  const faqs = [
    {
      question: "Os seguidores são reais?",
      answer:
        "Sim, trabalhamos com perfis reais para maior credibilidade e engajamento natural.",
    },
    {
      question: "Quanto tempo demora a entrega?",
      answer:
        "Pagamentos feitos dentro do horário comercial, 8h as 17h, normalmente tem inicio do serviço em 1h",
    },
    {
      question: "É seguro comprar?",
      answer:
        "100%. Não pedimos senha nem acesso à sua conta. Trabalhamos apenas com o nome de usuário.",
    },
    {
      question: "Posso perder os seguidores?",
      answer:
        "Oferecemos garantia de reposição por 30 dias para qualquer perda natural.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Aceitamos PIX (desconto especial) e cartão de crédito. Pagamento 100% seguro.",
    },
    {
      question: "Termos do serviço",
      answer: (
        <div>
          <p className="font-bold">ANTES DE CONTRATAR, LEIA COM ATENÇÃO</p>
          <p className="mt-2">
            Nosso serviço é para dar volume e credibilidade ao seu perfil.
            <br />
            Perfis com poucos seguidores não passam confiança, afastam clientes
            e dificultam fechamentos de vendas.
            <br />
            Com mais seguidores, o seu perfil parece mais relevante, aumentando
            a chance de alguém te levar a sério e comprar de você.
          </p>

          <p className="mt-4">
            <strong className="font-bold">O QUE VOCÊ ESTÁ CONTRATANDO:</strong>
            <br />
            Seguidores com nomes reais e brasileiros, fotos e bio, para aumentar
            o número no seu perfil e transmitir mais confiança e autoridade.
          </p>

          <p className="mt-2">
            <strong className="font-bold">Volume, não interação:</strong> os
            seguidores não vão curtir, comentar, mandar mensagem ou comprar de
            você.
          </p>

          <p className="mt-2">
            É ideal para quem precisa que o perfil pareça maior e mais confiável
            para vender mais.
          </p>

          <p className="mt-4">
            <strong className="font-bold">IMPORTANTE:</strong>
            <br />
            Os seguidores podem deixar de seguir com o tempo (taxa natural de
            queda).
            <br />
            Nós repomos por 30 dias se isso acontecer.
            <br />
            Não mude o @ do seu perfil depois de comprar, ou a reposição não
            será possível.
          </p>

          <p className="mt-4 text-[14px]">
            <strong className="font-bold">TERMOS LEGAIS:</strong>
            <br />
            Não nos responsabilizamos por expectativas fora do que está descrito
            neste termo.
            <br />
            Não realizamos reembolsos após a execução do serviço, exceto em
            casos previstos em lei (problema técnico comprovado).
          </p>

          <p className="mt-4 text-[14px]">
            <strong className="font-bold">COMPROU VIEWS OU CURTIDAS?</strong>
            <br />
            Envie o link da publicação onde deseja que as interações sejam
            aplicadas.
          </p>

          <p className="mt-4 text-[14px]">
            <strong className="font-bold">HORÁRIO DE ATENDIMENTO:</strong>
            <br />
            Segunda a sexta, das 7h às 17h
            <br />
            Almoço: 12h30 às 13h30
            <br />
            Café: 15h30 às 16h
          </p>

          <p className="mt-2 text-[14px]">
            Compras fora do horário serão processadas assim que voltarmos.
            <br />
            Mandar várias mensagens seguidas joga sua conversa para o final da
            fila e atrasa seu atendimento.
          </p>

          <p className="mt-4 font-bold text-[14px]">
            Ao contratar, você está ciente e de acordo com estas condições.
            <br />
            Resultado: um perfil maior significa mais confiança.
          </p>
        </div>
      ),
    },
  ];

  const carouselImages = [
    { id: 1, alt: "Depoimento 1", src: "/depoimento-1.jpeg" },
    { id: 2, alt: "Depoimento 2", src: "/depoimento-2.jpeg" },
    { id: 3, alt: "Depoimento 3", src: "/depoimento-3.jpeg" },
    { id: 4, alt: "Depoimento 4", src: "/depoimento-4.jpeg" },
    { id: 5, alt: "Depoimento 5", src: "/depoimento-5.jpeg" },
    { id: 6, alt: "Depoimento 6", src: "/depoimento-6.jpeg" },
    { id: 7, alt: "Depoimento 7", src: "/depoimento-7.jpeg" },
    { id: 8, alt: "Depoimento 8", src: "/depoimento-8.jpeg" },
    { id: 9, alt: "Depoimento 9", src: "/depoimento-9.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap');
          
          @keyframes pulse-button {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4); }
            50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(147, 51, 234, 0.1); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
          }
          
          @keyframes pulse-whatsapp {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(37, 211, 102, 0.1); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
          
          .pulse-main-button { animation: pulse-button 3s infinite; }
          .pulse-whatsapp-button { animation: pulse-whatsapp 3s infinite; }
        `,
        }}
      />

      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="bg-[#4ade80] py-2 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white font-semibold text-sm">
              Compra 100% segura
            </p>
          </div>
        </div>

        <div className="bg-white py-4 px-4 border-b border-gray-100">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                fontana
              </span>
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
      </div>

      <div className="h-24"></div>
<section className="bg-white py-12 px-4">
  <div className="max-w-6xl mx-auto flex flex-col items-center animate-fade-in text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
      Ganhe seguidores reais no Instagram com <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">entrega rápida e segura</span> 🚀
    </h1>
    
    <h2 className="text-lg md:text-xl text-gray-600 mb-8">
      Os melhores seguidores brasileiros reais. Mais visibilidade, mais autoridade e resultados imediatos para sua conta.
    </h2>

    <Button
      onClick={scrollToPlans}
      className="pulse-main-button bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white px-5 py-4 text-xl font-semibold rounded-lg transition-all duration-300 border-0"
    >
      COMPRAR SEGUIDORES AGORA
    </Button>

    {/* NOVO BLOCO ADICIONADO AQUI */}
    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-700">
        <span className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span> Seguidores reais e ativos
        </span>
        <span className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span> Entrega em até 24h
        </span>
        <span className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span> Suporte 24/7
        </span>
        <span className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span> Pagamento 100% seguro
        </span>
    </div>
  </div>
</section>

      <section id="depoimentos" className="bg-white py-0px-2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-neutral-700">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-center text-[#666666] mb-8">
            Quem compra na Fontana fica feliz por cada centavo investido 👇🏼
          </p>

          <div className="mb-8">
            <Carousel
              className="w-full max-w-5xl mx-auto"
              plugins={[
                Autoplay({
                  delay: 2500,
                }),
              ]}
            >
              <CarouselContent>
                {carouselImages.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-[1080/1350] items-center justify-center p-2">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="max-w-2xl mx-auto">
            <Carousel
              className="w-full"
              opts={{ align: "start", loop: true }}
              plugins={[Autoplay({ delay: 3000 })]}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-3">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <span key={i} className="text-gold text-xl">
                              ⭐
                            </span>
                          ))}
                        </div>
                        <p className="text-[#555555] mb-4 italic">
                          "{testimonial.comment}"
                        </p>
                        <p className="font-semibold text-[#111111]">
                          — {testimonial.user}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      <section className="bg-white py-4 px-4">
        <div className="max-w-md mx-auto">
          <CountdownTimer
            initialHours={6}
            initialMinutes={48}
            initialSeconds={41}
          />
        </div>
      </section>

      <section id="planos" className="bg-[#f9f9f9] py-6 px-4">
        <div className="max-w-7xl mx-auto">
         <h2 className="text-4xl font-bold text-center mb-2 text-neutral-700">Promoção,
          Seguidores em <span style={{ color: "#f83f8d" }}>Dobro</span>
          </h2><p className="text-center text-gray-600 text-lg mt-4 mb-8 max-w-2xl mx-auto">
  <span className="font-bold text-neutral-800">Promoção por tempo limitado.</span> Na compra de qualquer pacote leve o <span className="font-bold text-neutral-800">dobro de seguidores</span>!
</p>
          <p className="text-center text-black text-sm font-bold mb-8">
            Escolha o pacote ideal para você 👇
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-[#874aea] ${
                  hoveredPlan === index ? "shadow-2xl" : ""
                }`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.badge && (
                  <Badge
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs ${
                      plan.badge === "MAIS VENDIDO"
                        ? "bg-[#F97316]"
                        : "bg-red-500"
                    } text-white font-bold shadow-md z-10`}
                  >
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-bold mb-2 text-neutral-700">
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
                        R$ {plan.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ color: "#874aea" }}
                    >
                      R$ {plan.price.toFixed(2).replace(".", ",")}
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
                    <Input
                      placeholder="Digite seu @usuario"
                      value={usernames[index] || ""}
                      onChange={(e) =>
                        handleUsernameChange(index, e.target.value)
                      }
                      className="text-center"
                    />
                    <Button
                      className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#874aea" }}
                      onClick={() => handlePurchase(index)}
                      disabled={loading[index]}
                    >
                      {loading[index] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          PROCESSANDO...
                        </>
                      ) : (
                        "COMPRAR AGORA"
                      )}
                    </Button>
                    <div className="text-xs text-center text-gray-600">
                      No PIX ou Cartão de Crédito
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-zinc-700">
            Por Que Escolher a Fontana Serviços Digitais?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#666666]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/iconewpp.png"
              alt="Ícone do WhatsApp"
              className="w-16 h-16 mx-auto mb-4"
            />

            <h2 className="text-3xl font-bold mb-4 text-neutral-700">
              Compre conosco pelo WhatsApp
            </h2>
            <p className="text-[#666666] mb-8">
              Caso você prefira, pode realizar a compra dos seguidores
              diretamente com nossa equipe pelo WhatsApp, só clicar no botão
              abaixo 👇🏻
            </p>
            <a href="https://wa.me/5581993057390" className="inline-block">
              <Button className="pulse-whatsapp-button bg-whatsapp hover:bg-green-500 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                COMPRAR PELO WHATSAPP
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-0">
        <img
          src="/logosite.png"
          alt="Logo da Fontana"
          className="w-full h-auto"
        />
      </section>

      <section className="bg-[#f3f4f6] py-4 px-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-zinc-700">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline text-neutral-700">
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

      <footer className="bg-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#666666]">
            © 2025 Fontana Serviços Digitais. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;