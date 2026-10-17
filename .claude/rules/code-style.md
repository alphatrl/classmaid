---
description: Code style conventions for the classmaid project
paths: ["src/**/*.tsx", "src/**/*.ts"]
---

# Tailwind CSS Class Formatting

When Tailwind class strings exceed ~50-60 characters, use the `cn` helper from `@/lib/utils` (clsx + tailwind-merge) to split them across multiple lines for readability.

**Short (inline is fine):**
```tsx
<div className="flex items-center gap-2 p-4" />
```

**Long (use cn to split):**
```tsx
import { cn } from '@/lib/utils';

<div
  className={cn(
    'flex items-center gap-2 p-4',
    'bg-white dark:bg-black rounded-xl',
    'hover:scale-105 transition-all duration-200'
  )}
/>
```

Group related utilities on the same line (e.g., layout together, colors together, interactive states together).

`cn` also resolves conflicting Tailwind classes, so a `className` prop passed last overrides the defaults (e.g. `cn('p-4', className)` with `className="p-0"` yields `p-0`).
