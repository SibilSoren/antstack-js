import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ScaffoldOptions {
  projectName: string;
  framework: string;
  database: string;
  orm: string;
}

export async function scaffoldProject(targetDir: string, options: ScaffoldOptions) {
  const templateDir = path.resolve(__dirname, '../templates/base');
  
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  // 1. Create target directory
  await fs.ensureDir(targetDir);

  // 2. Copy base template files
  await fs.copy(templateDir, targetDir);

  // 3. Update package.json
  const pkgPath = path.join(targetDir, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = options.projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  // 4. Handle framework-specific files (to be implemented)
  // 5. Handle ORM/DB-specific files (to be implemented)
}
