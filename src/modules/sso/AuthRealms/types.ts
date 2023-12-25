export type authRealmsResponse = {
  data: {
    data: {
      id: string
      type: string
      relationships: {
        'authentication-realm': {
          data: {
            id: string
            type: string
            links: {
              self: string
            }
          }
        }
      }
      meta: {
        client_id: string
      }
    }
  }
}

export type authRealmsQueryResponse = {
  error: boolean | null
  data: authRealmsResponse['data'] | undefined
}
