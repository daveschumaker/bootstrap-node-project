import fs from 'fs'

const generateTsconfig = () => {
  const baseConfig = {
    compilerOptions: {
      module: 'commonjs',
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      target: 'es6',
      moduleResolution: 'node',
      skipLibCheck: true,
      sourceMap: true,
      outDir: 'dist'
    },
    include: ['src'],
    exclude: ['node_modules'],
    lib: ['es2015']
  }

  const formatJson = JSON.stringify(baseConfig, null, 2)
  fs.writeFileSync('./tsconfig.json', formatJson)
}

export default generateTsconfig
