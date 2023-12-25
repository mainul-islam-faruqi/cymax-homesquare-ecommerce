type AddCartItemType = {
  mutate: (params: {
    sku: string
    quantity?: number | undefined
  }) => Promise<void>
  isLoading: boolean
}

export interface ButtonsType {
  handleAddToCart: () => void
  addCartItem: AddCartItemType
}
