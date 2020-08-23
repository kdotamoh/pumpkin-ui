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
import "../../../style/candidate-application.css";
import * as CandidateApplicationService from "../../../api/candidate-application";
import {exportCandidates} from "../../../api/candidate-application";

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
                    pathname: `/application-summary/${record.reference}`
                })}
                      onClick={() => this.props.setCurrentCandidate(record)}>
                    View Applicant
                </Link>),
        }
    ];

    componentDidMount() {
        this.props.getCycles().then(data => {
                if (data && this.props.recruitmentCycles.length > 0) {
                    this.onRecruitmentCycleSelected(this.props.recruitmentCycles[0].code);
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
                name: null,
                searchKey: '',
            },
            dropdownValues: {
                stage: 'Stage',
                track: 'Track',
                country: 'Country',
                status: 'Status'
            },
            cycleReference: '',
            cycleHasBeenLoaded: false,
            candidatesHasBeenLoaded: false,
        };

    }

    // TODO: MAKE SURE THE DATA BEING DISPLAYED ON THE TABLE IS FINE (EVEN WHEN LESS THAN 20)
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

    handleTextInput(e, target) {
        let filters = {...this.state.searchFilters};
        filters[target] = e.target.value;
        this.setState({searchFilters: filters})
    }

    onSearchFilterSelected = (code, dropdownData, target, dropdownTarget) => {
        let filters = {...this.state.searchFilters};
        filters[target] = code;
        let dropdownValues = {...this.state.dropdownValues};
        dropdownValues[dropdownTarget || target] = dropdownData.children;
        this.setState({searchFilters: filters, dropdownValues})
    }

    handleSearch = () => {
        this.props.searchCandidateApplications(this.state.searchFilters, this.state.cycleReference);
    }

    onRecruitmentCycleSelected = (code) => {
        this.resetSearchFields();
        this.setState({cycleReference: code});
        this.fetchSearchFilters(code);
        this.props.getCandidates(code).then(() => this.setState({candidatesHasBeenLoaded: true}));
    };

    resetSearchFields = () => {
        this.setState({
            searchFilters: {
                university: null,
                stageCode: null,
                trackCode: null,
                status: null,
                country: null,
                name: null,
                searchKey: '',
            },
            dropdownValues: {
                stage: 'Stage',
                track: 'Track',
                country: 'Country',
                status: 'Status'
            }
        });
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

        const dropDownStyle = {width: 200}
        const inputStyle = {width: 160};
        const pageHeaderDataLoaded = this.state.cyclesHaveBeenLoaded && this.state.candidatesHasBeenLoaded;
        return (
            <div className="applicants_page_subheader">
                {
                    pageHeaderDataLoaded &&

                    <div className="applicants_page_subheader_row data-row">
                        <div>
                            <p className="management-component__subheader_title">Recruitment Cycle</p>
                            <Select defaultValue={this.state.cycleReference} style={{width: 220}}
                                    onSelect={this.onRecruitmentCycleSelected}>
                                {cyclesChildren}
                            </Select>
                        </div>
                        <div>
                            <p className="">University</p>
                            <Input
                                style={inputStyle}
                                placeholder="University"
                                value={this.state.searchFilters.university}
                                onChange={(e) => this.handleTextInput(e, 'university')}
                            />
                        </div>
                        <div>
                            <p className="">Stage</p>
                            <Select
                                value={this.state.dropdownValues.stage}
                                style={dropDownStyle}
                                onSelect={(code, dropdownData) => this.onSearchFilterSelected(code, dropdownData, 'stageCode', 'stage')}>
                                {stagesChildren}
                            </Select>
                        </div>
                        <div>
                            <p className="">Track</p>
                            <Select value={this.state.dropdownValues.track}
                                    style={dropDownStyle}
                                    onSelect={(code, dropdownData) => this.onSearchFilterSelected(code, dropdownData, 'trackCode', 'track')}>
                                {tracksChildren}
                            </Select>
                        </div>
                        <div>
                            <p className="">Name/Email/Reference</p>
                            <Input
                                style={inputStyle}
                                placeholder="Name or Email or Reference"
                                value={this.state.searchFilters.searchKey}
                                onChange={(e) => this.handleTextInput(e, 'searchKey')}
                            />
                        </div>
                    </div>
                }
                {
                    pageHeaderDataLoaded &&
                    <div>
                        <div className="applicants_page_subheader_row space-between">
                            <div style={{display: "flex"}}>
                                <div style={{marginRight: "10px"}}>
                                    <p className="">Country of Study</p>
                                    <Select value={this.state.dropdownValues.country}
                                            style={dropDownStyle}
                                            onSelect={(code, dropdownData) => this.onSearchFilterSelected(code, dropdownData, 'country')}>
                                        {countriesChildren}
                                    </Select>
                                </div>
                                <div>
                                    <p className="">Status</p>
                                    <Select value={this.state.dropdownValues.status}
                                            style={{width: 100}}
                                            onSelect={(code, dropdownData) => this.onSearchFilterSelected(code, dropdownData, 'status')}>
                                        {statusChildren}
                                    </Select>
                                </div>
                                <p className="filter_count">Displaying {this.props.displayingCandidates} of {this.props.totalCandidates} applicants</p>
                            </div>
                            <div className="subheader_actions" style={{justifyContent: "flex-end"}}>
                                <Button type="primary" onClick={() => this.handleSearch()}>
                                    Apply Filter
                                </Button>
                                <Button onClick={() => this.onRecruitmentCycleSelected(this.state.cycleReference)}>
                                    Clear Filter
                                </Button>
                                <Button type="link"
                                        onClick={() => exportCandidates({
                                            ...this.state.searchFilters,
                                            recruitmentCycleCode: this.state.cycleReference
                                        })}>
                                    Export to Csv
                                </Button>
                            </div>
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
