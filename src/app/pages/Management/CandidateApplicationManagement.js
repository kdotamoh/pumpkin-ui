import ManagementComponent from './Management';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    getCandidates, getCountriesForSearch, getRecruitmentCycleDetails, searchCandidateApplication, setCurrentCandidate
} from 'app/store/actions/candidate-application-actions';
import {Link} from "react-router-dom";
import {Select, Input, Button} from 'antd';
import {getCycles} from "../../store/actions/cycle-actions";
import {getTracks} from "../../store/actions/track-actions";
import "../../../style/candidate-application.css";
import * as CandidateApplicationService from "../../../api/candidate-application";

export class CandidateApplicationManagementComponent extends React.Component {

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
        },
        {
            title: 'Track (First Choice)',
            dataIndex: 'firstChoice',
            key: 'firstChoice',
        },
        {
            title: 'Current Stage',
            dataIndex: 'currentStage',
            key: 'currentStage',
            render: (stage, record) => {
                if (record.status === 'ACTIVE') {
                    return <div style={{color: 'green'}}>{stage}</div>;
                }
                return <div style={{color: 'red'}}>{stage}</div>;
            },
        },
        {
            title: 'Country',
            dataIndex: 'countryOfStudy',
            key: 'countryOfStudy',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (text, record) => (
                <Link to={({
                    pathname: `/application-summary/${record.reference}`,
                    search: `?cycleReference=${this.state.cycleReference}`
                })}
                      onClick={() => this.props.setCurrentCandidate(record)}>
                    View Applicant
                </Link>),
        }
    ];

    componentDidMount() {
        this.props.getCycles().then(data => {
                if (data && this.props.recruitmentCycles.length > 0) {
                    this.onRecruitmentCycleSelected(this.props.recruitmentCycles[2].code);
                    this.setState({cyclesHaveBeenLoaded: true});
                }
            }
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: {
                university: null,
                stageCode: null,
                trackCode: null,
                status: null,
                country: null,
            },
            university: null,
            stageCode: null,
            trackCode: null,
            status: null,
            country: null,
            defaultStage: 'Stage',
            defaultTrack: 'Track',
            defaultCountry: 'Country',
            defaultStatue: 'Status',
            cycleReference: '',
            cycleHasBeenLoaded: false,
            tracksHasBeenLoaded: false,
        };

    }

    render() {
        return (
            <React.Fragment>
                <ManagementComponent
                    headerTitle="LIST OF APPLICANTS"
                    columnDefs={this.columns}
                    data={this.props.data}
                    newEntityName="CANDIDATES"
                    setCurrentEntity={this.props.setCurrentCandidate}
                    subHeaderView={this.subHeaderView()}
                />
            </React.Fragment>
        );
    }

    handleInput(e) {
        let filters = {...this.state.searchFilters};
        filters["university"] = e.target.value;
        this.setState({searchFilters: filters})
    }

    onSearchFilterSelected = (code, target) => {
        let filters = {...this.state.searchFilters};
        filters[target] = code;
        this.setState({searchFilters: filters})
    }

    handleSearch = () => {
        this.props.searchCandidateApplications(this.state.searchFilters, this.state.cycleReference);
    }

    onRecruitmentCycleSelected = (code) => {
        this.resetSearchFields();
        this.setState({cycleReference: code});
        this.fetchSearchFilters(code);
        this.props.getCandidates(code);
        this.props.getTracks().then(() => this.setState({tracksHasBeenLoaded: true}));
    };

    resetSearchFields = () => {
        this.setState({
            university: null,
            stageCode: null,
            trackCode: null,
            status: null,
            country: null,
            defaultStage: 'Stage',
            defaultTrack: 'Track',
            defaultCountry: 'Country',
            defaultStatue: 'Status',
        })
        // this.onRecruitmentCycleSelected(this.state.cycleReference)
    }

    exportCandidateApplications = () => {
        // CandidateApplicationService.exportCandidateApplications(this.state.searchFilters, this.state.cycleReference);
    }

    fetchSearchFilters = (code) => {
        this.props.getRecruitmentCycleDetails(code);
        this.props.getCountriesForSearch();
    }

    getDropdownChildren = (data) => {
        let children = [];
        for (let i of data) {
            children.push(
                <Select.Option key={i.code}>
                    {i.name}
                </Select.Option>
            );
        }
        return children;
    }

    subHeaderView = () => {
        const status = [{name: 'ACTIVE', code: 'ACTIVE'}, {name: 'INACTIVE', code: 'INACTIVE'}];

        const cyclesChildren = this.getDropdownChildren(this.props.recruitmentCycles);
        const statusChildren = this.getDropdownChildren(status);
        const stagesChildren = this.getDropdownChildren(this.props.stages)
        const tracksChildren = this.getDropdownChildren(this.props.tracks)
        const countriesChildren = this.getDropdownChildren(this.props.countries)

        const searchConditionsStyle = {width: 200}
        const pageHeaderDataLoaded = this.state.cyclesHaveBeenLoaded && this.state.tracksHasBeenLoaded;
        return (
            <div className="applicants_page_subheader">
                {
                    pageHeaderDataLoaded &&

                    <div className="applicants_page_subheader_row data-row">
                        <div>
                            <p className="management-component__subheader_title">Recruitment Cycle</p>
                            <Select defaultValue={this.state.cycleReference} style={{width: 300}}
                                    onSelect={this.onRecruitmentCycleSelected}>
                                {cyclesChildren}
                            </Select>
                        </div>
                        <div>
                            <p className="">University</p>
                            <Input
                                placeholder="University"
                                value={this.state.searchFilters.university}
                                onChange={(e) => this.handleInput(e)}
                            />
                        </div>
                        <div>
                            <p className="">Stage</p>
                            <Select defaultValue={this.state.defaultStage} style={searchConditionsStyle}
                                    onSelect={(code) => this.onSearchFilterSelected(code, 'stageCode')}>
                                {stagesChildren}
                            </Select>
                        </div>
                        <div>
                            <p className="">Track</p>
                            <Select defaultValue={this.state.defaultTrack} style={searchConditionsStyle}
                                    onSelect={(code) => this.onSearchFilterSelected(code, 'trackCode')}>
                                {tracksChildren}
                            </Select>
                        </div>
                    </div>
                }
                {
                    pageHeaderDataLoaded &&
                    <div>
                        <div className="applicants_page_subheader_row">
                            <div style={{display: "flex"}}>
                                <div style={{marginRight: "10px"}}>
                                    <p className="">Country of Study</p>
                                    <Select defaultValue={this.state.defaultCountry} style={searchConditionsStyle}
                                            onSelect={(code) => this.onSearchFilterSelected(code, 'country')}>
                                        {countriesChildren}
                                    </Select>
                                </div>
                                <div>
                                    <p className="">Status</p>
                                    <Select defaultValue={this.state.defaultStatue} style={{width: 100}}
                                            onSelect={(code) => this.onSearchFilterSelected(code, 'status')}>
                                        {statusChildren}
                                    </Select>
                                </div>
                                <p className="filter_count">Displaying {this.props.displayingCandidates} of {this.props.totalCandidates} applicants</p>
                            </div>
                        </div>
                        <div className="subheader_actions" style={{justifyContent: "flex-end"}}>
                            <Button type="primary" onClick={() => this.handleSearch()}>
                                Apply Filter
                            </Button>
                            <Button onClick={() => this.resetSearchFields()}>
                                Clear Filter
                            </Button>
                            <Button type="link" onClick={() => this.exportCandidateApplications()}>
                                Export to Csv
                            </Button>
                        </div>
                    </div>
                }
            </div>

        );
    };
}

