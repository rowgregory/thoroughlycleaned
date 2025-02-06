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
import LoadingScreen from './components/app/LoadingScreen'
import HeaderFixed from './components/header/HeaderFixed'
import { setPhotoGalleryImages, setProjects } from './redux/features/photoGallerySlice'
import { setServices } from './redux/features/serviceSlice'
import { setTeamMembers } from './redux/features/teamMemberSlice'
import { setTestimonials } from './redux/features/testimonialSlice'
import { setTextBlocks } from './redux/features/textBlockSlice'
import Banner from './components/home/Banner'
import LogoCoolGraySVG from './icons/LogoCoolGraySVG'

const PageWrapper: FC<ClientPageProps> = ({ children, data }) => {
  const { mediaData, openModalImageUploaderPublic, openModalEditableVideoPublic, openModalEditableTextAreaPublic } = useAppSelector(
    (state: RootState) => state.app
  )
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const path = useCustomPathname()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthState({ isAuthenticated: data.isAuthenticated, userId: data.userId, role: data.role }))
    dispatch(setPhotoGalleryImages(data?.data?.photoGalleryImages))
    dispatch(setServices(data?.data?.services))
    dispatch(setTeamMembers(data?.data?.teamMembers))
    dispatch(setTestimonials(data?.data?.testimonials))
    dispatch(setTextBlocks(data?.data?.transformedTextBlocks))
    dispatch(setProjects(data?.data?.projects))
  }, [dispatch, data])
  const isHome = path === '/'

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
      <NavigationDrawer textBlockMap={textBlockMap || data?.data?.transformedTextBlocks} />
      {!shouldExcludePath(path) && <HeaderFixed textBlockMap={textBlockMap || data?.data?.transformedTextBlocks} />}
      {!shouldExcludePath(path) && <AdminDashboardButton url="/admin/services" />}
      {!shouldExcludePath(path) && <Header />}
      <main>
        {isHome && <Banner textBlockMap={textBlockMap || data?.data?.transformedTextBlocks} />}
        {!isHome && !shouldExcludePath(path) && (
          <div
            className="h-[425px] w-full bg-coolGray bg-repear bg-center flex items-center justify-center"
            style={{ backgroundImage: `url('/images/pattern2.png')` }}
          >
            <div className="max-h-80 h-full">
              <LogoCoolGraySVG />
            </div>
          </div>
        )}
        {children}
      </main>
      {!shouldExcludePath(path) && <Footer />}
    </>
  )
}

export default PageWrapper
