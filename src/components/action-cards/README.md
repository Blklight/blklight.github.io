# Action Cards

Componentes de cards interativos com suporte a expansão e flip 3D.

## Instalação

Importe do índice:

```tsx
import {
  ActionCard,
  ActionCardProvider,
  ActionCardHeader,
  ActionCardContent,
  ActionCardFooter,
} from "@/components/action-cards"
```

## Quick Start

```tsx
<ActionCardProvider>
  <ActionCard id="card-1" url="/page">
    <ActionCardHeader badge="Novo" title="Meu Card" />
    <ActionCardContent description="Descrição do card" />
    <ActionCardFooter label="Ação" />
  </ActionCard>
</ActionCardProvider>
```

---

## Provider

Wrap seus cards com o Provider para gerenciar estado ativo.

```tsx
<ActionCardProvider>
  {/* cards aqui */}
</ActionCardProvider>
```

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|------------|
| `multiple` | `boolean` | `false` | Permite múltiplos cards ativos |
| `defaultActiveId` | `string \| null` | `null` | Card ativo inicialmente |

### Hook

```tsx
const { activeCardId, setActiveCardId, isActive } = useActionCard()
```

---

## ActionCard

Card interativo que expande ao ser clicado.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|------------|
| `id` | `string` | - | **Obrigatório**. Identificador único |
| `url` | `string` | - | Navegação quando ativo |
| `onAction` | `() => void` | - | Callback personalizado |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `skeleton` | `boolean` | `false` | Estado de loading |
| `flip` | `boolean` | `false` | Habilita modo flip 3D |
| `className` | `string` | - | Classes extras |
| `styles` | `object` | - | Estilos customizados |

---

## Sub-componentes

### ActionCardHeader

```tsx
<ActionCardHeader 
  badge="Etiqueta"
  title="Título"
  badgeClassName="..."
  titleClassName="..."
/>
```

**Props:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `badge` | `string` | Texto da badge |
| `title` | `string` | Título do card |
| `badgeClassName` | `string` | Classes da badge |
| `titleClassName` | `string` | Classes do título |

### ActionCardContent

```tsx
<ActionCardContent 
  description="texto ou array"
  descriptionClassName="..."
/>
```

**Props:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `description` | `string \| string[]` | Descrição ou lista |
| `descriptionClassName` | `string` | Classes da descrição |
| `back` | `boolean` | Marca como conteúdo do verso (modo flip) |

### ActionCardFooter

```tsx
<ActionCardFooter 
  label="Texto do botão"
  url="/destino"
  onAction={() => {}}
  disabled={false}
  loading={false}
/>
```

**Props:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Texto do botão |
| `url` | `string` | Navegação |
| `onAction` | `() => void` | Callback |
| `disabled` | `boolean` | Desabilita botão |
| `loading` | `boolean` | Estado de loading |

---

## Exemplos

### Card Básico

```tsx
<ActionCardProvider>
  <ActionCard id="basic" url="/page">
    <ActionCardHeader badge="Novo" title="Card Básico" />
    <ActionCardContent description="Descrição do card" />
    <ActionCardFooter label="Ver mais" />
  </ActionCard>
</ActionCardProvider>
```

### Card com Lista

```tsx
<ActionCardProvider>
  <ActionCard id="list">
    <ActionCardHeader badge="Lista" title="Itens" />
    <ActionCardContent 
      description={[
        "Item 1",
        "Item 2", 
        "Item 3"
      ]} 
    />
    <ActionCardFooter label="Executar" />
  </ActionCard>
</ActionCardProvider>
```

### Card com Callback

```tsx
<ActionCardProvider>
  <ActionCard id="callback" onAction={() => console.log('clique!')}>
    <ActionCardHeader badge="Botão" title="Callback" />
    <ActionCardContent description="Clique no botão" />
    <ActionCardFooter label="Executar" />
  </ActionCard>
</ActionCardProvider>
```

### Card Skeleton (Loading)

```tsx
<ActionCardProvider>
  <ActionCard id="skeleton" skeleton>
    <ActionCardHeader badge="Carregando" title="Aguarde" />
    <ActionCardContent description="Carregando conteúdo..." />
  </ActionCard>
</ActionCardProvider>
```

### Múltiplos Cards Ativos

```tsx
<ActionCardProvider multiple>
  <div className="grid grid-cols-3 gap-4">
    <ActionCard id="card-1" url="/page1">
      <ActionCardHeader badge="Novo" title="Card 1" />
      <ActionCardContent description="Descrição 1" />
      <ActionCardFooter label="Ver mais" />
    </ActionCard>

    <ActionCard id="card-2" url="/page2">
      <ActionCardHeader badge="Novo" title="Card 2" />
      <ActionCardContent description="Descrição 2" />
      <ActionCardFooter label="Ver mais" />
    </ActionCard>
  </div>
</ActionCardProvider>
```

### Card com Flip (3D)

