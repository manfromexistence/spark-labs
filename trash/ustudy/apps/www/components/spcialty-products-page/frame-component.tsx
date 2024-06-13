import type { NextPage } from "next"

const FrameComponent: NextPage = () => {
  return (
    <section className="text-lightsteelblue font-headings-desktop-poppins-16px-bold !mx-auto box-border flex w-[1245px] max-w-full flex-row items-start justify-center px-5 py-0 text-left text-5xl">
      <div className="flex w-[1061px] max-w-full flex-row items-start justify-start gap-[16.6px]">
        <div className="flex flex-col items-start justify-start px-0 pb-0 pt-1.5">
          <div className="flex flex-col items-start justify-start gap-[54px]">
            <div className="relative flex flex-row items-start justify-start">
              <img
                className="relative size-5"
                loading="lazy"
                alt=""
                src="/circle.png"
              />
              <div className="absolute bottom-[-457px] left-[-20px] z-[1] !m-0 h-[483px] w-[30px] rounded-sm bg-black" />
            </div>
            <img
              className="relative size-5"
              loading="lazy"
              alt=""
              src="/circle.png"
            />
            <img
              className="relative size-5"
              loading="lazy"
              alt=""
              src="/circle.png"
            />
            <img
              className="relative size-5"
              loading="lazy"
              alt=""
              src="/circle.png"
            />
            <img
              className="relative size-5"
              loading="lazy"
              alt=""
              src="/circle.png"
            />
            <img
              className="relative size-5"
              loading="lazy"
              alt=""
              src="/circle.png"
            />
            <img
              className="relative size-5"
              loading="lazy"
              alt=""
              src="/circle.png"
            />
          </div>
        </div>
        <div className="flex max-w-[calc(100%_-_37px)] flex-1 flex-row items-start justify-start gap-[22.4px]">
          <div className="flex flex-col items-start justify-start gap-[44.2px] mq750:hidden">
            <a
              className="!m-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
              href="https://www.appily.com/colleges/ucla"
              target="_blank"
            >
              Overview
            </a>
            <a
              className="relative inline-block min-w-[90px] !bg-clip-text font-bold leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] [text-decoration:none] mq450:text-lgi mq450:leading-[24px]"
              href="https://www.appily.com/colleges/ucla/admissions"
              target="_blank"
            >{`Tuition `}</a>
            <b className="relative inline-block min-w-[119px] !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
              Contacts
            </b>
            <b className="relative inline-block min-w-[87px] !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
              Majors
            </b>
            <b className="relative !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">{`Campus Life `}</b>
            <b className="relative !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
              Academics
            </b>
            <b className="relative inline-block min-w-[104px] !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
              Reviews
            </b>
          </div>
          <div className="font-dm-sans-desktop-24px-regular flex max-w-[calc(100%_-_182px)] flex-1 flex-col items-start justify-start gap-[62px] mq1050:gap-[31px] mq750:max-w-full mq450:gap-[15px]">
            <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-0.5 pr-1.5">
              <div className="relative inline-block max-w-full flex-1 mq450:text-lgi">
                <p className="m-0">
                  Astana IT University has an active student self-government,
                </p>
                <p className="m-0">
                  which is an element of the general system of management of
                  educational process in the university and implies maximum
                  consideration of interests of students.
                </p>
                <p className="m-0">{`
process at the university and assumes maximum consideration of interests,`}</p>
                <p className="m-0">
                  needs of students on the basis of studying their public
                  opinion.
                </p>
              </div>
            </div>
            <div className="text-whitesmoke font-poppins flex flex-col items-start justify-start gap-[7px] self-stretch text-13xl">
              <b className="relative self-stretch mq1050:text-7xl mq450:text-lgi">
                Entire Ecosystem
              </b>
              <div className="font-dm-sans-desktop-24px-regular text-lightsteelblue relative self-stretch text-5xl mq450:text-lgi">
                <p className="m-0">
                  Astana IT University has an active student self-government,
                </p>
                <p className="m-0">
                  which is an element of the general system of management of
                  educational process in the university and implies maximum
                  consideration of interests of students.
                </p>
                <p className="m-0">{`process at the university and assumes maximum consideration of interests,`}</p>
                <p className="m-0">
                  needs of students on the basis of studying their public
                  opinion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FrameComponent
