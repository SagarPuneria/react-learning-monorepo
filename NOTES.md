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
- `product-catalog` - Added `"type": "module"` for consistency, updated Vite config with library aliases
- `feedback-form` - Added `"type": "module"` for consistency
- `blog-platform` - Added `"type": "module"` for consistency

## Vite Configuration

### Import Alias Setup

Updated Vite configs to properly resolve library imports:

```typescript
resolve: {
  alias: {
    '@react-learning-monorepo/utils': path.resolve(__dirname, '../../libs/utils/src/index.ts'),
    '@react-learning-monorepo/types': path.resolve(__dirname, '../../libs/types/src/index.ts'),
    '@react-learning-monorepo/hooks': path.resolve(__dirname, '../../libs/hooks/src/index.ts'),
    '@react-learning-monorepo/ui-components': path.resolve(__dirname, '../../libs/ui-components/src/index.ts'),
  },
}
```

This resolves module resolution issues during development by pointing directly to source files instead of built distribution files.

### Module Resolution Issues

If you encounter "Failed to resolve entry for package" errors:

1. **Check library build status** - Some libraries may need to be built first with `nx build [library-name]`
2. **Verify alias configuration** - Ensure Vite config includes proper path aliases to source files
3. **Use source file imports** - During development, point aliases to `/src/index.ts` rather than `/dist/index.js`
4. **Check package.json exports** - Ensure libraries have correct `main`, `module`, and `exports` fields

### Building Library Dependencies

When libraries reference each other or when `dist` folders don't exist, build the required libraries:

```bash
# Build utils library (creates dist folder with compiled output)
npx nx build utils

# Build types library (if it has a build target configured)
npx nx build types
```

**Note:** Some libraries like `types` may not have build targets and are used directly from source files. Check the library's project configuration to see available targets.

Example fix for product-catalog:
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@react-learning-monorepo/utils': path.resolve(__dirname, '../../libs/utils/src/index.ts'),
  },
}
```

## Troubleshooting

### Node.js Version Warning
You may see: "You are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+"

This is just a warning - the application still works. Consider upgrading to Node.js 22.12+ for better compatibility.

### Development Server Issues

**Product Catalog Service Resolution:**
- Fixed "Failed to resolve entry for package" errors by adding Vite aliases
- Development server now runs successfully at `http://localhost:4204/`
- Libraries are resolved from source files during development

**General Import Resolution:**
1. Check the alias configuration in `vite.config.ts`
2. Ensure all apps have `"type": "module"` in their `package.json`
3. Verify the library exports in `libs/*/src/index.ts`
4. Build libraries if needed: `nx build [library-name]`