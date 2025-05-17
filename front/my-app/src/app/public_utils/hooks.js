'use client'

import { useLocale } from 'next-intl'




export function useFormatNumber() {
  const locale = useLocale()

  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');
    return formatter.format(number);
  };

  return formatNumber;
}






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





export function useStepOrSubStepProcessStrategy() {
  const locale = useLocale()

  const getStepOrSubStepProcessStrategy = (value) => {
    if (value === 'manual') {
      return locale === 'ar' ? 'يدوي' : 'Manual'
    } else if (value === 'auto') {
      return locale === 'ar' ? 'تلقائي' : 'Auto'
    } else if (value === 'inherit_from_project_flow'){
      return locale === 'ar' ? 'الوراثة من الإعدادات الرئيسية' : 'Inherit From projectFlow'
    }
  }

  return getStepOrSubStepProcessStrategy
}




export function useStepOrSubStepAllowedProcessBy() {
  const locale = useLocale()

  const getStepOrSubStepAllowedProcessBy = (value) => {
    if (value === 'any_staff') {
      return locale === 'ar' ? 'أي موظف في طاقم العمل' : 'Any Staff'
    } else if (value === 'specific_staff_group') {
      return locale === 'ar' ? 'مجموعات محددة من طاقم العمل' : 'Specific Staff Groups'
    } else if (value === 'client'){
      return locale === 'ar' ? 'العميل' : 'Client'
    }
  }

  return getStepOrSubStepAllowedProcessBy
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




 
export function useProjectStatus() {
  const locale = useLocale()

  const getProjectStatus = (value) => {
    if (value === 'pending') {
      return locale === 'ar' ? 'قيد الإنتظار' : 'Pending'
    } else if (value === 'wait_customer_action') {
      return locale === 'ar' ? 'بإنتظار إجراء من العميل' : 'Wait Customer Action'
    } else if (value === 'in_progress'){
      return locale === 'ar' ? 'قيد العمل' : 'In Progress'
    }  else if (value === 'completed'){
      return locale === 'ar' ? 'منتهي' : 'Completed'
    }  else if (value === 'canceled'){
      return locale === 'ar' ? 'ملغى' : 'Canceled'
    }
  }

  return getProjectStatus
}





export function useStepStatus() {
  const locale = useLocale()

  const getStepStatus = (value) => {
    if (value === 'pending') {
      return locale === 'ar' ? 'قيد الإنتظار' : 'Pending'
    } else if (value === 'wait_customer_action') {
      return locale === 'ar' ? 'بإنتظار إجراء من العميل' : 'Wait Customer Action'
    } else if (value === 'in_progress'){
      return locale === 'ar' ? 'قيد العمل' : 'In Progress'
    }  else if (value === 'completed'){
      return locale === 'ar' ? 'منتهية' : 'Completed'
    }  else if (value === 'canceled'){
      return locale === 'ar' ? 'ملغى' : 'Canceled'
    }
  }

  return getStepStatus
}