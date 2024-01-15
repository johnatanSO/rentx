'use client'

import style from './Footer.module.scss'
import packageJSON from '../../../../package.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import { useCreateBrands } from './hooks/useColumns'

export function Footer() {
  const year = new Date().getFullYear()

  const brands = useCreateBrands()

  return (
    <footer className={style.footerContainer}>
      <div className={style.infosContainer}>
        <p className={style.versionText}>
          &copy; Rentx - Johnatan Santos {year} | v{packageJSON.version}
        </p>
        <p>Projeto feito sem fins lucrativos, somente para portfólio</p>
      </div>

      <Swiper
        className={style.swiperContainer}
        spaceBetween={30}
        slidesPerView={5}
        modules={[Autoplay]}
        navigation
        loop={true}
        loopAdditionalSlides={brands.length}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {brands.map((image) => {
          return (
            <SwiperSlide key={image._id} className={style.slideItem}>
              <Image
                className={style.image}
                alt="Brand logo"
                width={300}
                height={150}
                src={image.path}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </footer>
  )
}
