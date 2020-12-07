import ManagementComponent from './Management';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    clearFilter,
    getCandidates,
    getCountriesForSearch,
    getRecruitmentCycleDetails,
    searchCandidateApplication,
    setCurrentCandidate,
    setCycleReference
} from 'app/store/actions/candidate-application-actions';
import {Link} from 'react-router-dom';
import {Select, Input, Button, Modal} from 'antd';
import {getCycles} from '../../store/actions/cycle-actions';
import '../../../style/candidate-application.css';
import {exportCandidates} from '../../../api/candidate-application';
import {onSearchFilterSelected, onTextInputChanged} from '../../store/actions/candidate-application-actions';
import TextArea from 'antd/es/input/TextArea';

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
                let stageColour = 'orange';
                if (record.decisionAtStage === 'YES') {
                    return <div style={{color: 'green'}}>{stage}</div>;
                } else if (record.decisionAtStage === 'NO') {
                    return <div style={{color: 'red'}}>{stage}</div>;
                }
                return <div style={{color: stageColour}}>{stage}</div>;
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
        if (!this.props.candidatesHasBeenLoaded) {
            this.props.getCycles().then(data => {
                    if (data && this.props.recruitmentCycles.length > 0) {
                        this.onRecruitmentCycleSelected(this.props.recruitmentCycles[0].code);
                        this.setState({cyclesHaveBeenLoaded: true});
                    }
                }
            );
        }
    }

    onCommentChange = (e) => {
        this.setState({comment: e.target.value})
    }

    onBulkDeclineStagesSelected = (code) => {
        // console.log(code)
    }

    constructor(props) {
        super(props);
        this.state = {
            cycleHasBeenLoaded: false,
            candidatesHasBeenLoaded: false,
            bulkRejectModalVisible: false,
            comment: '',
            bulkDeclineModalStages: [],
            currentPage: 1
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
                    currentPage={this.state.currentPage}
                    total={this.props.totalCandidates}
                    onPaginationChanged={this.onPaginationChanged}
                />
            </React.Fragment>
        );
    }

    onPaginationChanged = (currentPage) => {
        this.setState({currentPage});
        this.props.getCandidates(this.props.cycleReference, currentPage);
    }

    onSearchCandidateApplications = () => {
        this.setState({currentPage: 1})
        this.props.searchCandidateApplications(this.props.searchFilters, this.props.cycleReference);
    }

    onRecruitmentCycleSelected = (code) => {
        this.setState({currentPage: 1});
        this.props.clearFilter();
        this.props.setCycleReference(code);
        this.fetchSearchFilters(code);
        this.props.getCandidates(code, 1).then(() => this.setState({candidatesHasBeenLoaded: true}));
    };

    fetchSearchFilters = (code) => {
        this.props.getRecruitmentCycleDetails(code).then(() => {
            this.setState({bulkDeclineModalStages: this.props.stages})
        });
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
        const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
        const isAdmin = this.props.user.roles.includes('ADMIN');

        const status = [{name: 'ACTIVE', code: 'ACTIVE'}, {name: 'INACTIVE', code: 'INACTIVE'}];

        const cyclesChildren = this.getDropdownChildren(this.props.recruitmentCycles);
        const statusChildren = this.getDropdownChildren(status);
        const stagesChildren = this.getDropdownChildren(this.props.stages)
        const tracksChildren = this.getDropdownChildren(this.props.tracks)
        const countriesChildren = this.getDropdownChildren(this.props.countries)

        const dropDownStyle = {width: 200};
        const inputStyle = {width: 160};
        const pageHeaderDataLoaded = this.props.candidatesHasBeenLoaded;

        return (
            <div className="applicants_page_subheader">
                {
                    pageHeaderDataLoaded &&
                    <div>

                        <div className="flex flex-end margin-bottom-40">
                            {(isSuperAdmin || isAdmin) && <Button type="link"
                                                                  style={{fontSize: '16px'}}
                                                                  className="semi-bold"
                                                                  onClick={() => this.setState({bulkRejectModalVisible: true})}
                                                                  danger>
                                Bulk Reject
                            </Button>}
                        </div>
                        <div className="applicants_page_subheader_row data-row">
                            <div>
                                <p className="management-component__subheader_title">Recruitment Cycle</p>
                                <Select
                                    defaultValue={this.props.cycleReference}
                                    style={{width: 220}}
                                    onSelect={this.onRecruitmentCycleSelected}>
                                    {cyclesChildren}
                                </Select>
                            </div>
                            <div>
                                <p className="">University</p>
                                <Input
                                    style={inputStyle}
                                    placeholder="University"
                                    value={this.props.searchFilters.university}
                                    onChange={(e) => this.props.handleTextInput(e, 'university')}
                                />
                            </div>
                            <div>
                                <p className="">Stage</p>
                                <Select
                                    value={this.props.dropdownValues.stage}
                                    style={dropDownStyle}
                                    onSelect={(code, dropdownData) => this.props.onSearchFilterSelected(code, dropdownData, 'stageCode', 'stage')}>
                                    {stagesChildren}
                                </Select>
                            </div>
                            <div>
                                <p className="">Track</p>
                                <Select value={this.props.dropdownValues.track}
                                        style={dropDownStyle}
                                        onSelect={(code, dropdownData) => this.props.onSearchFilterSelected(code, dropdownData, 'trackCode', 'track')}>
                                    {tracksChildren}
                                </Select>
                            </div>
                            <div>
                                <p className="">Name/Email/Reference</p>
                                <Input
                                    style={{width: 190}}
                                    placeholder="Name or Email or Reference"
                                    value={this.props.searchFilters.searchKey}
                                    onChange={(e) => this.props.handleTextInput(e, 'searchKey')}
                                />
                            </div>
                        </div>
                    </div>

                }
                {
                    pageHeaderDataLoaded &&
                    <div>
                        <div className="applicants_page_subheader_row space-between">
                            <div style={{display: 'flex'}}>
                                <div style={{marginRight: '10px'}}>
                                    <p className="">Country of Study</p>
                                    <Select value={this.props.dropdownValues.country}
                                            style={dropDownStyle}
                                            onSelect={(code, dropdownData) => this.props.onSearchFilterSelected(code, dropdownData, 'country')}>
                                        {countriesChildren}
                                    </Select>
                                </div>
                                <div>
                                    <p className="">Status</p>
                                    <Select value={this.props.dropdownValues.status}
                                            style={{width: 100}}
                                            onSelect={(code, dropdownData) => this.props.onSearchFilterSelected(code, dropdownData, 'status')}>
                                        {statusChildren}
                                    </Select>
                                </div>
                                <p className="filter_count">Displaying {this.props.displayingCandidates} of {this.props.totalCandidates} applicants</p>
                            </div>
                            <div className="subheader_actions" style={{justifyContent: 'flex-end'}}>
                                <Button type="primary" onClick={() => this.onSearchCandidateApplications()}>
                                    Apply Filter
                                </Button>
                                <Button style={{marginRight: (isSuperAdmin || isAdmin) ? '5px' : '15px'}}
                                        onClick={() => this.onRecruitmentCycleSelected(this.props.cycleReference)}>
                                    Clear Filter
                                </Button>
                                {(isSuperAdmin || isAdmin) &&
                                <Button type="link"
                                        onClick={() => exportCandidates({
                                            ...this.props.searchFilters,
                                            recruitmentCycleCode: this.props.cycleReference
                                        })}>
                                    Export to Csv
                                </Button>}
                            </div>
                        </div>
                    </div>
                }

                <Modal
                    visible={this.state.bulkRejectModalVisible}
                    title="Bulk Reject"
                    onCancel={() => this.setState({bulkRejectModalVisible: false})}
                >
                    <div>
                        <p className="">Stage</p>
                        <Select
                            defaultValue="Stage"
                            style={dropDownStyle}
                            onSelect={this.onBulkDeclineStagesSelected}>
                            {this.getDropdownChildren(this.state.bulkDeclineModalStages)}
                        </Select>
                    </div>
                    <p>Comment</p>
                    <TextArea value={this.state.comment}
                              onChange={this.onCommentChange}
                              placeholder="Comment"
                              rows={5}/>
                    <p style={{color: 'red'}}>Clicking reject will automatically reject all the applicant currently on
                        the specified stage.</p>

                </Modal>
            </div>

        );
    };

    bulkDeclineModalFooter = () => {

    }
}

