import React, { FC, useState } from 'react'
import classNames from 'classnames/bind'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import PencilIcon from '../../../../../assets/images/icons/pencil-icon'
import VisibilityOffIcon from '../../../../../assets/images/icons/visibility-off-icon'
import { PasswordSwitchICO } from '../../../../../components/ICO/password-switch-ico'

interface ILine {
  name: string
  text: string
  isLink?: boolean
  isCapitalize?: boolean
  isAnswer?: boolean
  isUsername?: boolean
}
type IHidden = string
type IVisible = string
type View = IHidden | IVisible

export const Account: FC = () => {
  const { memberAccountInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const { kycStatus, id, username, securityQuestion, securityAnswer, sponsor } =
    memberAccountInfo

  const hidden: IHidden = '**********'
  const visible: IVisible = securityAnswer

  const [answer, setAnswer] = useState<View>(hidden)
  const [shown, setShown] = useState(false)

  const toggleAnswerView = () => {
    if (hidden) {
      setAnswer(visible)
      setShown(true)
    }
    if (answer !== '**********') {
      setAnswer(hidden)
      setShown(false)
    }
  }

  const Line = ({
    text,
    name,
    isLink,
    isCapitalize,
    isAnswer,
    isUsername,
  }: ILine) => {
    return (
      <div className="member-info">
        <span className="name">{name}:</span>
        {isLink ? (
          <span className="member-info__title" title={text}>
            <div className="link">
              {text}
              <span className="pensil">
                <PencilIcon />
              </span>
            </div>
          </span>
        ) : isAnswer ? (
          <span className="member-info__title" title={text}>
            <div className="answer">
              {shown ? (
                <span>{text}</span>
              ) : (
                <span className="hidden">{text}</span>
              )}
              <span
                className="icon-span"
                onClick={toggleAnswerView}
                aria-hidden
              >
                {shown ? <VisibilityOffIcon /> : <PasswordSwitchICO />}
              </span>
            </div>
          </span>
        ) : (
          <span
            className={classNames('member-info__title', {
              capitalize: isCapitalize,
              usernames: isUsername,
            })}
            title={text}
          >
            {text}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="admin-info">
      <div className="flex-container admin-info__account">
        <div className="info_1">
          <span className="basic">Basic Info</span>
          <div className="admin-account-info">
            <Line text={id} name="Member ID" />
            <Line text={username} name="Username" isUsername />
            <Line name="Parent" text={sponsor || 'No Sponsor'} isLink />
            <Line
              text={kycStatus?.replace('_', ' ').toLowerCase()}
              name="KYC Status"
              isCapitalize
            />
            {securityQuestion && (
              <Line
                text={securityQuestion?.replaceAll('_', ' ').toLowerCase()}
                name="Security Question"
                isCapitalize
              />
            )}
            {securityAnswer && (
              <Line text={answer} name="Security Question Response" isAnswer />
            )}
          </div>
        </div>
        <div className="info_1">
          <span className="basic">Placement Info</span>
          <div className="admin-account-info">
            <Line text="1" name="Global Level" />
            <Line text="1" name="Sponsor Based Level" />
            <Line text="1" name="Position" />
          </div>
        </div>
      </div>
    </div>
  )
}
