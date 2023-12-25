export interface EpGetNodeDataInterface {
  data: EpGetNodeDataInterfaceData
  links: EpGetNodeDataInterfaceLinks
}

export interface EpGetNodeDataInterfaceData {
  id: string
  type: string
  attributes: Attributes
  meta: Meta
  relationships: Relationships
}

export interface Attributes {
  created_at: Date
  description: string
  name: string
  slug: string
  updated_at: Date
  published_at: Date
}

export interface Meta {
  bread_crumb: string[]
}

export interface Relationships {
  children: Children
  hierarchy: Hierarchy
  parent: Hierarchy
  products: Children
}

export interface Children {
  links: ChildrenLinks
}

export interface ChildrenLinks {
  related: string
}

export interface Hierarchy {
  data: HierarchyData
  links: ChildrenLinks
}

export interface HierarchyData {
  id: string
  type: string
}

export interface EpGetNodeDataInterfaceLinks {
  self: string
}
