import {
  faExclamationCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EmptyItems.module.scss'
import { CSSProperties } from 'react'

type Props = {
  text: string
  icon?: IconDefinition
  customStyle?: CSSProperties
}

export function EmptyItems({ customStyle, text, icon }: Props) {
  return (
    <div className={style.container} style={customStyle ?? customStyle}>
      <FontAwesomeIcon
        className={style.icon}
        icon={icon || faExclamationCircle}
      />
      {text || 'Nenhum item encontrado'}
    </div>
  )
}
