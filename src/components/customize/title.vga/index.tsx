'use client'
import React from "react";
import { useTranslation } from "react-i18next";
export default function TitleVGA() {
    const { t } = useTranslation('common')
    return (
        <div className='flex gap-4 justify-between'>
            <span className='text-[24px] text-black font-semibold'>
                {t('vgacode')}
            </span>
        </div>
    )
}