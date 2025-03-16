import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function convertMermaidToPNG(
  inputFile: string,
  outputFile: string,
  scale: number = 3, // Default scale factor
  backgroundColor: string = 'transparent'
): Promise<void> {
  try {
    // Read the Markdown file
    const mdContent = await fs.readFile(inputFile, 'utf-8');

    // Extract the Mermaid diagram
    const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/;
    const match = mdContent.match(mermaidRegex);

    if (!match) {
      throw new Error('No Mermaid diagram found in the Markdown file.');
    }

    const mermaidCode = match[1];

    // Create a temporary file for the Mermaid code
    const tempFile = path.join(__dirname, '..', 'temp_mermaid.mmd');
    await fs.writeFile(tempFile, mermaidCode);

    // Configuration for high-quality output
    const config = {
      theme: 'default',
      backgroundColor,
      scale, // Increase scale for higher resolution
      width: 1920, // Set base width
      height: 1080, // Set base height
    };

    // Create temporary config file
    const configFile = path.join(__dirname, '..', 'mermaid.config.json');
    await fs.writeFile(configFile, JSON.stringify(config));

    // Convert Mermaid to PNG using the CLI with enhanced settings
    const command = `npx mmdc \
      -i ${tempFile} \
      -o ${outputFile} \
      -c ${configFile} \
      -b transparent \
      --width ${config.width} \
      --height ${config.height} \
      --scale ${scale}`;

    await execPromise(command);

    // Clean up temporary files
    await Promise.all([fs.unlink(tempFile), fs.unlink(configFile)]);

    console.log(`High-resolution Mermaid diagram saved as PNG: ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage example
const inputMarkdownFile = path.join(__dirname, '..', 'input.md');
const outputPNGFile = path.join(__dirname, '..', 'output.png');

// Convert with custom settings
convertMermaidToPNG(
  inputMarkdownFile,
  outputPNGFile,
  3, // Higher scale factor for better quality
  'white' // Background color (optional)
).catch(console.error);

// You can also use default settings
// convertMermaidToPNG(inputMarkdownFile, outputPNGFile);
