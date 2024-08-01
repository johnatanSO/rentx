import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EmptyItems.module.scss'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type Props = {
  text: string
  icon?: IconProp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyle?: any
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
