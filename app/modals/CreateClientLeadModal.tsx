import React, { FC } from 'react'
import { Inputs } from '../types/common.types'
import PublicModal from '../components/common/PublicModal'
import { timesIcon } from '../icons'
import AwesomeIcon from '../components/common/AwesomeIcon'
import Logo from '../components/common/Logo'

interface CreateClientLeadModalProps {
  show: boolean
  inputs: Inputs
  reset: () => void
  logoValue: string
}

const CreateClientLeadModal: FC<CreateClientLeadModalProps> = ({ show, inputs, reset, logoValue }) => {
  const responseMessage = `Thank you, ${inputs.name}! We’ve received your request for a ${inputs.serviceType} cleaning. Our team will contact you shortly to provide the details.`

  return (
    <PublicModal show={show} onClose={reset} zIndex="z-[110]">
      <div className="py-20 max-w-sm mx-auto flex flex-col items-center justify-center w-full">
        <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-stealthGray absolute top-5 left-5 z-10 cursor-pointer" />

        <Logo className="w-full max-w-36 mb-3 h-auto object-contain animate-scaleIn" src={logoValue} priority={true} />
        <h1 className="text-2xl mb-3 font-bold text-neonIce">Inquiry Received!</h1>
        <p className="text-center mb-7">{responseMessage}</p>

        <button type="button" onClick={reset} className="font-medium text-white bg-neonIce hover:bg-iceberg duration-100 px-8 py-2">
          Keep Exploring
        </button>
      </div>
    </PublicModal>
  )
}

export default CreateClientLeadModal
