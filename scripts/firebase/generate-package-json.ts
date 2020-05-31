import path from 'path';
import { writeFile, emptyDir } from 'fs-extra';
import base, { name, version, engines, server } from '../../package.json';

const createServerPackageJson = () => {
  const dependencies = Object.entries(server.dependencies).reduce<Record<string, string>>((acc, [name, active]) => {
    const version = base.dependencies[name as keyof typeof base.dependencies];
    if (active && version) acc[name] = version;
    return acc;
  }, {});

  return { name, version, engines, ...server, dependencies };
};

const main = async (out: string) => {
  const content = JSON.stringify(createServerPackageJson(), null, '  ');
  const outPath = out.endsWith('.json') ? out : path.join(out, 'package.json');

  if (path.resolve(process.cwd(), outPath) === require.resolve('../../package.json')) {
    // eslint-disable-next-line no-console
    console.log('Generation Failed! You tried overwriting the source package.json');
    process.exit(1);
  }
  await emptyDir(path.dirname(outPath));
  await writeFile(outPath, content);
};

// Run only when this module is executed directly
if (process.mainModule === module) {
  main(process.argv[2]);
}
