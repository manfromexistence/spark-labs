"use client"

import type { NextPage } from "next"

import TarifPlan from "./tarif-plan"

const FrameComponent1: NextPage = () => {
  return (
    <div className="static mx-auto flex min-h-max w-full flex-col items-center justify-center space-y-3 overflow-hidden !p-0 lg:relative lg:flex-row lg:space-x-7">
      <img
        className="absolute left-0 z-[3] my-auto h-[700px] w-[250px] object-cover"
        loading="lazy"
        alt=""
        src="/ellipse-1573.png"
      />
      <img
        className="absolute left-[90%] z-[4] my-auto h-[700px] w-[300px] object-contain"
        loading="lazy"
        alt=""
        src="/ellipse-1574.png"
      />
      <TarifPlan
        prop="01"
        rectangle12899="/rectangle-12899.svg"
        theExpensive="The generic"
        qualityAdmissionsAdviceSh="Admissions isn't one-size-fits all, and there is so much information out there that applicants get lost."
      />
      <TarifPlan
        prop="02"
        rectangle12899="/rectangle-12899.svg"
        theExpensive="The expensive "
        qualityAdmissionsAdviceSh="Quality admissions advice shouldn't be reserved for the financially-able."
      />
      <TarifPlan
        prop="03"
        rectangle12899="/rectangle-12899.svg"
        theExpensive="The uStudy "
        qualityAdmissionsAdviceSh="We believe admissions advice should be personal and accessible to any applicant."
      />
    </div>
  )
}
export default FrameComponent1
