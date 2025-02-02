import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import React, { FC } from 'react'
import ActionButton from './AdminActionButton'
import { openCreateApprovedUserModal } from '@/app/redux/features/approvedUserSlice'
import { setModalOpenServiceCreate } from '@/app/redux/features/serviceSlice'
import Link from 'next/link'
import { setOpenModalTestimonialCreate } from '@/app/redux/features/testimonialSlice'
import { openGalleryDetailsCreateModal } from '@/app/redux/features/photoGallerySlice'
import { setOpenModalProfileUpdate } from '@/app/redux/features/profileSlice'
import { setModalOpenTeamMemberCreate } from '@/app/redux/features/teamMemberSlice'

const commandAreaText = {
  APPROVED_USERS: {
    title: 'Manage Approved Users',
    p1: `This page allows the admin to manage approved users who can register an account and gain access to the backend. Add approved users by clicking on 'Add New User.' When a user registers with a matching phone number, their account will automatically link to the approved user, granting them access to the backend. Essentially, a 'linked' user means they have successfully registered and are now authorized to access the system.`,
    p2: 'You can also remove users from the list when necessary. Deleting a user will also delete their associated user record, preventing them from logging in. Logged-in users cannot delete their own approved user record. Please ensure that the information is entered accurately to prevent unauthorized access',
    func: openCreateApprovedUserModal()
  },
  SERVICES: {
    title: 'Services',
    p1: `Create and manage services to showcase on the Services page. You can categorize each service as Residential, Commercial, or Biohazard, ensuring it displays under the appropriate section for users to explore.`,
    func: setModalOpenServiceCreate(),
    link: '/services'
  },
  TESTIMONIALS: {
    title: 'Testimonials',
    p1: ` Share feedback from clients to showcase their experiences. Display testimonials to help future customers understand the value of your services.`,
    func: setOpenModalTestimonialCreate(),
    link: '/testimonials'
  },
  CLIENT_LEADS: {
    title: 'Client Leads',
    p1: `Below is the list of clients who have filled out the lead form, including their names, contact numbers, and the service they are interested in. Clicking the checkbox indicates whether you have contacted the client; a filled-in box means they have been contacted.`
  },
  PHOTO_GALLERY: {
    title: 'Photo Gallery',
    p1: `This page allows you to create albums for your projects and add before and after photo pairs to each album. You can easily manage your albums by uploading new images, deleting specific photo pairs, or removing entire albums, which will also delete all images within them.`,
    func: openGalleryDetailsCreateModal(),
    link: '/projects'
  },
  PROFILE: {
    title: 'Profile',
    p1: `This page allows you to manage your personal details and update your profile information. Any changes made here will also update the data in the linked approved user record. You can easily edit your name, contact details, and other relevant information. None of this information is public.`,
    func: setOpenModalProfileUpdate()
  },
  LINKED_USERS: {
    title: 'Linked Users',
    p1: ` This page shows users who have been approved and successfully created an account. Each user is linked to the original approved user confirming they've completed the registration steps. Only one user at a time receives text messages from the client lead form, ensuring the right person is contacted for follow-ups. You can easily manage and update which user is responsible for receiving these messages.`
  },
  LOGS: {
    title: 'Logs'
  },
  SYSTEM_STATUS: {
    title: 'Endpoint Status',
    p1: `This page checks if the key parts of your system are working correctly. It runs a series of tests on different features, like creating and updating records, to make sure everything is functioning as it should. If everything is working properly, it will show that the feature is operational. If there's an issue, it will indicate the failure and provide details on what went wrong. It's a quick way to check that all important components of your system are running smoothly and ready for use.`
  },
  TEAM_MEMBERS: {
    title: 'Team Members',
    p1: `The Team Members page allows you to view and manage the key individuals who are part of your organization. You can see important details about each team member, like their position, years worked, and contact information.`,
    func: setModalOpenTeamMemberCreate(),
    link: '/about'
  }
} as any

const AdminCommandArea: FC<{ type: string; btnText?: string }> = ({ type, btnText }) => {
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state: RootState) => state.profile)

  return (
    <div className="py-9 480:py-14 w-full flex flex-col">
      <div className="flex flex-col 1160:flex-row gap-y-16 1160:gap-x-16">
        <div className="flex flex-col w-full">
          <h1 className="text-5xl font-rubik font-medium text-white mb-6">{commandAreaText[type].title}</h1>
          <p className="text-[#b0b0b2] font-rubik font-light w-full 760:w-2/3 text-17 mb-2">{commandAreaText[type].p1}</p>
          {commandAreaText?.[type]?.p2 && (
            <p className="text-[#b0b0b2] font-rubik font-light w-full 760:w-2/3 text-17 mb-2">{commandAreaText?.[type]?.p2}</p>
          )}
          {commandAreaText?.[type]?.func && btnText && (
            <ActionButton text={btnText} onClick={() => dispatch(commandAreaText[type].func)} profile={profile} />
          )}
          {commandAreaText?.[type]?.link && (
            <div className="flex flex-col 760:flex-row 760:items-center gap-x-2 mt-5">
              <h3 className="text-sm font-rubik font-light text-[#b0b0b2] mb-2 760:mb-0">
                See how your {commandAreaText?.[type]?.title?.toLowerCase()} are displayed to customers on the public page.
              </h3>
              <Link
                href={commandAreaText?.[type]?.link}
                className={`font-rubik font-light text-sm w-fit`}
                style={{ color: profile?.colorCode || '#00c5d9' }}
              >
                View Public {commandAreaText?.[type]?.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminCommandArea
