import type { NextPage } from "next"

export type TarifPlanType = {
  prop?: string
  rectangle12899?: string
  theExpensive?: string
  qualityAdmissionsAdviceSh?: string
}

const TarifPlan: NextPage<TarifPlanType> = ({
  prop,
  rectangle12899,
  theExpensive,
  qualityAdmissionsAdviceSh,
}) => {
  return (
    <div className="flex h-auto w-4/5 shrink-0 flex-col items-start justify-start gap-[16px] p-3 text-left font-headings-desktop-poppins-16px-regular text-13xl text-blueviolet-200 lg:w-[450px]">
      <div className="flex flex-row items-start justify-center self-stretch px-5 py-0">
        <div className="flex flex-row items-start justify-start gap-[8px]">
          <div className="relative inline-block min-w-[40px] font-semibold leading-[150%] mq750:text-7xl mq750:leading-[38px] mq450:text-lgi mq450:leading-[29px]">
            {prop}
          </div>
          <div className="flex flex-col items-start justify-start px-0 pb-0 pt-[23px]">
            <div className="relative h-0.5 w-10 bg-darkblue" />
          </div>
        </div>
      </div>
      <div className="flex min-h-[250px] flex-row items-end justify-start self-stretch overflow-hidden rounded-md border border-[#804DFE] lg:min-h-[425px]">
        <div className="flex flex-1 flex-col items-start justify-start gap-[32px] rounded border-0 border-solid border-darkslateblue bg-black pb-[101.3px] pl-6 pr-5 pt-[27.7px] mq450:gap-[16px]">
          <div className="relative flex flex-row items-start justify-start">
            <h1 className="font-inherit relative z-[1] m-0 text-inherit font-bold leading-[100%] mq750:text-7xl mq750:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
              <p className="m-0">{theExpensive}</p>
              <p className="m-0">way</p>
            </h1>
            <div className="absolute left-[-11.5px] top-[-27.7px] z-[2] !m-0 size-[70px] rounded-[50%] [filter:blur(140px)]" />
          </div>
          <div className="relative z-[1] self-stretch font-dm-sans text-xl leading-[40px] text-gainsboro-200 mq450:text-base mq450:leading-[32px]">
            {qualityAdmissionsAdviceSh}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TarifPlan
