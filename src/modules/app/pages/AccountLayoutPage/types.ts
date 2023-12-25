import React from 'react'
import { IconType } from 'react-icons'

export interface AccountLayoutPageProps {
  children: React.ReactNode
}
export interface NavMenuProps {
  navMenuOptions: NavMenuOption[]
  changeMenuOption: (value: string) => void
  currentOptionUrl: string
  selectedOption?: string | null
}

export interface NavMenuOption {
  id: number
  label: string
  icon: IconType
  url: string
}
