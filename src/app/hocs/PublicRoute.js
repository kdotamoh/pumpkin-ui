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
  getApplicationFormMajors,
} from 'app/store/actions/application-form-actions';

export class PublicRoute extends React.Component {
  cycleReference = sessionStorage.getItem('cycleReference');
  componentDidMount() {
    this.props.getGenders();
    this.props.getCountries();
    this.props.getAcademicStandings();
    this.props.getApplicationFormMajors();
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
  getApplicationFormMajors: PropTypes.func.isRequired,
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
  getApplicationFormMajors: () => dispatch(getApplicationFormMajors()),
  getApplicationEssayQuestions: (cycleReference) =>
    dispatch(getApplicationEssayQuestions(cycleReference)),
  getApplicationTracks: (cycleReference) => {
    dispatch(getApplicationTracks(cycleReference));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
