'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import style from './Sandbox.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'

export function Sandbox() {
  return (
    <Swiper
      className={style.swiperContainer}
      spaceBetween={50}
      slidesPerView={3}
      modules={[Navigation]}
      navigation
    >
      <SwiperSlide className={style.slideItem}>Slide 1</SwiperSlide>
      <SwiperSlide className={style.slideItem}>Slide 2</SwiperSlide>
      <SwiperSlide className={style.slideItem}>Slide 3</SwiperSlide>
      <SwiperSlide className={style.slideItem}>Slide 4</SwiperSlide>
    </Swiper>
  )
}