CandidateApplicationManagementComponent.propTypes = {
    getCandidates: PropTypes.func.isRequired,
    setCurrentCandidate: PropTypes.func.isRequired,
    recruitmentCycles: PropTypes.array.isRequired,
    getTracks: PropTypes.func.isRequired,
    tracks: PropTypes.array.isRequired,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    data: state.candidateApplications.available,
    recruitmentCycles: state.cycles.available,
    stages: state.candidateApplications.stages,
    tracks: state.candidateApplications.tracks,
    countries: state.candidateApplications.countries,
    totalCandidates: state.candidateApplications.totalCandidates,
    displayingCandidates: state.candidateApplications.displayingCandidates
})

const mapDispatchToProps = (dispatch) => ({
    getTracks: () => dispatch(getTracks()),
    getCandidates: (code) => dispatch(getCandidates(code)),
    getCountriesForSearch: () => dispatch(getCountriesForSearch()),
    searchCandidateApplications: (searchKeys, cycleReference) => dispatch(searchCandidateApplication(searchKeys, cycleReference)),
    setCurrentCandidate: (candidate) => dispatch(setCurrentCandidate(candidate)),
    getRecruitmentCycleDetails: (code) => dispatch(getRecruitmentCycleDetails(code)),
    getCycles: () => dispatch(getCycles()),
});

export const CandidateApplicationManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(CandidateApplicationManagementComponent);
