import { useIntl } from 'react-intl'

export type ListOption = {
  id: number
  content: string
}

export const useListOptions = () => {
  const intl = useIntl()

  const LIST_OPTIONS: ListOption[] = [
    {
      id: 1,
      content: intl.formatMessage({ id: 'businessProgram.listOption1' }),
    },
    {
      id: 2,
      content: intl.formatMessage({ id: 'businessProgram.listOption2' }),
    },
    {
      id: 3,
      content: intl.formatMessage({ id: 'businessProgram.listOption3' }),
    },
    {
      id: 4,
      content: intl.formatMessage({ id: 'businessProgram.listOption4' }),
    },
    {
      id: 5,
      content: intl.formatMessage({ id: 'businessProgram.listOption5' }),
    },
    {
      id: 6,
      content: intl.formatMessage({ id: 'businessProgram.listOption6' }),
    },
  ]

  return LIST_OPTIONS
}
