#!/usr/bin/env node
import { cac } from 'cac';
import chalk from 'chalk';
import { intro, outro, text, select, isCancel, cancel } from '@clack/prompts';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);
const { version } = packageJson;

const cli = cac('antstack');

const banner = `
 █████╗ ███╗   ██╗████████╗███████╗████████╗ █████╗  ██████╗██╗  ██╗
██╔══██╗████╗  ██║╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
███████║██╔██╗ ██║   ██║   ███████╗   ██║   ███████║██║     █████╔╝ 
██╔══██║██║╚██╗██║   ██║   ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ 
██║  ██║██║ ╚████║   ██║   ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`;

cli
  .command('[root]', 'Initialize a new backend project')
  .action(async (root) => {
    console.log(chalk.blue(banner));
    intro(`${chalk.bgBlue.white(' antstack-js ')} ${chalk.dim(`v${version}`)}`);

    const projectName = await text({
      message: 'What is your project name?',
      placeholder: root || 'my-antstack-app',
      initialValue: root,
      validate(value) {
        if (value.length === 0) return `Project name is required`;
      },
    });

    if (isCancel(projectName)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    const framework = (await select({
      message: 'Select a framework',
      options: [
        { value: 'express', label: 'Express', hint: 'Classic, flexible' },
        { value: 'hono', label: 'Hono', hint: 'Ultrafast, modern' },
        { value: 'fastify', label: 'Fastify', hint: 'Performance-focused' },
      ],
    })) as string;

    if (isCancel(framework)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    const database = (await select({
      message: 'Select a database',
      options: [
        { value: 'postgresql', label: 'PostgreSQL', hint: 'Relational' },
        { value: 'mongodb', label: 'MongoDB', hint: 'NoSQL' },
        { value: 'mysql', label: 'MySQL', hint: 'Relational' },
      ],
    })) as string;

    if (isCancel(database)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    const orm = (await select({
      message: 'Select an ORM',
      options: [
        { value: 'prisma', label: 'Prisma', hint: 'Typesafe, auto-generated client' },
        { value: 'drizzle', label: 'Drizzle', hint: 'Lightweight, SQL-like' },
      ],
    })) as string;

    if (isCancel(orm)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    outro(
      chalk.green(
        `Project ${projectName} is ready to be scaffolded with ${framework}, ${database}, and ${orm}!`
      )
    );
  });

cli.version(version);
cli.help();

try {
  cli.parse();
} catch (error) {
  console.error(chalk.red('\nAn error occurred:'));
  console.error(error);
  process.exit(1);
}
