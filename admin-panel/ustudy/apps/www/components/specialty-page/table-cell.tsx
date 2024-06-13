import { useMemo, type CSSProperties } from "react"
import type { NextPage } from "next"

export type TableCellType = {
  avatar?: string
  text?: string
  supportingText?: string

  /** Style props */
  propWidth?: CSSProperties["width"]
  propDisplay?: CSSProperties["display"]
  propMinWidth?: CSSProperties["minWidth"]
}

const TableCell: NextPage<TableCellType> = ({
  avatar,
  text,
  supportingText,
  propWidth,
  propDisplay,
  propMinWidth,
}) => {
  const textStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    }
  }, [propWidth])

  const supportingTextStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    }
  }, [propDisplay, propMinWidth])

  return (
    <div className="font-text-sm-normal border-gray1-200 box-border flex w-[807px] flex-row items-center justify-start gap-[12px] border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px] text-left text-sm text-gray-900">
      <img
        className="rounded-181xl hidden size-8 object-contain"
        alt=""
        src={avatar}
      />
      <div className="flex flex-col items-start justify-start">
        <div
          className="relative hidden w-[73px] leading-[20px]"
          style={textStyle}
        >
          {text}
        </div>
        <div
          className="font-headings-desktop-poppins-16px-bold relative text-base text-gray-500"
          style={supportingTextStyle}
        >
          {supportingText}
        </div>
      </div>
    </div>
  )
}
export default TableCell
