import fsExtra from 'fs-extra';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync as nodeExistsSync } from 'node:fs';
import { select, isCancel, cancel, spinner } from '@clack/prompts';
import { execa } from 'execa';
import chalk from 'chalk';

const { copySync, readJsonSync, writeJsonSync, mkdirSync, existsSync } = fsExtra;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ProjectConfig {
  framework: 'express' | 'hono' | 'fastify';
  orm: 'prisma' | 'drizzle';
  database: string;
}

// type TestRunner = 'vitest' | 'jest';
const testRunner = 'vitest';

const getTestTemplateDir = () => {
  const paths = [
    join(__dirname, '../templates/modules/test'),       // dist/
    join(__dirname, '../../../templates/modules/test'), // src/commands/modules/
    join(__dirname, '../../templates/modules/test'),    // fallback
  ];
  for (const p of paths) {
    if (nodeExistsSync(p)) return p;
  }
  return paths[0]; // default
};

const getPackageManager = (projectDir: string): string => {
  if (nodeExistsSync(join(projectDir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (nodeExistsSync(join(projectDir, 'yarn.lock'))) return 'yarn';
  if (nodeExistsSync(join(projectDir, 'bun.lockb'))) return 'bun';
  
  // Check package.json
  try {
    const pkg = readJsonSync(join(projectDir, 'package.json'));
    if (pkg.packageManager) {
      if (pkg.packageManager.startsWith('pnpm')) return 'pnpm';
      if (pkg.packageManager.startsWith('yarn')) return 'yarn';
      if (pkg.packageManager.startsWith('bun')) return 'bun';
    }
  } catch (e) {}

  return 'npm';
};

async function installDependencies(projectDir: string) {
  const pm = getPackageManager(projectDir);
  const s = spinner();
  s.start(`Installing dependencies with ${pm}...`);
  
  try {
    await execa(pm, ['install'], { cwd: projectDir });
    s.stop(`Dependencies installed successfully with ${pm}!`);
  } catch (error) {
    s.stop(`Failed to install dependencies with ${pm}.`);
    console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
    console.log(chalk.yellow(`Please run '${pm} install' manually.`));
  }
}

export async function addTestModule(projectDir: string, config: ProjectConfig) {
  const templatesDir = getTestTemplateDir();
  
  // Create tests directory
  mkdirSync(join(projectDir, 'tests', 'integration'), { recursive: true });
  
  // Copy config file
  copySync(
    join(templatesDir, 'vitest.config.ts'),
    join(projectDir, 'vitest.config.ts')
  );
  
  // Copy framework-specific setup
  const setupSource = join(templatesDir, config.framework, testRunner, 'setup.ts');
  if (existsSync(setupSource)) {
    copySync(setupSource, join(projectDir, 'tests', 'setup.ts'));
  }
  
  // Update package.json
  const pkgPath = join(projectDir, 'package.json');
  const pkg = readJsonSync(pkgPath);
  
  pkg.devDependencies = {
    ...pkg.devDependencies,
    'vitest': '^3.0.0',
    'supertest': '^7.0.0',
    '@types/supertest': '^6.0.0',
  };
  pkg.scripts = {
    ...pkg.scripts,
    'test': 'vitest run',
    'test:watch': 'vitest',
    'test:coverage': 'vitest run --coverage',
  };
  
  // Store test runner choice for generate command
  pkg.kodkod = {
    ...pkg.kodkod,
    testRunner: 'vitest',
  };
  
  writeJsonSync(pkgPath, pkg, { spaces: 2 });

  // Install dependencies automatically
  await installDependencies(projectDir);
}
