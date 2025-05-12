'use client'

import { useLocale } from 'next-intl'

export function useTrueFalseLabel() {
  const locale = useLocale()

  const getTrueFalseLabel = (value) => {
    if (value) {
      return locale === 'ar' ? 'نعم' : 'Yes'
    } else {
      return locale === 'ar' ? 'لا' : 'No'
    }
  }

  return getTrueFalseLabel
}




export function useStepsProcessStrategy() {
  const locale = useLocale()

  const getStepsProcessStrategy = (value) => {
    if (value === 'manual') {
      return locale === 'ar' ? 'يدوي' : 'Manual'
    } else {
      return locale === 'ar' ? 'تلقائي' : 'Auto'
    }
  }

  return getStepsProcessStrategy
}





export function useManualStartMode() {
  const locale = useLocale()

  const getManualStartMode = (value) => {
    if (value === 'serialized') {
      return locale === 'ar' ? 'تسلسلي' : 'Serialized'
    } else {
      return locale === 'ar' ? 'غير تسلسلي' : 'Non-Serialized'
    }
  }

  return getManualStartMode
}