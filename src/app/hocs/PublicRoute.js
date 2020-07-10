import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getGenders,
  getAcademicStandings,
  getCountries,
  getApplicationEssayQuestions,
} from 'app/store/actions/application-form-actions';
import {
  getUniversities,
  getUniversityMajors,
} from 'app/store/actions/university-actions';

export class PublicRoute extends React.Component {
  componentDidMount() {
    this.props.getGenders();
    this.props.getCountries();
    this.props.getAcademicStandings();
    this.props.getUniversities();
    this.props.getUniversityMajors();
    // this.props.getApplicationEssayQuestions('J6PNN4SG5U5K975KMGKQ');
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
  getUniversityMajors: PropTypes.func.isRequired,
  getUniversities: PropTypes.func.isRequired,
  getApplicationEssayQuestions: PropTypes.func.isRequired,
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
  getUniversityMajors: () => dispatch(getUniversityMajors()),
  getApplicationEssayQuestions: (cycleReference) =>
    dispatch(getApplicationEssayQuestions(cycleReference)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
