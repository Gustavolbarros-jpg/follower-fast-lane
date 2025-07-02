
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

const CountdownTimer = ({ 
  initialHours = 2, 
  initialMinutes = 30, 
  initialSeconds = 0 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reinicia o timer quando chega a zero
          hours = initialHours;
          minutes = initialMinutes;
          seconds = initialSeconds;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialHours, initialMinutes, initialSeconds]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg border-2 border-red-400 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-bold">OFERTA LIMITADA!</h3>
      </div>
      
      <div className="text-center">
        <p className="text-sm mb-3 opacity-90">
          Preços especiais terminam em:
        </p>
        
        <div className="flex justify-center space-x-4 mb-4">
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{formatTime(timeLeft.hours)}</div>
            <div className="text-xs opacity-80">HORAS</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{formatTime(timeLeft.minutes)}</div>
            <div className="text-xs opacity-80">MIN</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{formatTime(timeLeft.seconds)}</div>
            <div className="text-xs opacity-80">SEG</div>
          </div>
        </div>
        
        <p className="text-sm font-semibold">
          🔥 Até 40% OFF nos planos mais populares!
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
