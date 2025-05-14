import React, { Fragment } from 'react'

import ProductsList from '@/components/ui/products/Products'

import HomeLayout from '@/components/ui/home/HomeLayout'

import ServiceList from '@/components/ui/service/Service'

import About from "@/components/ui/about/About"

import Testimonials from "@/components/ui/testimonials/Testimonials"

export default function page() {
  return (
    <Fragment>
      <HomeLayout />
      <ServiceList />
      <About />
      <ProductsList />
      <Testimonials />
    </Fragment>
  )
}
