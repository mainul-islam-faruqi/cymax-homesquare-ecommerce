import { Button, Divider, Flex, Text } from '@chakra-ui/react'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { clickEvent } from '@modules/gtm/clickEvent'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsTelephone } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { useIntl } from 'react-intl'

type QuestionsType = {
  phoneNumber: string
  emailContactUrl: string
  productId?: string
}

export const Questions = ({
  phoneNumber,
  emailContactUrl,
  productId,
}: QuestionsType) => {
  const intl = useIntl()
  const { asPath } = useRouter()
  const { token: csaToken } = useCsa()
  const subject = intl.formatMessage(
    {
      id: 'productDetailsPageQuestionsForm.subject',
    },
    {
      id: productId,
    }
  )
  const body = intl.formatMessage(
    {
      id: 'productDetailsPageQuestionsForm.body',
    },
    {
      id: productId,
    }
  )

  const handleClickEventGtm = (clickText: string) => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: asPath || '',
      section: intl.formatMessage({
        id: 'ariaLabel.productDetailsPageQuestions',
      }),
      clicktext: clickText,
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  return (
    <Flex direction="column" pb={8}>
      <Flex
        w="100%"
        mb={6}
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        flexFlow="wrap"
      >
        <Flex direction="column" mb={2} minW="130px">
          <Text as="p" pb={2} fontWeight="bold" fontSize="base">
            {intl.formatMessage({ id: 'productDetailsPageQuestions.title' })}
          </Text>
          <Text as="p" fontSize="sm" fontWeight="normal">
            {intl.formatMessage({
              id: 'productDetailsPageQuestions.contactUs',
            })}
          </Text>
          <Text as="p" fontSize="sm" fontWeight="normal">
            {intl.formatMessage({
              id: 'productDetailsPageQuestions.call',
            })}{' '}
            {phoneNumber}
          </Text>
        </Flex>
        <Flex gap={3.5} mt={1} w={{ base: '100%', md: 'fit-content' }}>
          <Link href={`tel:${phoneNumber}`} passHref target={'_blank'}>
            <Button
              as="a"
              h="40px"
              fontSize="sm"
              w={{ base: '100%', md: 'fit-content' }}
              variant="outline"
              onClick={() =>
                handleClickEventGtm(
                  intl.formatMessage({
                    id: 'productDetailsPageQuestions.callUs',
                  })
                )
              }
            >
              <BsTelephone size="14px" />
              <Text as="span" ml={2}>
                {intl.formatMessage({
                  id: 'productDetailsPageQuestions.callUs',
                })}
              </Text>
            </Button>
          </Link>
          <Link
            href={`mailto:${emailContactUrl}?subject=${subject}&body=${body}`}
            passHref
            target={'_blank'}
          >
            <Button
              as="a"
              h="40px"
              fontSize="sm"
              w={{ base: '100%', md: 'fit-content' }}
              variant="outline"
              onClick={() =>
                handleClickEventGtm(
                  intl.formatMessage({
                    id: 'productDetailsPageQuestions.sentEmail',
                  })
                )
              }
            >
              <FiMail size="15px" />
              <Text as="span" ml={2}>
                {intl.formatMessage({
                  id: 'productDetailsPageQuestions.sentEmail',
                })}
              </Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  )
}
