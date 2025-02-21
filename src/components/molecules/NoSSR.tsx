import { ReactNode, useEffect, useLayoutEffect, useState } from 'react'

const DefaultOnSSR: React.FC = () => null

export const NoSSR: React.FC<{ children: ReactNode; onSSR?: ReactNode }> = ({ children, onSSR = <DefaultOnSSR /> }) => {
  const [onBrowser, setOnBrowser] = useState(false)
  useEffect(() => {
    setOnBrowser(true)
  }, [])
  return <>{onBrowser ? children : onSSR}</>
}