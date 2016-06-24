'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainComponent from '../components/Main'

import { actions } from '../actions/problems'

class Main extends Component {

  loadProblems () {
    const { loadProblems } = this.props.actions
    loadProblems(0)
    loadProblems(1)
  }

  render () {
    const { changeUsername } = this.props.actions
    const { data, status } = this.props
    return (
      <MainComponent
        data={data}
        status={status}
        changeUsername={changeUsername}
        submit={this.loadProblems.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.problems.data,
  status: state.problems.status
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
