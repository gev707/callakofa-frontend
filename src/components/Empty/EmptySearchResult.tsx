import icon from '../../assets/images/empty-search-result.svg'

const EmptySearchResult = () => {
  return (
    <div className="empty-search-result">
      <img src={icon} alt="empty-search-result" />
      <p>There was no information found for the specific search parameters</p>
    </div>
  )
}

export default EmptySearchResult
