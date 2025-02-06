import AboutBiohazardIcon from '@/app/icons/AboutBiohazardIcon'
import AboutCommercialIcon from '@/app/icons/AboutCommercialIcon'
import AboutResidentialIcon from '@/app/icons/AboutResidentialIcon'
import ReasonFourSVG from '@/app/icons/ReasonFourSVG'
import ReasonOneSVG from '@/app/icons/ReasonOneSVG'
import ReasonThreeSVG from '@/app/icons/ReasonThreeSVG'
import ReasonTwoSVG from '@/app/icons/ReasonTwoSVG'
import Stat1 from '@/app/icons/Stat1'
import Stat2 from '@/app/icons/Stat2'
import Stat3 from '@/app/icons/Stat3'

export const about = (textBlockMap: any) => [
  {
    icon: <AboutResidentialIcon />,
    titleKey: textBlockMap?.aboutBlockServiceCategoryOne,
    serviceCategoryName: 'aboutBlockServiceCategoryOne',
    serviceCategoryDescName: 'aboutBlockServiceCategoryOneDesc',
    textKey: textBlockMap?.aboutBlockServiceCategoryOneDesc
  },
  {
    icon: <AboutCommercialIcon />,
    titleKey: textBlockMap?.aboutBlockServiceCategoryTwo,
    serviceCategoryName: 'aboutBlockServiceCategoryTwo',
    serviceCategoryDescName: 'aboutBlockServiceCategoryTwoDesc',
    textKey: textBlockMap?.aboutBlockServiceCategoryTwoDesc
  },
  {
    icon: <AboutBiohazardIcon />,
    titleKey: textBlockMap?.aboutBlockServiceCategoryThree,
    serviceCategoryName: 'aboutBlockServiceCategoryThree',
    serviceCategoryDescName: 'aboutBlockServiceCategoryThreeDesc',
    textKey: textBlockMap?.aboutBlockServiceCategoryThreeDesc
  }
]

export const whyChooseUs = (textBlockMap: any) => [
  {
    icon: <ReasonOneSVG />,
    num: '01',
    text: textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockReasonOne,
    name: 'whyChooseUsBlockReasonOne'
  },
  {
    icon: <ReasonTwoSVG />,
    num: '02',
    text: textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockReasonTwo,
    name: 'whyChooseUsBlockReasonTwo'
  },
  {
    icon: <ReasonThreeSVG />,
    num: '03',
    text: textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockReasonThree,
    name: 'whyChooseUsBlockReasonThree'
  },
  {
    icon: <ReasonFourSVG />,
    num: '04',
    text: textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockReasonFour,
    name: 'whyChooseUsBlockReasonFour'
  }
]

export const stats = (textBlockMap: any) => [
  {
    icon: <Stat1 />,
    value: textBlockMap?.STATS_BLOCK?.statOneValue,
    text: textBlockMap?.STATS_BLOCK?.statOneText,
    symbol: textBlockMap?.STATS_BLOCK?.statOneSymbol,
    nameValue: 'statOneValue',
    nameText: 'statOneText',
    nameSymbol: 'statOneSymbol',
    rows: 1
  },
  {
    icon: <Stat2 />,
    value: textBlockMap?.STATS_BLOCK?.statTwoValue,
    text: textBlockMap?.STATS_BLOCK?.statTwoText,
    symbol: textBlockMap?.STATS_BLOCK?.statTwoSymbol,
    nameValue: 'statTwoValue',
    nameText: 'statTwoText',
    nameSymbol: 'statTwoSymbol',
    rows: 2
  },
  {
    icon: <Stat3 />,
    value: textBlockMap?.STATS_BLOCK?.statThreeValue,
    text: textBlockMap?.STATS_BLOCK?.statThreeText,
    symbol: textBlockMap?.STATS_BLOCK?.statThreeSymbol,
    nameValue: 'statThreeValue',
    nameText: 'statThreeText',
    nameSymbol: 'statThreeSymbol',
    rows: 1
  }
]

export const workingProcesses = (textBlockMap: any) => [
  {
    step: '1',
    title: textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockStepOneTitle,
    desc: textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockStepOneDesc,
    nameTitle: 'workingProcessBlockStepOneTitle',
    nameDesc: 'workingProcessBlockStepOneDesc'
  },
  {
    step: '2',
    title: textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockStepTwoTitle,
    desc: textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockStepTwoDesc,
    nameTitle: 'workingProcessBlockStepTwoTitle',
    nameDesc: 'workingProcessBlockStepTwoDesc'
  },
  {
    step: '3',
    title: textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockStepThreeTitle,
    desc: textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockStepThreeDesc,
    nameTitle: 'workingProcessBlockStepThreeTitle',
    nameDesc: 'workingProcessBlockStepThreeDesc'
  }
]
