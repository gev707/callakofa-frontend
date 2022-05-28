import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ProfileManager } from '../../../managers/profile'
import { setAccountInfo } from '../../../store/ProfileDataStore/ProfileDataStore'
import { setSocialInfo } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'

interface ILine {
  name: string
  text: string
  isLink?: boolean
}

export const Overview: FC = () => {
  const dispatch = useDispatch()
  const { accountInfo } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const { socialInfo, personalInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )

  const Line = ({ text, name, isLink }: ILine) => {
    return (
      <div className="info">
        <span>{name}:</span>
        {isLink ? (
          <span title={text}>
            <a target="_blank" href={text} rel="noreferrer">
              {text}
            </a>
          </span>
        ) : (
          <span title={text}>{text}</span>
        )}
      </div>
    )
  }

  useEffect(() => {
    ;(async () => {
      const [account, social] = await Promise.all([
        ProfileManager.getAccountInfo(),
        ProfileManager.getSocialInfo(),
      ])
      dispatch(setSocialInfo(social))
      dispatch(setAccountInfo(account))
    })()
  }, [])

  return (
    <div className="card-columns">
      <div className="card-column">
        <div className="card-title">ACCOUNT INFO</div>
        <hr />
        {accountInfo && (
          <div className="p-30">
            <Line text={accountInfo.member} name="Member" />
            <Line text={accountInfo.username} name="Username" />
            <Line text={accountInfo.sponsor} name="Sponsor name" />
          </div>
        )}
      </div>
      <div className="card-column">
        <div className="card-title">PERSONAL INFO</div>
        <hr />
        {personalInfo && (
          <div className="p-30">
            <Line text={personalInfo.firstName} name="First Name" />
            <Line text={personalInfo.lastName} name="Last Name" />
            <Line text={personalInfo.email} name="Email" />
            <Line text={personalInfo.phone} name="Mobile" />
            <Line text={personalInfo.dateOfBirth} name="DOB" />
            <Line text={personalInfo.gender} name="Gender" />
            <Line text={personalInfo.address} name="Address" />
            <Line text={personalInfo.state} name="State" />
            <Line text={personalInfo.country} name="Country" />
            <Line text={personalInfo.city} name="City" />
            <Line text={personalInfo.zipCode} name="Zip Code" />
          </div>
        )}
      </div>
      <div className="card-column">
        <div className="card-title">SOCIAL INFO</div>
        <hr />
        <div className="p-30">
          <Line text={socialInfo.about} name="About me" />
          <Line text={socialInfo.facebook} name="Facebook" isLink />
          <Line text={socialInfo.twitter} name="Twitter" isLink />
          <Line text={socialInfo.linkedIn} name="Linked In" isLink />
        </div>
      </div>
    </div>
  )
}
