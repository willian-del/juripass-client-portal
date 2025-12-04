

export function JuripassCardVisual() {
  return (
    <div className="relative w-full">
      {/* Card Container with 3D effect */}
      <div className="relative transform hover:scale-105 transition-transform duration-500 animate-fade-in">
        {/* Main Card */}
        <div className="relative aspect-[1.586/1] bg-gradient-to-br from-juripass-primary-dark via-juripass-primary to-juripass-primary-light rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* Chip */}
          <div className="absolute top-8 left-8 w-14 h-11 bg-gradient-to-br from-juripass-gold to-yellow-600 rounded-lg shadow-lg">
            <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-transparent rounded-md" />
          </div>

          {/* Logo Area */}
          <div className="absolute top-8 right-8">
            <img 
              src="/images/branding/juripass-icon-dark.png"
              alt="Juripass"
              className="h-10 object-contain drop-shadow-lg"
            />
          </div>

          {/* Card Info */}
          <div className="absolute bottom-8 left-8 right-8 space-y-3">
            <p className="text-white text-lg font-bold">
              João Silva Santos
            </p>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
                  Número
                </p>
                <p className="text-white text-sm font-mono font-bold">
                  **** **** 1234
                </p>
              </div>
              
              <div className="space-y-1 text-right">
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
                  Validade
                </p>
                <p className="text-white text-sm font-mono font-bold">
                  12/25
                </p>
              </div>
            </div>
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>

        {/* Shadow effects */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl scale-95 rounded-2xl" />
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
}
