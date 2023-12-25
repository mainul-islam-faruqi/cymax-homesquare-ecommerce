import { Box, Text, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export const PreviewBanner: FunctionComponent = () => {
  const exitPreview = () => {
    fetch('/api/preview-disable').then(() => {
      window.location.reload()
    })
  }

  return (
    <Box
      w="100%"
      textAlign="center"
      color="shading.900"
      p="2"
      backgroundColor="accent.100"
    >
      <Text as="p" display="inline-block">
        You are in a preview mode!
      </Text>
      <Button
        variant="solid"
        mx="2"
        my="auto"
        display="inline-block"
        onClick={() => exitPreview()}
      >
        Exit Preview
      </Button>
    </Box>
  )
}
