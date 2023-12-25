import { Box, Flex, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { useGetCsaMember } from '@modules/app/pages/CsaLoginPage/hooks'
import { InputField } from '@myplanetdigital/ui'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

export const ProfileInformation = () => {
  const intl = useIntl()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { csaMember } = useGetCsaMember()

  const { register } = useForm<{ name: string; email: string }>()

  return (
    <>
      <Text
        as="h2"
        fontWeight={'bold'}
        fontSize={{ base: 'desktop.md', lg: 'desktop.lg' }}
        pb={5}
      >
        {intl.formatMessage({ id: 'profile.navMenu.profile' })}
      </Text>
      <Box bg="shading.100" paddingInline={6} paddingBlock={8}>
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          flexWrap={isMobile ? 'nowrap' : 'wrap'}
          alignItems={isMobile ? 'flex-start' : 'center'}
        >
          <Text
            as="h3"
            fontSize={{ base: 'mobile.sm', md: 'desktop.sm' }}
            fontWeight="bold"
            paddingRight={isMobile ? 0 : 48}
          >
            {intl.formatMessage({ id: 'csa.profileInformation' })}
          </Text>
        </Flex>

        <Text
          as="p"
          mt={3}
          fontSize={{ base: 'desktop.bodySM', md: 'desktop.body' }}
        >
          {intl.formatMessage({ id: 'csa.subtitle' })}
        </Text>

        <Box mt={7}>
          <Box as="form">
            <Stack
              spacing={5}
              direction="column"
              sx={{
                label: {
                  fontWeight: 'extrabold',
                  fontSize: 'desktop.body',
                },
                input: {
                  fontSize: 'desktop.body',
                  opacity: '.5',
                  bg: 'theme.muted',
                  color: 'shading.700',
                  _focus: {
                    borderColor: 'theme.muted',
                  },
                },
              }}
            >
              <Flex gap={4} flexDirection={isMobile ? 'column' : 'row'}>
                <InputField
                  label={intl.formatMessage({ id: 'csa.inputLabel.name' })}
                  inputProps={{
                    isReadOnly: true,
                    defaultValue: csaMember?.name,
                    ...register('name'),
                  }}
                />
                <InputField
                  label={intl.formatMessage({ id: 'csa.inputLabel.email' })}
                  inputProps={{
                    isReadOnly: true,
                    defaultValue: csaMember?.email,
                    ...register('email'),
                  }}
                />
              </Flex>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}
