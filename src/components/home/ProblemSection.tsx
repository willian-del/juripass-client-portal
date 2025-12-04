export function ProblemSection() {
  const stats = [
    {
      value: '69%',
      label: 'da população enfrentou problemas jurídicos nos últimos 2 anos'
    },
    {
      value: '13%',
      label: 'conseguiu resolver sem ajuda especializada'
    },
    {
      value: '28%',
      label: 'sofreu impacto na saúde mental'
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Statement - elegant typography */}
          <p className="text-xl md:text-3xl lg:text-4xl text-white/90 font-light leading-relaxed text-center animate-fade-in">
            Problemas jurídicos não resolvidos causam{' '}
            <span className="font-semibold text-white">
              absenteísmo, estresse e redução de produtividade
            </span>{' '}
            em sua equipe.
          </p>

          {/* Subtle separator */}
          <div className="w-24 h-px bg-white/30 mx-auto my-16 md:my-20" />

          {/* Stats - giant numbers, no cards */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 text-center">
            {stats.map((stat, index) => (
              <div 
                key={stat.value} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <p className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-white/70 mt-4 font-light max-w-xs mx-auto">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Source */}
          <p className="text-center text-xs text-white/50 mt-16 italic">
            Fonte: Pesquisa MelhorRH, 2023
          </p>

          {/* Subtle separator */}
          <div className="w-24 h-px bg-white/30 mx-auto my-16 md:my-20" />

          {/* Impact message */}
          <p className="text-center text-lg md:text-2xl text-white font-light leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Problemas jurídicos não resolvidos causam{' '}
            <span className="font-semibold">absenteísmo, estresse e redução de produtividade</span>{' '}
            em sua equipe.
          </p>
        </div>
      </div>
    </section>
  );
}
