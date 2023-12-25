import { Flex } from '@chakra-ui/react'
import { MegaMenuItem as MegaMenuItemType } from '@modules/contentful/utils'
import React from 'react'
import { MegaMenuItem } from './MegaMenuItem'

export const MegaMenu = ({ data }: any) => {
  return (
    <Flex
      width="100%"
      zIndex="2"
      justifyContent="center"
      bg="white"
      borderBottom="1px"
      borderBottomColor="shading.200"
    >
      {React.Children.toArray(
        data?.map((item: MegaMenuItemType) => (
          // eslint-disable-next-line react/jsx-key
          <MegaMenuItem item={item} />
        ))
      )}
    </Flex>
  )
}
