import React from 'react'

interface LowStockAlertProps {
  stockAvailable: number
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ stockAvailable }) => {
  if (stockAvailable > 0 && stockAvailable < 10) {
    return (
      <div style={{ fontSize: '14px', color: '#e53e3e' }}>
        Only {stockAvailable} left in stock
      </div>
    )
  } else {
    return null
  }
}

export default LowStockAlert
