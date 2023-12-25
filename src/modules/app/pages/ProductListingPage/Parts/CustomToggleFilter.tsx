import { Switch } from '@chakra-ui/react'
import { ON_SALE_FILTER } from '@modules/algolia'
import { NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app'
import { useState } from 'react'
import { useToggleRefinement } from 'react-instantsearch-hooks'

export const CustomToggleFilter = () => {
  const [isChecked, setIsChecked] = useState(false)

  const { refine, createURL, value } = useToggleRefinement({
    attribute: ON_SALE_FILTER,
    on: true,
  })

  const handleChange = () => {
    setIsChecked(!isChecked)
    refine({ isRefined: isChecked })
  }

  const counted = value.count
  const isCymax = NEXT_PUBLIC_SITE_IDENTIFIER === 'cymax'

  return (
    <>
      <div>
        <Switch
          fontSize="base"
          isChecked={value.isRefined}
          onChange={handleChange}
          size="md"
          colorScheme={isCymax ? 'teal' : 'purple'}
          mb={[2]}
          data-insights-filter={ON_SALE_FILTER + ':' + isChecked}
        />
      </div>
    </>
  )
}
