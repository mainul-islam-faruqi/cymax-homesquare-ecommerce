import { EpNodeInterface } from '@myplanetdigital/elasticpath'

export interface EpNodeAttributes {
  description: string
  name: string
  slug: string
  created_at: string
  published_at: string
  updated_at: string
}

export interface EpNodeRelationships {
  hierarchy: {
    data: EpNodeInterface
  }
  parent: {
    data: EpNodeInterface
  }
  children: {
    data: EpNodeInterface
  }
}
export interface EpNodeWithRelationships {
  id: string
  name?: string
  slug?: string
  description?: string
  type: 'node'
  attributes?: EpNodeAttributes
  relationships: EpNodeRelationships
  children: EpNodeWithRelationships
}

export interface NodeHashTable {
  [key: string]: EpNodeWithRelationships
}
