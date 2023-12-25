export type QueryItem = {
    item:AlgoliaItem
    algoliaUserToken:string
  }
  

  export type AlgoliaItem = {
    queryID:string
    objectID:string
    // filters?:string
    isSearch:boolean
    position:number

  }

  export type AlgoliaItems = {
    Items:AlgoliaItem[]
  }

  export type cartQuery = {
    algoliaUserToken:string
    Items:AlgoliaItem[]
  }
