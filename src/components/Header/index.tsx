import React, { FC, useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import united from '../../assets/images/united.svg'
import BellIcon from '../../assets/images/icons/bell-icon'
import ArrowOpenIcon from '../../assets/images/icons/arrow-open-icon'
import { logOut } from '../../store/reducers/signin'
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'

export const Header: FC = () => {
  const dispatch = useDispatch()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { defaults } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )
  const { userData, personalInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  const router = useRouter()
  const goMyProfilePage = () => {
    router.push('/profile')
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <div className="header">
      <div className="content">
        <div className="currency">
          <span>{defaults.currency}</span>
        </div>
        <div className="language">
          <span className="country-icon">
            <img src={united} alt="states" />
          </span>
          <span>{defaults.language}</span>
        </div>
        <div className="bell">
          <BellIcon />
          <span>3</span>
        </div>
        <div className="user-profile" ref={wrapperRef}>
          <div className="avatar" onClick={toggleOpen} aria-hidden>
            {userData.avatar ? (
              <figure className="figure">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/avatar/${userData.avatar}`}
                  alt="aaaa"
                />
              </figure>
            ) : (
              <figure className="figure">
                {personalInfo.firstName?.slice(0, 1).toUpperCase()}
                {personalInfo.lastName?.slice(0, 1).toUpperCase()}
              </figure>
            )}
          </div>
          <div className="profile-name" onClick={toggleOpen} aria-hidden>
            <span>{userData.username}</span>
            <span onClick={toggleOpen} role="button" aria-hidden>
              <ArrowOpenIcon />
            </span>
          </div>
          {isOpen && (
            <div className="drop-name">
              <ul>
                <li aria-hidden onClick={goMyProfilePage} className="drop-item">
                  <span>My profile</span>
                </li>
                <li
                  onClick={() => dispatch(logOut())}
                  className="drop-item"
                  aria-hidden
                >
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
