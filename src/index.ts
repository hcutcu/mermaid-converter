import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function convertMermaidToPNG(inputFile: string, outputFile: string): Promise<void> {
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

    // Convert Mermaid to PNG using the CLI
    const command = `npx mmdc -i ${tempFile} -o ${outputFile} -b transparent`;
    
    await execPromise(command);

    // Clean up the temporary file
    await fs.unlink(tempFile);

    console.log(`Mermaid diagram saved as PNG: ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage example
const inputMarkdownFile = path.join(__dirname, '..', 'input.md');
const outputPNGFile = path.join(__dirname, '..', 'output.png');

convertMermaidToPNG(inputMarkdownFile, outputPNGFile);