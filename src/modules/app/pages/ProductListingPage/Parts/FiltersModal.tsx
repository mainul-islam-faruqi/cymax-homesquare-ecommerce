import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FiltersIcon, PersistentModal as Modal } from '@myplanetdigital/ui'
import {
  useClearRefinements,
  useCurrentRefinements,
} from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { Filters } from './Filters'

export const FiltersModal = ({
  urlFilter,
  algoliaIndex,
  algoliaResults,
  uiState,
  routePattern,
}: {
  urlFilter?: string
  algoliaIndex: string
  uiState: any
  algoliaResults: any
  routePattern?: any
}) => {
  const intl = useIntl()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { refine: clearAllRefinements } = useClearRefinements()
  const { items } = useCurrentRefinements()
  const currentRefinementsCount = items.reduce(
    (prev, refinementAttribute) =>
      prev + refinementAttribute.refinements.length,
    0
  )

  return (
    <>
      <Text as="label" htmlFor="btnMmobileFilters" fontSize="sm">
        {intl.formatMessage({ id: 'category.filters.filter' })}
      </Text>
      <Button
        id="btnMmobileFilters"
        variant="outline"
        onClick={onOpen}
        rightIcon={<FiltersIcon color="gray.800" ml="auto" />}
        mt={2}
        iconSpacing="auto"
        w="100%"
        height={{ base: '32px', md: '40px' }}
        borderRadius={10}
        borderColor="shading.200"
        maxH="40px"
      >
        <Text
          fontWeight="normal"
          fontSize="base"
          width={'full'}
          textColor="theme.text"
          isTruncated
          align="left"
          noOfLines={1}
          color="gray.800"
        >
          {intl.formatMessage({ id: 'category.filters.filters' })}{' '}
          {currentRefinementsCount > 0 && `(${currentRefinementsCount})`}
        </Text>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="none"
        scrollBehavior="outside"
        size="full"
      >
        <ModalOverlay />
        <ModalContent m={0} rounded={0}>
          <ModalHeader
            textAlign="center"
            borderBottomStyle="solid"
            borderBottomWidth={1}
            borderBottomColor="gray.200"
            position="fixed"
            top={0}
            left={0}
            right={0}
            background="white.100"
            zIndex={2}
          >
            {intl.formatMessage({ id: 'category.filters.filter' })}
            <ModalCloseButton size="lg" left={'15px'} top={'15px'} />
          </ModalHeader>
          <ModalBody>
            <Spacer height={'62px'} />
            <Filters
              algoliaResults={algoliaResults}
              uiState={uiState}
              urlFilter={urlFilter ?? ''}
              algoliaIndex={algoliaIndex}
              routePattern={routePattern}
            />
          </ModalBody>

          <ModalFooter
            justifyContent={'space-around'}
            position={'relative'}
            bottom={0}
            left={0}
            right={0}
            background={'white.100'}
            borderColor={'shading.100'}
            borderTopWidth={1}
            boxShadow={'0px 8px 16px rgba(0, 0, 0, 0.2)'}
          >
            <Button
              onClick={clearAllRefinements}
              variant="outline"
              paddingY={6}
              paddingX={12}
              fontSize={'mobile.bodySM'}
            >
              {intl.formatMessage({ id: 'category.filters.action.clearAll' })}
            </Button>
            <Button
              border="dark.100"
              onClick={onClose}
              paddingY={6}
              paddingX={12}
              fontSize={'mobile.bodySM'}
            >
              {intl.formatMessage({ id: 'category.filters.apply' })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
