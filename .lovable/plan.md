
## Plano: Adicionar Botão "Área do Cliente" no Header

### Objetivo
Adicionar um botão no header que redireciona para o portal do cliente Juripass em uma nova aba, permitindo acesso rápido à área do cliente.

---

### Arquivo a modificar

**`src/components/home/HomeHeader.tsx`**

---

### Alterações

#### 1. Importar ícone (opcional, mas recomendado)
Adicionar o ícone `ExternalLink` ou `User` do lucide-react para indicar visualmente que é um link externo ou área de usuário:

```tsx
import { Menu, X, ExternalLink } from 'lucide-react';
```

#### 2. Atualizar área de botões no Desktop (linhas 58-66)
Modificar a div de CTA para incluir dois botões lado a lado:

```tsx
{/* CTA Buttons */}
<div className="hidden md:flex items-center gap-3">
  <Button
    size="sm"
    variant="outline"
    asChild
  >
    <a href="https://portaljuripass.lovable.app" target="_blank" rel="noopener noreferrer">
      <ExternalLink className="h-4 w-4 mr-1" />
      Área do Cliente
    </a>
  </Button>
  <Button
    size="sm"
    onClick={() => scrollToSection('contato')}
  >
    Solicitar Proposta
  </Button>
</div>
```

#### 3. Atualizar Menu Mobile (linhas 116-124)
Adicionar o botão "Área do Cliente" no menu mobile antes do "Solicitar Proposta":

```tsx
<div className="pt-2 border-t border-border flex flex-col gap-2">
  <Button
    size="sm"
    variant="outline"
    asChild
    className="w-full"
  >
    <a href="https://portaljuripass.lovable.app" target="_blank" rel="noopener noreferrer">
      <ExternalLink className="h-4 w-4 mr-1" />
      Área do Cliente
    </a>
  </Button>
  <Button
    size="sm"
    onClick={() => scrollToSection('contato')}
    className="w-full"
  >
    Solicitar Proposta
  </Button>
</div>
```

---

### Resultado Visual

| Elemento | Antes | Depois |
|----------|-------|--------|
| Desktop | 1 botão CTA | 2 botões: "Área do Cliente" (outline) + "Solicitar Proposta" (primary) |
| Mobile | 1 botão CTA | 2 botões empilhados |

---

### Detalhes Técnicos

- **`asChild`**: Permite que o `Button` renderize como `<a>` mantendo os estilos
- **`target="_blank"`**: Abre em nova aba
- **`rel="noopener noreferrer"`**: Segurança para links externos
- **Ícone `ExternalLink`**: Indica visualmente que é um link externo
- **`variant="outline"`**: Diferencia visualmente do botão principal de proposta
