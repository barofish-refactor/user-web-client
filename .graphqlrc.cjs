/** @type {import('@graphql-codegen/cli').CodegenConfig} */
module.exports = {
  schema: 'https://apo.itez.io/work/graphql',
  documents: 'src/api/documents/**/*.{ts,tsx,gql}',
  ignoreNoDocuments: true,
  extensions: {
    codegen: {
      generates: {
        'src/api/gql/': {
          preset: 'client',
          presetConfig: {
            fragmentMasking: false,
          },
          plugins: [],
          config: {
            enumsAsTypes: true,
            scalars: {
              BigInt: 'string',
              FileUri: 'string',
              DateTime: 'string',
              Upload: 'File',
            },
          },
        },
      },
    },
  },
};
