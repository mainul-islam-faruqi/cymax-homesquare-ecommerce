import { GetStaticProps } from 'next'
import { PrivacyInformation } from '@modules/app'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

export default PrivacyInformation
