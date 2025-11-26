# Technical Notes

## ES Module Configuration (`"type": "module"`)

### Why we added `"type": "module"` to all apps

Without consistent `"type": "module"` across all apps, Nx couldn't properly:

- **Resolve dependencies between projects** - Different module systems caused import/export resolution issues
- **Process the workspace project graph** - Nx needs consistent module patterns to understand project relationships
- **Handle module imports correctly** - Mixed CommonJS and ES module syntax created conflicts

Adding `"type": "module"` to all apps ensures they all follow the same module system, making the monorepo work smoothly with modern tooling.

### Benefits of ES Modules

1. **Native import/export syntax** - No transpilation needed for modern Node.js
2. **Better tree-shaking** - Bundlers can optimize unused code more effectively  
3. **Future-proof** - ES modules are the JavaScript standard
4. **Tool compatibility** - Works seamlessly with Vite, modern React, and Nx

### Affected Apps

- `task-tracker` - Already had ES modules configured
- `ecommerce-platform` - Added `"type": "module"` for consistency
- `product-catalog` - Added `"type": "module"` for consistency

## Vite Configuration

### Import Alias Setup

Updated Vite configs to properly resolve library imports:

```typescript
resolve: {
  alias: {
    '@libs/utils': path.resolve(__dirname, '../../libs/utils/src'),
    '@libs/hooks': path.resolve(__dirname, '../../libs/hooks/src'),
    '@libs/ui-components': path.resolve(__dirname, '../../libs/ui-components/src'),
    '@libs/types': path.resolve(__dirname, '../../libs/types/src'),
  },
}
```

This allows clean imports like:
```typescript
import { generateId } from '@libs/utils';
```

## Troubleshooting

### Node.js Version Warning
You may see: "You are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+"

This is just a warning - the application still works. Consider upgrading to Node.js 22.12+ for better compatibility.

### Module Resolution Issues
If you encounter import errors:
1. Check the alias configuration in `vite.config.ts`
2. Ensure all apps have `"type": "module"` in their `package.json`
3. Verify the library exports in `libs/*/src/index.ts`