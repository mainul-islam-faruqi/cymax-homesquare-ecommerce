import { FlexProps, Stack, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { CustomToggleFilter } from './CustomToggleFilter'

export const SaleToogleFilter: FunctionComponent<FlexProps> = (props) => {
  const intl = useIntl()

  return (
    <Stack direction="row" mr={2}>
      <Text
        fontSize={{ base: 'mobile.bodyXS', lg: 'base' }}
        fontWeight="normal"
        mb={[1]}
      >
        {intl.formatMessage({ id: 'category.refinements.on_sale' })}
      </Text>
      <CustomToggleFilter />
    </Stack>
  )
}