CandidateApplicationManagementComponent.propTypes = {
    getCandidates: PropTypes.func.isRequired,
    setCurrentCandidate: PropTypes.func.isRequired,
    recruitmentCycles: PropTypes.array.isRequired,
    tracks: PropTypes.array.isRequired
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    data: state.candidateApplications.available,
    candidatesHasBeenLoaded: state.candidateApplications.candidatesHasBeenLoaded,
    recruitmentCycles: state.cycles.available,
    stages: state.candidateApplications.stages,
    tracks: state.candidateApplications.tracks,
    countries: state.candidateApplications.countries,
    totalCandidates: state.candidateApplications.totalCandidates,
    displayingCandidates: state.candidateApplications.displayingCandidates,
    cycleReference: state.candidateApplications.cycleReference,
    searchFilters: state.candidateApplications.searchFilters,
    dropdownValues: state.candidateApplications.dropdownValues,
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getCandidates: (code, currentPage) => dispatch(getCandidates(code, currentPage - 1)),
    getCountriesForSearch: () => dispatch(getCountriesForSearch()),
    searchCandidateApplications: (searchKeys, cycleReference) => dispatch(searchCandidateApplication(searchKeys, cycleReference)),
    setCurrentCandidate: (candidate) => dispatch(setCurrentCandidate(candidate)),
    getRecruitmentCycleDetails: (code) => dispatch(getRecruitmentCycleDetails(code)),
    getCycles: () => dispatch(getCycles()),
    setCycleReference: (cycleReference) => dispatch(setCycleReference(cycleReference)),
    onSearchFilterSelected: (code, dropdownData, target, dropdownTarget) =>
        dispatch(onSearchFilterSelected(code, dropdownData, target, dropdownTarget)),
    handleTextInput: (e, target) => dispatch(onTextInputChanged(target, e.target.value)),
    clearFilter: () => dispatch(clearFilter())
});

export const CandidateApplicationManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(CandidateApplicationManagementComponent);
