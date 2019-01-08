const { FuseBox, WebIndexPlugin, CSSPlugin, Sparky, QuantumPlugin } = require('fuse-box');

Sparky.task('dev', ['copy-assets'], devServer);
Sparky.task('build', ['copy-assets'], buildProductionBundle);
Sparky.task('copy-assets', () => Sparky.src('assets/**/**.*', { base: './src' }).dest('./dist'));

function init(isProd) {
  return FuseBox.init({
    homeDir: 'src',
    target: 'browser@es5',
    output: 'dist/$name.js',
    useTypescriptCompiler: true,
    allowSyntheticDefaultImports: true,
    sourceMaps: !isProd,
    plugins: [
      WebIndexPlugin({ template: 'src/index.html' }),
      CSSPlugin(),
      isProd && QuantumPlugin(),
    ],
  });
}

function buildProductionBundle() {
  const fuse = init(true);
  fuse.bundle('app').instructions('>index.js');
  fuse.run();
}


function devServer() {
  const fuse = init(false);

  fuse.dev({
    fallback: "index.html",
  });

  fuse
    .bundle('app')
    .instructions(' > index.js')
    .hmr()
    .watch();

  fuse.run();
}
