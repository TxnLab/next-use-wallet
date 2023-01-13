import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function Tooltip(props: ITooltip) {
  return <ReactTooltip {...props} />
}
