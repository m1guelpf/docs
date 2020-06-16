import React from 'react'
import { readToken } from './authenticate'
import fetchAPI from './fetch-api'
import { API_TEAMS } from './constants'
import teamsList from './team-switcher-list'
import PropTypes from 'prop-types'

const logger = console

export default class UseTeamInfo extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = { teams: [] }
  }

  teamsData = null

  static propTypes = {
    render: PropTypes.func.isRequired,
    user: PropTypes.object,
    team: PropTypes.string
  }

  async fetchTeams() {
    const token = readToken()
    // No need to do this if the user is not logged in
    if (!token) {
      return
    }

    let teamsData

    // fetch teams data from the cache if possible
    // NOTE: as a hack, this is also invalidated
    // when teams are updated or created inside
    // pages/teams/settings/index.js
    if (window.__zeit_teams_data) {
      const { data, timestamp } = window.__zeit_teams_data
      const timeDiff = Date.now() - timestamp
      // Invalidate the cache every 15 mins
      if (timeDiff < 1000 * 60 * 15) {
        teamsData = data
      }
    }

    if (!teamsData) {
      teamsData = await fetchAPI(API_TEAMS, token, {
        throwOnHTTPError: true
      })
    }

    // keep this around ofr recomputation if the
    // user info changes
    this.teamsData = teamsData

    const { user, team } = this.props
    const teams = user ? teamsList(teamsData.teams, user, team) : []

    this.setState({ teams })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.user === this.props.user) return

    const teamsData = this.teamsData || { teams: [] }
    const teams = nextProps.user
      ? teamsList(teamsData.teams, nextProps.user, nextProps.team)
      : []

    this.setState({ teams })
  }

  componentDidMount() {
    this.fetchTeams().catch(err => {
      logger.error('Error when fetching teams')
      logger.error(err.stack)
    })
  }

  render() {
    return this.props.render(this.state)
  }
}
