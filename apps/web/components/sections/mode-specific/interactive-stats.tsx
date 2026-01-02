'use client';

import { useEffect, useState } from 'react';
import { Users, Clock, Award, Heart } from 'lucide-react';

/**
 * InteractiveStats: Experimental animated stats component
 * Shows animated counters on scroll
 */
export function InteractiveStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, years: 0, awards: 0, satisfaction: 0 });

  const stats = [
    { icon: Users, label: 'Mutlu Müşteri', value: 5000, suffix: '+', color: 'blue' },
    { icon: Clock, label: 'Yıl Deneyim', value: 15, suffix: '+', color: 'amber' },
    { icon: Award, label: 'Sertifika', value: 8, suffix: '', color: 'emerald' },
    { icon: Heart, label: 'Memnuniyet', value: 98, suffix: '%', color: 'red' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('interactive-stats');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts((prev) => ({
          ...prev,
          [index === 0 ? 'clients' : index === 1 ? 'years' : index === 2 ? 'awards' : 'satisfaction']: Math.floor(current),
        }));
      }, interval);
    });
  }, [isVisible]);

  return (
    <section id="interactive-stats" className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Rakamlarla ESLAMED
          </h2>
          <p className="text-lg text-slate-600">
            Deneyim ve güvenilirliğin sayılarla ifadesi
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const currentValue = index === 0 ? counts.clients : index === 1 ? counts.years : index === 2 ? counts.awards : counts.satisfaction;
            const colorClasses = {
              blue: 'bg-blue-50 border-blue-200 text-blue-600',
              amber: 'bg-amber-50 border-amber-200 text-amber-600',
              emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
              red: 'bg-red-50 border-red-200 text-red-600',
            };

            return (
              <div
                key={index}
                className={`p-6 md:p-7 rounded-2xl border-2 ${colorClasses[stat.color as keyof typeof colorClasses]} transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-9 h-9 opacity-90" strokeWidth={2.5} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-slate-900">
                  {currentValue}{stat.suffix}
                </div>
                <div className="text-sm font-semibold text-slate-700">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

