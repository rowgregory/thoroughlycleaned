'use client'

import React, { FC, useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from './redux/store'
import Header from './components/header/Header'
import { ClientPageProps } from './types/common.types'
import PublicImageUploaderModal from './modals/PublicImageUploaderModal'
import PublicEditableTextAreaModal from './modals/PublicEditableTextAreaModal'
import { shouldExcludePath } from './utils/string.functions'
import useCustomPathname from './hooks/useCustomPathname'
import PublicVideoUploaderModal from './modals/PublicVideoUploaderModal'
import Footer from './components/footer/Footer'
import NavigationDrawer from './components/app/NavigationDrawer'
import { setAuthState } from './redux/features/authSlice'
import AdminDashboardButton from './components/common/AdminDashboardButton'
import { useFetchHeaderAndFooterTextBlocksQuery } from './redux/services/textBlockApi'
import LoadingScreen from './components/app/LoadingScreen'

const PageWrapper: FC<ClientPageProps> = ({ children, data }) => {
  const { mediaData, openModalImageUploaderPublic, openModalEditableVideoPublic, openModalEditableTextAreaPublic } = useAppSelector(
    (state: RootState) => state.app
  )
  const path = useCustomPathname()
  const dispatch = useAppDispatch()
  const { data: textBlockMap, isLoading } = useFetchHeaderAndFooterTextBlocksQuery(undefined, {
    skip: ['admin', 'auth'].some((keyword) => path.includes(keyword))
  })

  useEffect(() => {
    dispatch(setAuthState(data))
  }, [dispatch, data])

  return (
    <>
      <LoadingScreen />
      {openModalImageUploaderPublic && (
        <PublicImageUploaderModal
          show={openModalImageUploaderPublic}
          src={mediaData.src}
          type={mediaData.type}
          textBlockKey={mediaData.textBlockKey}
        />
      )}
      {openModalEditableVideoPublic && (
        <PublicVideoUploaderModal
          show={openModalEditableVideoPublic}
          src={mediaData.src}
          type={mediaData.type}
          textBlockKey={mediaData.textBlockKey}
        />
      )}
      {openModalEditableTextAreaPublic && (
        <PublicEditableTextAreaModal
          show={openModalEditableTextAreaPublic}
          initialValue={mediaData.initialValue}
          type={mediaData.type}
          textBlockKey={mediaData.textBlockKey}
        />
      )}
      <NavigationDrawer textBlockMap={textBlockMap} />
      {!shouldExcludePath(path) && <AdminDashboardButton url="/admin/services" />}
      {!shouldExcludePath(path) && <Header textBlockMap={textBlockMap} isLoading={isLoading} />}
      <main>{children}</main>
      {!shouldExcludePath(path) && <Footer textBlockMap={textBlockMap} isLoading={isLoading} />}
    </>
  )
}

export default PageWrapper
