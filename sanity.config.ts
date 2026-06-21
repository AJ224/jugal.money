import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'jugal-money',
  title: 'Jugal Money',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: process.env.SANITY_STUDIO_API_VERSION || '2024-01-01',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
