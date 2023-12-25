import { ProductListingPage, ProductListingPageProps } from '@modules/app'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<
  ProductListingPageProps
> = async (context) => {
  const query: any = context.query
  return {
    props: {
      isSearchPage: true,
      query,
    },
  }
}

export default ProductListingPage
