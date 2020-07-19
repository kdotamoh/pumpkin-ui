import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from 'app/store/actions/track-actions';
import { createCycle } from 'app/store/actions/cycle-actions';
import { Select } from 'antd';

import {
  getCycleByCode,
  updateCycle,
  updateCycleStage,
  updateCycleEssayQuestion,
  addCycleEssayQuestion,
  deleteCycleEssayQuestion,
  addCycleStage,
  deleteCycleStage,
  deleteCycleTrack,
} from 'api/cycle';

const initialState = {
  recruitmentCycleName: '',
  year: '',
  listOfStages: [{ name: '' }],
  listOfEssays: [
    {
      question: '',
      wordCount: '',
      showInApplicationForm: false,
      compulsoryQuestion: false,
    },
  ],
  listOfApplicationForms: [{ name: 'test' }],
  listOfApplicationTrackCodes: [],
};

class Cycle extends React.Component {
  state = {
    status: 'loading',
    ...initialState,
  };

  async componentDidMount() {
    await this.props.getTracks();

    if (this.props.editMode) {
      await this.handleSetCycle();
    }

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

  handleUpdateCycle = async () => {
    updateCycle(
      { name: this.state.recruitmentCycleName, year: this.state.year },
      this.props.id
    );
  };

  handleSetCycle = async () => {
    // eslint-disable-next-line
    let { status, ...data } = await getCycleByCode(this.props.id);
    this.setState(data);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const { status, ...cycle } = this.state;
    this.props.createCycle(cycle);

    this.setState(...initialState);
  };

  render() {
    const { Option } = Select;

    const isUpdating = this.props.editMode;

    if (this.state.status === 'loading') return 'Loading...';
    if (this.state.status === 'loaded')
      return (
        <div>
          <div>
            <p>{isUpdating ? 'Update cycle' : 'Add cycle'}</p>
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

          {isUpdating && (
            <button onClick={() => this.handleUpdateCycle()}>Update</button>
          )}

          <div>Stages</div>
          {this.state.listOfStages.map((stage, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                value={stage.name}
                onChange={this.handleInput('listOfStages', index)}
              />
              {isUpdating && (
                <button
                  onClick={async () => {
                    stage.new
                      ? await addCycleStage(stage, this.props.id)
                      : await updateCycleStage(stage, this.props.id);
                    this.handleSetCycle();
                  }}
                >
                  {stage.new ? 'Add to cycle' : 'Update'}
                </button>
              )}
              {!stage.new && (
                <button
                  onClick={async () => {
                    if (isUpdating) {
                      await deleteCycleStage(stage.code, this.props.id);
                      this.handleSetCycle();
                    } else {
                      this.setState({
                        listOfStages: this.state.listOfStages.filter(
                          (stage, stageId) => index !== stageId
                        ),
                      });
                    }
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              if (isUpdating) {
                this.setState({
                  listOfStages: this.state.listOfStages.concat({
                    name: '',
                    new: true,
                  }),
                });
              } else {
                this.setState({
                  listOfStages: this.state.listOfStages.concat({ name: '' }),
                });
              }
            }}
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
                    checked={essay.showInApplicationForm}
                    onChange={this.handleInput('listOfEssays', index)}
                  />
                  Show in application form
                </label>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name="compulsoryQuestion"
                    id=""
                    checked={essay.compulsoryQuestion}
                    onChange={this.handleInput('listOfEssays', index)}
                  />
                  Compulsory question
                </label>
                {isUpdating && (
                  <button
                    onClick={async () => {
                      essay.new
                        ? await addCycleEssayQuestion(essay, this.props.id)
                        : await updateCycleEssayQuestion(essay, this.props.id);
                      this.handleSetCycle();
                    }}
                  >
                    {essay.new ? 'Add to cycle' : 'Update'}
                  </button>
                )}
                {!essay.new && (
                  <button
                    onClick={async () => {
                      if (isUpdating) {
                        await deleteCycleEssayQuestion(
                          essay.code,
                          this.props.id
                        );
                        this.handleSetCycle();
                      } else {
                        this.setState({
                          listOfStages: this.state.listOfEssays.filter(
                            (essay, essayId) => index !== essayId
                          ),
                        });
                      }
                    }}
                  >
                    Remove
                  </button>
                )}
                {/* //Todo: Handle both local and server-side deletion */}
              </div>
            ))}
            <button
              onClick={() => {
                if (isUpdating) {
                  this.setState({
                    listOfEssays: this.state.listOfEssays.concat({
                      question: '',
                      wordCount: '',
                      showInApplicationForm: false,
                      compulsoryQuestion: false,
                      new: true,
                    }),
                  });
                } else {
                  this.setState({
                    listOfEssays: this.state.listOfEssays.concat({
                      question: '',
                      wordCount: '',
                      showInApplicationForm: false,
                      compulsoryQuestion: false,
                    }),
                  });
                }
              }}
            >
              Add question
            </button>
          </div>
          <div>Tracks</div>
          {this.state.listOfApplicationTrackCodes.map((track, index) => (
            <div key={index}>
              <span>{track}</span>
              <button
                onClick={async () => {
                  await deleteCycleTrack(track, this.props.id);
                  this.handleSetCycle();
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <Select
            // mode="multiple"
            style={{ width: '100%' }}
            value={this.state.listOfApplicationTrackCodes}
            onChange={(value) => {
              this.setState({
                listOfApplicationTrackCodes: [
                  ...this.state.listOfApplicationTrackCodes,
                  value,
                ],
              });
              this.state.listOfApplicationTrackCodes.concat(value);
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
Cycle.propTypes = {
  getTracks: PropTypes.func.isRequired,
  createCycle: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  id: PropTypes.string,
  tracks: PropTypes.array.isRequired, //  TODO: make arrayOf
};

const mapStateToProps = (state) => ({
  tracks: state.tracks.available,
});

const mapDispatchToProps = (dispatch) => ({
  getTracks: () => dispatch(getTracks()),
  createCycle: (cycle) => dispatch(createCycle(cycle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cycle);
