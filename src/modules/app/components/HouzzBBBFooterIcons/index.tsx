import { Flex } from '@chakra-ui/react'
import { BBB_URL, NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app/constants'
import { CymaxHouzzBBBFooterIcons } from './CymaxHouzzBBBFooterIcons'
import { HomesquareHouzzBBBFooterIcons } from './HomesquareHouzzBBBFooterIcons'

export const HouzzBBBFooterIcons = () => {
  return (
    <Flex mt="mobile">
      {NEXT_PUBLIC_SITE_IDENTIFIER === 'homesquare' && (
        <HomesquareHouzzBBBFooterIcons />
      )}
      {NEXT_PUBLIC_SITE_IDENTIFIER === 'cymax' && BBB_URL && (
        <CymaxHouzzBBBFooterIcons />
      )}
    </Flex>
  )
}
