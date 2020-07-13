import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from 'app/store/actions/track-actions';
import { createCycle } from 'app/store/actions/cycle-actions';
import { Select } from 'antd';

// const initialState = {
//   status: 'loading',
//   recruitmentCycleName: '',
//   year: '',
//   listOfStages: [this.stage],
//   listOfEssays: [this.essay],
//   listOfApplicationForms: [this.form],
//   listOfApplicationTrackCodes: [''],
// }

class AddCycle extends React.Component {
  stage = { name: '' };
  essay = {
    question: '',
    wordCount: '',
    showInApplicationForm: false,
    compulsoryQuestion: false,
  };
  form = { name: 'test' };

  state = {
    status: 'loading',
    recruitmentCycleName: '',
    year: '',
    listOfStages: [this.stage],
    listOfEssays: [this.essay],
    listOfApplicationForms: [this.form],
    listOfApplicationTrackCodes: [''],
  };

  async componentDidMount() {
    await this.props.getTracks();
    this.setState({ status: 'loaded' });
  }

  handleInput = (stateName, id) => (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newArr = this.state[stateName].map((item, itemId) => {
      if (id !== itemId) return item;
      return { ...item, [name]: value };
    });

    this.setState({ [stateName]: newArr });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const { status, ...cycle } = this.state;
    this.props.createCycle(cycle);

    this.setState({
      recruitmentCycleName: '',
      year: '',
      listOfStages: [this.stage],
      listOfEssays: [this.essay],
      listOfApplicationForms: [this.form],
      listOfApplicationTrackCodes: [''],
    });
  };

  render() {
    const { Option } = Select;

    if (this.state.status === 'loading') return 'Loading...';
    if (this.state.status === 'loaded')
      return (
        <div>
          <div>
            <p>Add cycle</p>
            <input
              type="text"
              placeholder="name"
              value={this.state.recruitmentCycleName}
              onChange={(e) =>
                this.setState({ recruitmentCycleName: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="year"
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
            />
          </div>

          <div>Stages</div>
          {this.state.listOfStages.map((stage, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                value={stage.name}
                onChange={this.handleInput('listOfStages', index)}
              />
              <button
                onClick={() =>
                  this.setState({
                    listOfStages: this.state.listOfStages.filter(
                      (stage, stageId) => index !== stageId
                    ),
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              this.setState({
                listOfStages: this.state.listOfStages.concat(this.stage),
              })
            }
          >
            Add stage
          </button>

          <div>
            <p>Essay questions</p>
            {this.state.listOfEssays.map((essay, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="question"
                  placeholder="question"
                  value={essay.question}
                  onChange={this.handleInput('listOfEssays', index)}
                />
                <input
                  type="number"
                  name="wordCount"
                  placeholder="word count"
                  value={essay.wordCount}
                  onChange={this.handleInput('listOfEssays', index)}
                />
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name="showInApplicationForm"
                    id=""
                    checked={
                      this.state.listOfEssays.find(
                        (essay, essayId) => index === essayId
                      ).showInApplicationForm
                    }
                    onChange={this.handleInput('listOfEssays', index)}
                  />
                  Show in application form
                </label>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name="compulsoryQuestion"
                    id=""
                    checked={
                      this.state.listOfEssays.find(
                        (essay, essayId) => index === essayId
                      ).compulsoryQuestion
                    }
                    onChange={this.handleInput('listOfEssays', index)}
                  />
                  Compulsory question
                </label>
                <button
                  onClick={() =>
                    this.setState({
                      listOfStages: this.state.listOfEssays.filter(
                        (essay, essayId) => index !== essayId
                      ),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                this.setState({
                  listOfEssays: this.state.listOfEssays.concat(this.essay),
                })
              }
            >
              Add question
            </button>
          </div>
          <div>Tracks</div>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            onChange={(value) => {
              this.setState({
                listOfApplicationTrackCodes: value,
              });
            }}
          >
            {this.props.tracks.map((track) => (
              <Option key={track.code} value={track.code}>
                {track.name}
              </Option>
            ))}
          </Select>
          <div>Application forms</div>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      );
  }
}
AddCycle.propTypes = {
  getTracks: PropTypes.func.isRequired,
  createCycle: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired, //  TODO: make arrayOf
};

const mapStateToProps = (state) => ({
  tracks: state.tracks.available,
});

const mapDispatchToProps = (dispatch) => ({
  getTracks: () => dispatch(getTracks()),
  createCycle: (cycle) => dispatch(createCycle(cycle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCycle);
