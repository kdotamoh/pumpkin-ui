import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getGenders,
  getAcademicStandings,
  getCountries,
  getApplicationEssayQuestions,
  getApplicationTracks,
} from 'app/store/actions/application-form-actions';
import { getUniversities } from 'app/store/actions/university-actions';
import { getMajors } from 'app/store/actions/major-actions';

export class PublicRoute extends React.Component {
  cycleReference = sessionStorage.getItem('cycleReference');
  componentDidMount() {
    this.props.getGenders();
    this.props.getCountries();
    this.props.getAcademicStandings();
    this.props.getUniversities();
    this.props.getMajors();
    if (this.cycleReference) {
      this.props.getApplicationTracks(this.cycleReference);
      this.props.getApplicationEssayQuestions(this.cycleReference);
    }
  }
  render() {
    return (
      <Route
        key={this.props.path}
        path={this.props.path}
        exact={this.props.exact}
        render={(props) => this.props.Component(props)}
      />
    );
  }
}

PublicRoute.propTypes = {
  Component: PropTypes.func.isRequired,
  getGenders: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  getAcademicStandings: PropTypes.func.isRequired,
  getMajors: PropTypes.func.isRequired,
  getUniversities: PropTypes.func.isRequired,
  getApplicationEssayQuestions: PropTypes.func.isRequired,
  getApplicationTracks: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.string,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  token: state.user.userToken,
});
const mapDispatchToProps = (dispatch) => ({
  getGenders: () => dispatch(getGenders()),
  getCountries: () => dispatch(getCountries()),
  getAcademicStandings: () => dispatch(getAcademicStandings()),
  getUniversities: () => dispatch(getUniversities()),
  getMajors: () => dispatch(getMajors()),
  getApplicationEssayQuestions: (cycleReference) =>
    dispatch(getApplicationEssayQuestions(cycleReference)),
  getApplicationTracks: (cycleReference) => {
    dispatch(getApplicationTracks(cycleReference));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
