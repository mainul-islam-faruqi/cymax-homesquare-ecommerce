import dynamic from 'next/dynamic'
import { AccountLayoutPageProps } from '../AccountLayoutPage/types'

const DynamicAccountLayoutPage = dynamic<AccountLayoutPageProps>(
  () => import('../AccountLayoutPage').then((res) => res.AccountLayoutPage),
  { ssr: false }
)

export const AccountMyOrdersPage = () => {
  return <DynamicAccountLayoutPage>my orders</DynamicAccountLayoutPage>
}
