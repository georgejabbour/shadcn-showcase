# Shadcn UI Showcase & Theme Generator

A powerful tool for generating, customizing, and previewing shadcn/ui component themes. This application allows you to create beautiful color palettes for your shadcn/ui projects with an intuitive interface.

![Shadcn UI Showcase](https://github.com/yourusername/shadcn-showcase/assets/yourusername/shadcn-showcase.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
  - [Color Palette Generator](#color-palette-generator)
  - [Theme Customizer](#theme-customizer)
  - [Palette Management](#palette-management)
  - [Component Showcase](#component-showcase)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Color Palette Generator**: Generate complete shadcn/ui color palettes from a single primary color or duotone combination
- **Theme Customizer**: Fine-tune individual color values with intuitive color pickers
- **Palette Management**:
  - Save palettes to local storage
  - Export palettes as JSON
  - Import palettes from JSON files
  - Manage saved palettes
- **Component Showcase**: Preview sample shadcn/ui components with your custom theme in real-time
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light mode to preview your theme in both contexts

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Local Storage**: [Dexie.js](https://dexie.org/) (IndexedDB)
- **Color Manipulation**: [react-colorful](https://github.com/omgovich/react-colorful)
- **Charts**: [Recharts](https://recharts.org/)
- **TypeScript**: For type safety and better developer experience

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/georgejabbour/shadcn-showcase.git
cd shadcn-showcase
```

2. Install dependencies:

```bash
pnpm install
```

### Running the Application

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

Other available scripts:

```bash
# Build the application for production
pnpm build

# Start the production server
pnpm start

# Run linting
pnpm lint
```

## Usage

### Color Palette Generator

The Color Palette Generator allows you to create complete shadcn/ui color palettes from a single primary color or a duotone combination.

1. Choose between Single Color or Duotone mode
2. Select your primary color (and secondary color for duotone)
3. Click "Generate Palette" to create a complete color palette
4. Click "Apply Palette" to apply it to the showcase

### Theme Customizer

The Theme Customizer provides fine-grained control over individual color values:

1. Use the color pickers to adjust specific colors in your theme
2. Modify border radius to customize component shapes
3. See changes reflected in real-time across all components

### Palette Management

The Palette Manager allows you to save and reuse your favorite themes:

1. **Save Palettes**: Give your palette a name and save it to local storage
2. **Load Palettes**: Apply previously saved palettes with a single click
3. **Export Palettes**: Download your palette as a JSON file for sharing or backup
4. **Import Palettes**: Upload JSON palettes created by you or others

### Component Showcase

The Component Showcase displays sample shadcn/ui components with your custom theme:

1. Browse through different component categories
2. See how your theme affects various component states (hover, focus, disabled)
3. Toggle between dark and light mode to preview both themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.