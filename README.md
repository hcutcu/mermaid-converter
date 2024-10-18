# Mermaid Converter

This project provides a simple tool to convert Mermaid diagrams from Markdown files into PNG images. It uses the Mermaid CLI to extract diagrams from Markdown and generate high-quality PNG outputs.

## Features

- Converts Mermaid diagrams from a Markdown file into PNG images.
- Supports transparent backgrounds for the generated PNGs.
- Easy to use and customizable.

## Prerequisites

To use this tool, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/getting-started/install) as the package manager

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/mermaid-converter.git
```

2. Navigate to the project directory:

```bash
cd mermaid-converter
```

3. Install the dependencies:

```bash
npm install

or

yarn install

```

## Usage

Convert Mermaid Diagrams

1- Create a Markdown file (input.md) that contains your Mermaid diagram. Example:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

2. Use the convert script to extract and convert the diagram to a PNG:

```bash
npm run convert
```

This will convert the Mermaid diagram from input.md and save it as output.png in the project directory.

### Custom File Paths

To convert Markdown from a specific input file to a specific output file, you can modify the code in src/index.ts or run your custom command with the correct file paths.

### For example:

```js
const inputMarkdownFile = path.join(**dirname, 'path_to_your_input_file.md');
const outputPNGFile = path.join(**dirname, 'output_directory/output.png');

convertMermaidToPNG(inputMarkdownFile, outputPNGFile);
```

### Example

npm run convert

Project Structure

```bash
mermaid-converter/
├── dist/                # Compiled JavaScript files (after build)
├── src/                 # TypeScript source files
│   └── index.ts         # Main file for converting Mermaid to PNG
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
└── input.md             # Example input Markdown file with Mermaid diagram
```

### Build

To build the TypeScript project:

```bash
npm run build
```

The compiled JavaScript files will be available in the dist directory.

Dependencies

- @mermaid-js/mermaid-cli: Command-line interface for Mermaid, used for converting diagrams.
- typescript: A strongly typed programming language that builds on JavaScript, used in this project.
- ts-node: TypeScript execution environment and REPL for Node.js.

### License

This project is licensed under the ISC License.

### Author

This project was created by @hcutcu.
