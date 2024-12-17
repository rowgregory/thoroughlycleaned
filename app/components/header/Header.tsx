import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import shouldExcludePath from '@/app/utils/shouldExcludePath'

const Header = () => {
  const pathname = useCustomPathname()
  return (
    <header className={`${shouldExcludePath(pathname) ? 'hidden' : 'block'} 990:bg-header`}>
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header
