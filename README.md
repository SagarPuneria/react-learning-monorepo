# React Learning Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A comprehensive **React learning monorepo** built with **Nx** featuring multiple applications demonstrating modern React development patterns, state management, routing, and UI component libraries.

## ⚛️ React vs Angular — My Understanding

| | **React** | **Angular** |
|---|---|---|
| **Type** | Library | Full-fledged Framework |
| **Language** | JavaScript (TypeScript optional) | TypeScript (mandatory) |
| **Learning Curve** | Easier to start | Steeper (JS + TS + framework concepts) |
| **Third-party libs** | You add as project grows | Mostly pre-bundled from day one |
| **Flexibility** | Very flexible, no strict rules | Strict conventions enforced |

**Key takeaways:**

- **React's ecosystem** (Redux, React Router, Axios, etc.) means you cherry-pick what you need, but that also means more decisions to make.
- **Angular's opinionated** nature is actually an advantage in large teams — everyone writes code the same way, making maintenance easier.

## 🚀 Applications Overview

This monorepo contains 5 React applications, each showcasing different concepts and technologies:

### 📝 Blog Platform (Port 4203)

**A feature-rich blogging platform with React Router v7**

- ✅ **React Router v7** - Declarative routing with loaders and error boundaries
- ✅ **Supabase Integration** - PostgreSQL database with RLS (Row Level Security)
- ✅ **RSuite UI Components** - Modern component library
- ✅ **Authentication & Authorization** - User management with protected routes
- ✅ **CRUD Operations** - Full blog post and comment management
- ✅ **Search & Filtering** - Advanced post filtering by tags and content
- ✅ **Responsive Design** - Tailwind CSS with mobile-first approach

```bash
npx nx serve blog-platform    # http://localhost:4203
```

### ✅ Task Tracker (Port 4201)

**A modern task management application**

- ✅ **React 19** - Latest React features with React Compiler optimizations
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **State Management** - Advanced useState patterns with local storage
- ✅ **RSuite Components** - Professional UI component library
- ✅ **Theme Support** - Light, dark, and high-contrast themes with persistence
- ✅ **Real-time Statistics** - Live task counts and progress tracking
- ✅ **Responsive Grid** - Mobile-optimized layouts with Tailwind CSS

```bash
npx nx serve task-tracker     # http://localhost:4201
```

### 📋 Feedback Form (Port 4202)

**A comprehensive multi-step feedback form application**

- ✅ **Multi-step Form** - Progressive form with validation at each step
- ✅ **Custom React Hooks** - Reusable form logic with hooks
- ✅ **Form Validation** - Real-time validation with error handling
- ✅ **Progress Tracking** - Visual progress indicator
- ✅ **Local Storage** - Form data persistence across sessions
- ✅ **RSuite Form Components** - Rich form controls and layouts
- ✅ **Debounced Input** - Optimized user input handling

```bash
npx nx serve feedback-form    # http://localhost:4202
```

### 🛍️ Product Catalog (Port 4204)

**Product catalog application (Ready for development)**

- 🔨 **Nx Generated Template** - Base setup ready for feature development
- 🎯 **Perfect for Learning** - Product listing, filtering, and detail pages
- 📦 **E-commerce Concepts** - Shopping cart, product search, categories
- 💡 **Future Features** - Product management, inventory tracking

```bash
npx nx serve product-catalog  # http://localhost:4204
```

### 🛒 E-commerce Platform (Port 4205)

**E-commerce platform application (Ready for development)**

- 🔨 **Nx Generated Template** - Base setup ready for feature development
- 🎯 **Perfect for Learning** - Order management, payment processing
- 🛍️ **E-commerce Flow** - Shopping cart, checkout, user accounts
- 💡 **Future Features** - Payment integration, order tracking, analytics

```bash
npx nx serve ecommerce-platform  # http://localhost:4205
```

## 🛠️ Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd react-learning-monorepo
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

### Running Applications

**Start a specific application:**

```bash
# Blog Platform (Full-featured)
npx nx serve blog-platform

# Task Tracker (Complete)
npx nx serve task-tracker

# Feedback Form (Multi-step form)
npx nx serve feedback-form

# Product Catalog (Template)
npx nx serve product-catalog

# E-commerce Platform (Template)
npx nx serve ecommerce-platform
```

**Start all applications simultaneously:**

```bash
npx nx run-many --target=serve --projects=blog-platform,task-tracker,feedback-form,product-catalog,ecommerce-platform --parallel
```

**View dependency graph:**

```bash
npx nx graph
```

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve react-learning-monorepo
```

To create a production bundle:

```sh
npx nx build react-learning-monorepo
```

To see all available targets to run for a project, run:

```sh
npx nx show project react-learning-monorepo
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
