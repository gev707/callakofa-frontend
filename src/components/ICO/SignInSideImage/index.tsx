import { FC } from 'react'
import side_signin from '../../../UI/bg.svg'

export const SideImage: FC<{ className: string }> = ({ className }) => (
  <img className={className} src={side_signin} alt="Sider" />
)
