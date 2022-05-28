import { GetServerSideProps } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import LockIcon from 'src/assets/images/icons/lock-icon'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import { Input } from '../../src/components/Input'
import { Button } from '../../src/components/Button'
import { MemberManagement } from '../../src/managers/memberManagement'
import { useSelectorTyped } from '../../src/utils/hooks'
import { RootState } from '../../src/store'
import {
  setPaginationCount,
  setCurrentPage,
  setMembers,
} from '../../src/store/MebmerManagementDataStore/MemberManagementDataStore'
import { setShowLoader } from '../../src/store/GlobalConfigDataStore/GlobalConfigDataStore'
import PaginationIcon from '../../src/assets/images/icons/arrow-duble-icon'
import { LinkText } from '../../src/components/LinkText'
import EmptySearchResult from '../../src/components/Empty/EmptySearchResult'

interface IMember {
  avatar: string
  blocked: boolean
  email: string
  firstName: string | undefined
  id: number
  kycStatus: string
  lastName: string | undefined
  phone: string | undefined
  status: string
  username: string
}

interface IMembersListReqBody {
  offset: number
  limit: number
  query?: string
}

const MemberManagementPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { members, count, currentPage } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const [searchValues, setSearchValues] = useState({
    inputValue: '',
    searchValue: '',
  })

  const [isFocus, setIsFocus] = useState(false)

  const focusHandler = () => {
    setIsFocus(true)
  }

  const blurHandler = () => {
    setIsFocus(false)
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValues({
      ...searchValues,
      inputValue: e.target.value,
    })
  }

  const resetSearchInput = () => {
    setSearchValues({
      searchValue: '',
      inputValue: '',
    })
    dispatch(setCurrentPage(0))
  }

  const handlePageClick = ({ selected }: { selected: number }) => {
    dispatch(setCurrentPage(selected))
  }

  const getMembersList = async () => {
    dispatch(setShowLoader(true))
    const body: IMembersListReqBody = {
      offset: currentPage * 12,
      limit: 12,
    }

    if (searchValues.searchValue) {
      body.query = searchValues.searchValue
    }

    try {
      const res = await MemberManagement.getMembersList(body)
      dispatch(setPaginationCount(res.count))
      dispatch(setMembers(res.members))
    } catch (error) {
      throw error
    }
    dispatch(setShowLoader(false))
  }

  const handleSearchChange = () => {
    setSearchValues({
      ...searchValues,
      searchValue: searchValues.inputValue,
    })
    dispatch(setCurrentPage(0))
  }

  const searchMembersList = () => {
    if (searchValues.inputValue) {
      router.query.search = searchValues.inputValue
      router.push(router)
    } else {
      router.push(router.pathname)
    }
  }

  useEffect(() => {
    searchMembersList()
  }, [searchValues.searchValue])

  useEffect(() => {
    ;(async () => {
      await getMembersList()
    })()
  }, [currentPage, searchValues.searchValue])

  useEffect(() => {
    setSearchValues({
      inputValue:
        typeof router.query.search === 'string' ? router.query.search : '',
      searchValue:
        typeof router.query.search === 'string' ? router.query.search : '',
    })
  }, [])

  useEffect(() => {
    const listener = async (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        await handleSearchChange()
        await searchMembersList()
      }
    }
    if (isFocus) document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [router, searchValues, isFocus])

  return (
    <div className="container member-management">
      <div className="relative">
        <div>
          <h1 className="container-title">Member Management</h1>
          <span className="title-info">
            Home / Admin Tools / Member Management
          </span>
        </div>
        <div className="mm-search-area">
          <div>
            <p>found {count} results</p>
          </div>

          <div className="search-input">
            <Input
              onChange={handleSearchInput}
              value={searchValues.inputValue}
              placeholder="Member search"
              onFocus={focusHandler}
              onBlur={blurHandler}
              reset={resetSearchInput}
            />
          </div>
          <div>
            <Button onClick={handleSearchChange}>search</Button>
          </div>
        </div>
      </div>
      {members.length > 0 ? (
        <div className="members-container">
          {members?.map((item: IMember) => {
            return (
              <LinkText href={`/member_management/${item.id}`} key={item.id}>
                <div
                  className={classNames('item', {
                    blocked_item: !item.blocked,
                  })}
                  key={item.id}
                  aria-hidden
                  onClick={() => dispatch(setShowLoader(true))}
                >
                  <LockIcon />
                  <div className="top">
                    <div className="avatar">
                      {item.avatar ? (
                        <figure className="figure">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API}/avatar/${item.avatar}`}
                            alt="memberAvatar"
                          />
                        </figure>
                      ) : (
                        <figure className="figure">
                          {item.firstName?.slice(0, 1).toUpperCase()}
                          {item.lastName?.slice(0, 1).toUpperCase()}
                        </figure>
                      )}
                    </div>

                    <div className="name">
                      <h4 title={`${item.firstName} ${item.lastName}`}>
                        {item.firstName}
                      </h4>
                      <h4 title={`${item.firstName} ${item.lastName}`}>
                        {item.lastName}
                      </h4>
                      <p title={item.username}>{item.username}</p>
                    </div>
                  </div>
                  <div className="bottom">
                    <p title={item.email}> E-mail: {item.email} </p>
                    <p title={item.phone}> Phone: {item.phone}</p>
                  </div>
                </div>
              </LinkText>
            )
          })}
        </div>
      ) : (
        <EmptySearchResult />
      )}
      {count ? (
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<PaginationIcon />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={Math.ceil(count / 12)}
            previousLabel={<PaginationIcon />}
            forcePage={currentPage}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default MemberManagementPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

MemberManagementPage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
