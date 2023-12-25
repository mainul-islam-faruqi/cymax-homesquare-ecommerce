import { AccountLayoutPage, paths } from '@modules/app'

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: paths.ACCOUNT_ADDRESS,
    },
    props: {},
  }
}

export default AccountLayoutPage
