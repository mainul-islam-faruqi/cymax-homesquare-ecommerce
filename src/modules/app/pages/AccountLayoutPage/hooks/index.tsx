import { paths } from '@modules/app/paths'
import { BiHomeAlt } from 'react-icons/bi'
import { useIntl } from 'react-intl'
import { NavMenuOption } from '../types'

export const useNavMenuOptions = () => {
  const intl = useIntl()

  const profile = intl.formatMessage({ id: 'profile.navMenu.profile' })
  const addresses = intl.formatMessage({ id: 'profile.navMenu.addresses' })
  const myOrders = intl.formatMessage({ id: 'profile.navMenu.myOrders' })

  const navMenuOptions: NavMenuOption[] = [
    // {
    //   id: 0,
    //   label: profile,
    //   icon: BiUser,
    //   url: paths.ACCOUNT_ADDRESS,
    // },

    {
      id: 0,
      label: addresses,
      icon: BiHomeAlt,
      url: paths.ACCOUNT_ADDRESS,
    },
    // {
    //   id: 2,
    //   label: myOrders,
    //   icon: BsBoxSeam,
    //   url: '/account/my-orders',
    // },
  ]

  const findSelectedOption = (url: string) => {
    const selectedOption: NavMenuOption | undefined = navMenuOptions.find(
      (option) => option.url === url
    )
    return selectedOption ? selectedOption.label : null
  }

  return { navMenuOptions, findSelectedOption }
}
