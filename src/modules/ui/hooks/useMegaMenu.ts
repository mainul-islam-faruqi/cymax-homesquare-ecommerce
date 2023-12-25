import {
  BoxProps,
  LinkProps,
  useDisclosure,
  usePrefersReducedMotion
} from '@chakra-ui/react'
import { MotionProps } from 'framer-motion'
import { SyntheticEvent, useCallback } from 'react'
type UseMegaMenuParams = {
  item: { href: string; hasChildren?: boolean }
  routerPush: (href: string) => void
}
type UseMegaMenuContent<T> = {
  rootProps: BoxProps
  linkProps: LinkProps
  childrenLinkProps: LinkProps
  motionProps: MotionProps
  reducedMotion: boolean
  renderContent: boolean
  onToggle: () => void
}
export function useMegaMenu<T>({
  routerPush,
  item,
}: UseMegaMenuParams): UseMegaMenuContent<T> {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const { href, hasChildren } = item
  const handleBlur = useCallback(
    // https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    (e: SyntheticEvent) => {
      const currentTarget = e.currentTarget
      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          onClose()
        }
      })
    },
    [onClose]
  )
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // On the Desktop MegaMenu, close the menu after click
    onToggle()
  }
  return {
    rootProps: {
      onMouseLeave: () => onClose(),
      onBlur: handleBlur,
    },
    linkProps: {
      onMouseEnter: () => onOpen(),
      onClick: handleLinkClick,
      onKeyDown: (e) => {
        if (e.code === 'Enter') {
          e.preventDefault()
          if (isOpen || !hasChildren) {
            href && routerPush(href)
          }
          onToggle()
        }
        if (e.code === 'Space') {
          e.preventDefault()
          onToggle()
        }
        if (e.code === 'Escape') {
          onClose()
        }
      },
      'aria-haspopup': hasChildren,
    },
    childrenLinkProps: {
      onClick: handleLinkClick,
      onKeyDown: (e) => {
        if (['Enter', 'Space', 'Escape'].includes(e.code)) {
          onToggle()
        }
      },
    },
    reducedMotion: prefersReducedMotion,
    renderContent: Boolean(isOpen && hasChildren),
    motionProps: getMotionProps(prefersReducedMotion),
    onToggle,
  }
}
const getMotionProps = (reducedMotion?: boolean): MotionProps => {
  const props: MotionProps = {
    style: {
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      transformOrigin: '50% 0',
    },
  }
  if (!reducedMotion) {
    props.initial = {
      opacity: 0,
      scaleY: 0.95,
    }
    props.animate = {
      opacity: 1,
      scaleY: 1,
    }
    props.exit = {
      opacity: 0,
    }
  }
  return props
}
