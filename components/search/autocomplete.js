import { Component } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import AutoSuggest from 'react-autosuggest'
import {
  Highlight,
  connectAutoComplete,
  Snippet,
  connectStateResults
} from 'react-instantsearch-dom'
import SearchIcon from '~/components/icons/search'
import * as metrics from '~/lib/metrics'

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired
  }

  state = {
    value: '',
    inputFocused: false
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp.bind(this), false)

    if (this.props.router.query.query) {
      this.setState({
        value: decodeURIComponent(this.props.router.query.query) || ''
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp.bind(this), false)
  }

  onKeyUp(event) {
    const el = document.activeElement

    // Don't focus the autocomplete if focus is inside an input
    if (
      el &&
      (el.contentEditable === 'true' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT')
    ) {
      return
    }

    if (event.key == 'Escape') {
      this.input.blur()
    }
  }

  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input
    }
  }

  onChange = (_, { newValue }) => {
    if (!newValue && this.props.onSuggestionCleared) {
      this.props.onSuggestionCleared()
    }

    this.setState({ value: newValue })
  }

  onToggleFocus = () => {
    const newFocusedBool = !this.state.inputFocused

    if (newFocusedBool === true) {
      metrics.event({ action: 'search_focused', category: 'engagement' })
    }

    this.setState({ inputFocused: newFocusedBool })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  onSuggestionSelected = (_, { suggestion, method }) => {
    if (this.props.onSuggestionSelected)
      this.props.onSuggestionSelected(_, { suggestion })

    if (method === 'enter') {
      this.props.router.push({
        pathname: suggestion.url,
        query: { query: encodeURIComponent(this.state.value) },
        hash: suggestion.anchor
      })
    }
  }

  getSuggestionValue = () => this.state.value

  renderSuggestion = hit => {
    return (
      <NextLink
        href={`${hit.url}?query=${encodeURIComponent(this.state.value)}${
          hit.anchor ? `${hit.anchor}` : ''
        }`}
      >
        <a>
          <span className="suggestion__title">
            <Highlight attribute="title" tagName="mark" hit={hit} />
            <div className="tags">
              {hit._tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </span>
          {hit.section && (
            <span className="suggestion__section">
              <Highlight attribute="section" tagName="mark" hit={hit} />
            </span>
          )}
          <span className="suggestion__content">
            <Snippet
              width="100%"
              hit={hit}
              attribute="content"
              tagName="mark"
            />
          </span>
        </a>
      </NextLink>
    )
  }

  render() {
    const { hits } = this.props
    const { value, inputFocused } = this.state

    const inputProps = {
      onChange: this.onChange,
      onFocus: this.onToggleFocus,
      onBlur: this.onToggleFocus,
      type: 'search',
      value
    }

    const NoResults = connectStateResults(
      ({ searchState, searchResults, searching }) =>
        searchState &&
        searchState.query &&
        !searching &&
        (searchResults && searchResults.nbHits === 0) ? (
          <div className="no-results">
            No results for <span>"{this.state.value}"</span>.<br /> Try again
            with a different keyword.
          </div>
        ) : null
    )

    return (
      <>
        <span
          className={cn('search__container', {
            focused: inputFocused,
            'has-value': !!value.length
          })}
        >
          {!this.state.value && (
            <span className="search__search-placeholder">
              <SearchIcon />
              <span>Search...</span>
            </span>
          )}

          <AutoSuggest
            ref={this.storeInputReference}
            suggestions={hits}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            highlightFirstSuggestion={true}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />

          <NoResults />
        </span>

        <style jsx global>{`
          .search__container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.24s ease;
          }

          .no-results {
            padding: 32px;
            position: absolute;
            z-index: 1;
            width: 100%;
            top: 48px;
            background: var(--geist-background);
            color: var(--accents-6);
            box-shadow: var(--shadow-medium);
            border-radius: 0 0 8px 8px;
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            text-align: center;
          }

          .no-results span {
            word-break: break-all;
          }

          .search__search-placeholder {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: 3;
            transition: opacity 0.15s ease;
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            color: var(--accents-5);
            pointer-events: none;
          }

          .search__search-placeholder svg {
            fill: currentColor;
            margin-right: 8px;
            margin-bottom: -2px;
          }

          .suggestion__title {
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            font-weight: 500;
            margin-bottom: 8px;
            display: flex;
          }

          .suggestion__section {
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            font-weight: 500;
            margin-bottom: 12px;
            display: block;
          }

          .suggestion__content {
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            color: var(--accents-7);
            display: block;
            line-height: 1.6;
          }

          .tags {
            margin-left: 8px;
            height: 22px;
            display: flex;
            align-items: center;
          }

          .tags .tag {
            border-radius: 4px;
            border: 1px solid var(--accents-2);
            background: var(--geist-background);
            font-size: 10px;
            text-transform: uppercase;
            padding: 4px 8px;
            height: 100%;
            line-height: 130%;
            margin: 0;
          }

          .react-autosuggest__suggestion mark {
            color: var(--geist-foreground);
            font-weight: 500;
            background: yellow;
          }

          .react-autosuggest__container {
            position: relative;
          }

          .react-autosuggest__input {
            text-align: center;
            width: 528px;
            height: 48px;
            padding: 16px;
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            border: 1px solid var(--accents-2);
            border-radius: 8px;
            transition: border 0.15s ease;
            -webkit-appearance: none;
          }

          .search__container.focused .react-autosuggest__input,
          .react-autosuggest__input:focus,
          .react-autosuggest__input:valid {
            border: 1px solid var(--accents-2);
            outline: 0;
            text-align: left;
          }

          .search__container.focused .react-autosuggest__input,
          .react-autosuggest__input:focus {
            border-color: transparent;
            box-shadow: var(--shadow-medium);
            border-bottom: 1px solid var(--accents-2);
          }

          .search__container.has-value.focused .react-autosuggest__input,
          .search__container.has-value .react-autosuggest__input:focus {
            border-radius: 8px 8px 0 0;
          }

          .search__container.focused .search__search-placeholder {
            opacity: 0;
          }

          .react-autosuggest__suggestions-container {
            display: none;
            max-height: calc(90vh - 334px);
            min-height: 168px;
            overflow-y: auto;
            padding: 12px 0;
          }

          .react-autosuggest__suggestions-container--open {
            display: block;
            position: absolute;
            z-index: 2;
            width: 100%;
            top: 48px;
            background: var(--geist-background);
            box-shadow: var(--shadow-medium);
            border-radius: 0 0 8px 8px;
          }

          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
            overflow-y: auto;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 0 12px;
          }

          .react-autosuggest__suggestion a {
            text-decoration: none;
            color: black;
            border-radius: 4px;
            display: block;
            padding: 12px;
            border: 1px solid transparent;
          }

          .react-autosuggest__suggestion--highlighted a {
            background: var(--accents-1);
            border-color: var(--accents-2);
          }

          .react-autosuggest__suggestion--highlighted a span {
            color: var(--geist-foreground);
          }

          .react-autosuggest__section-container {
            border-top: 1px dashed var(--accents-3);
          }

          .react-autosuggest__section-container--first {
            border-top: 0;
          }

          .react-autosuggest__section-title {
            padding: 10px 0 0 10px;
            font-size: 12px;
            color: var(--accents-5);
          }

          @media screen and (max-width: 950px) {
            .react-autosuggest__input {
              font-size: var(--font-size-small);
              line-height: var(--line-height-small);
              width: 300px;
            }

            .react-autosuggest__suggestions-container--open {
              left: 50%;
              transform: translate(-50%);
              width: 300px;
            }
            .search__search-placeholder svg {
              left: 100px;
            }
          }

          @media screen and (max-width: 350px) {
            .react-autosuggest__input {
              font-size: var(--font-size-small);
              line-height: var(--line-height-small);
              width: 200px;
            }

            .react-autosuggest__suggestions-container--open {
              left: 50%;
              transform: translate(-50%);
              width: 200px;
            }

            .search__search-placeholder svg {
              left: 50px;
            }
          }
        `}</style>
      </>
    )
  }
}

export default withRouter(connectAutoComplete(AutoComplete))
