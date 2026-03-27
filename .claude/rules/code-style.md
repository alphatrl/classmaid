---
description: Code style conventions for the classmaid project
paths: ["src/**/*.tsx", "src/**/*.ts"]
---

# Tailwind CSS Class Formatting

When Tailwind class strings exceed ~50-60 characters, use the `classnames` package to split them across multiple lines for readability.

**Short (inline is fine):**
```tsx
<div className="flex items-center gap-2 p-4" />
```

**Long (use classnames to split):**
```tsx
import classnames from 'classnames';

<div
  className={classnames(
    'flex items-center gap-2 p-4',
    'bg-white dark:bg-black rounded-xl',
    'hover:scale-105 transition-all duration-200'
  )}
/>
```

Group related utilities on the same line (e.g., layout together, colors together, interactive states together).