```tsx
<ActionCardProvider>
  <ActionCard id="flip" flip>
    {/* Conteúdo da Frente */}
    <ActionCardContent>
      <ActionCardHeader badge="Frente" title="Card Flip" />
      <ActionCardContent description="Clique no botão para virar" />
    </ActionCardContent>
    
    {/* Conteúdo do Verso */}
    <ActionCardContent back>
      <h3 className="font-bold mb-2">Conteúdo do Verso</h3>
      <p>Informações adicionais aqui...</p>
    </ActionCardContent>
    
    <ActionCardFooter label="Virar" />
  </ActionCard>
</ActionCardProvider>
```

### Card Flip com children

```tsx
<ActionCardProvider>
  <ActionCard id="flip-custom" flip>
    <ActionCardContent>
      <ActionCardHeader badge="Frente" title="Card Flip" />
      <p>Descrição da frente</p>
    </ActionCardContent>
    
    <ActionCardContent back>
      <p>Conteúdo do verso</p>
      <p>Mais conteúdo...</p>
    </ActionCardContent>
  </ActionCard>
</ActionCardProvider>
```

---

## Estilos Customizados

Use o objeto `styles` para estilização:

```tsx
<ActionCard
  id="styled"
  styles={{
    card: "bg-primary/10 border-primary",
    content: "bg-muted/50",
    badge: "bg-primary text-primary-foreground",
    title: "text-primary",
    description: "text-muted-foreground",
    button: "bg-primary hover:bg-primary/90"
  }}
>
  <ActionCardHeader badge="Estilizado" title="Card Custom" />
  <ActionCardContent description="Descrição customizada" />
  <ActionCardFooter label="Ação" />
</ActionCard>
```

---

## ActionCardWrapper (Animações com Motion)

Wrapper com animações usando `motion/react`.

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|------------|
| `children` | `ReactNode` | - | Card a ser envolvido |
| `variants` | `"card" \| "grid"` | `"card"` | Tipo de variante de animação |
| `customVariants` | `Variants` | - | Variantes customizadas |
| `whileTap` | `boolean` | `true` | Animação ao clicar (scale 0.98) |
| `whileHover` | `boolean` | `false` | Animação ao hover (scale 1.02) |
| `initial` | `"initial" \| false` | `"initial"` | Estado inicial da animação |
| `animate` | `"in" \| false` | `"in"` | Estado de animação |

### Exemplos

#### Grid com animações

```tsx
import { motion } from "motion/react"
import { 
  ActionCard, 
  ActionCardProvider, 
  ActionCardHeader,
  ActionCardContent,
  ActionCardFooter,
  ActionCardWrapper,
  gridVariants 
} from "@/components/action-cards"

<ActionCardProvider>
  <motion.div 
    variants={gridVariants}
    initial="initial" 
    animate="in"
    className="grid grid-cols-3 gap-4"
  >
    <ActionCardWrapper variants="card">
      <ActionCard id="card-1" url="/page1">
        <ActionCardHeader badge="Novo" title="Card 1" />
        <ActionCardContent description="Descrição 1" />
        <ActionCardFooter label="Ver mais" />
      </ActionCard>
    </ActionCardWrapper>

    <ActionCardWrapper variants="card">
      <ActionCard id="card-2" url="/page2">
        <ActionCardHeader badge="Novo" title="Card 2" />
        <ActionCardContent description="Descrição 2" />
        <ActionCardFooter label="Ver mais" />
      </ActionCard>
    </ActionCardWrapper>
  </motion.div>
</ActionCardProvider>
```

#### Card individual com animação

```tsx
<ActionCardWrapper whileTap whileHover>
  <ActionCard id="card" url="/page">
    <ActionCardHeader badge="Novo" title="Card Animado" />
    <ActionCardContent description="Descrição" />
  </ActionCard>
</ActionCardWrapper>
```

---

## API Resumida

```tsx
// Imports
import {
  ActionCard,
  ActionCardProvider,
  ActionCardHeader,
  ActionCardContent,
  ActionCardFooter,
  ActionCardWrapper,
  cardVariants,
  gridVariants,
  useActionCard,
} from "@/components/action-cards"

// Uso básico
<ActionCardProvider>
  <ActionCard id="id" url="/page">
    <ActionCardHeader badge="" title="" />
    <ActionCardContent description="" />
    <ActionCardFooter label="" />
  </ActionCard>
</ActionCardProvider>

// Uso com flip
<ActionCardProvider>
  <ActionCard id="id" flip>
    <ActionCardContent>
      {/* frente */}
    </ActionCardContent>
    <ActionCardContent back>
      {/* verso */}
    </ActionCardContent>
    <ActionCardFooter label="" />
  </ActionCard>
</ActionCardProvider>

// Uso com animações
<ActionCardProvider>
  <motion.div variants={gridVariants} initial="initial" animate="in" className="grid grid-cols-3 gap-4">
    <ActionCardWrapper variants="card">
      <ActionCard id="id" url="/page">
        <ActionCardHeader badge="" title="" />
        <ActionCardContent description="" />
      </ActionCard>
    </ActionCardWrapper>
  </motion.div>
</ActionCardProvider>
```
