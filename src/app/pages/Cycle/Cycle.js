import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from 'app/store/actions/track-actions';
import { createCycle } from 'app/store/actions/cycle-actions';
import { Select, Row, Col, Button, Input } from 'antd';

import {
  getCycleByCode,
  updateCycle,
  updateCycleForm,
  addCycleForm,
  deleteCycleForm,
  updateCycleStage,
  updateCycleEssayQuestion,
  addCycleEssayQuestion,
  deleteCycleEssayQuestion,
  addCycleStage,
  deleteCycleStage,
  updateCycleTracks,
} from 'api/cycle';

import 'style/cycle-page.css';

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
    const { TextArea } = Input;

    const isUpdating = this.props.editMode;

    if (this.state.status === 'loading')
      return <div className="cycle__container">Loading...</div>;
    if (this.state.status === 'loaded')
      return (
        <div className="cycle__container">
          <h4 className="cycle__heading">
            {isUpdating ? 'Update cycle' : 'Add cycle'}
          </h4>
          <Row>
            <Col span={12} className="pr-15rem">
              <div>
                <div className="flex-column">
                  <label htmlFor="recruitmentCycleName">Cycle Name</label>
                  <input
                    type="text"
                    className="form__input"
                    placeholder="name"
                    name="recruitmentCycleName"
                    value={this.state.recruitmentCycleName}
                    onChange={(e) =>
                      this.setState({ recruitmentCycleName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4"></div>
                <div className="flex-column">
                  <label htmlFor="recruitmentCycleName">Cycle Year</label>
                  <input
                    type="number"
                    className="form__input"
                    placeholder="year"
                    value={this.state.year}
                    onChange={(e) => this.setState({ year: e.target.value })}
                  />
                </div>
              </div>

              {isUpdating && (
                <Button
                  shape="round"
                  type="primary"
                  className="mt-4"
                  onClick={() => this.handleUpdateCycle()}
                >
                  Update
                </Button>
              )}
            </Col>
            <Col span={12} className="pr-15rem"></Col>
          </Row>

          <hr />

          <Row>
            <Col span={12} className="pr-15rem">
              <p>Tracks</p>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                className="mb-4"
                value={this.state.listOfApplicationTrackCodes}
                onChange={(value) => {
                  this.setState({
                    listOfApplicationTrackCodes: value,
                  });
                  // this.state.listOfApplicationTrackCodes.concat(value);
                }}
              >
                {this.props.tracks.map((track) => (
                  <Option key={track.code} value={track.code}>
                    {track.name}
                  </Option>
                ))}
              </Select>
              {isUpdating && (
                <Button
                  type="primary"
                  shape="round"
                  onClick={async () => {
                    await updateCycleTracks(
                      this.state.listOfApplicationTrackCodes,
                      this.props.id
                    );
                    this.handleSetCycle();
                  }}
                >
                  Update tracks
                </Button>
              )}
            </Col>
            <Col span={12} className="pr-15rem">
              <p>Forms</p>
              {this.state.listOfApplicationForms.map((form, index) => (
                <div key={index}>
                  <TextArea
                    type="text"
                    className=" mb-4"
                    name="name"
                    value={form.name}
                    onChange={this.handleInput('listOfApplicationForms', index)}
                  />
                  <div className="mb-5">
                    {isUpdating && (
                      <Button
                        type="primary"
                        shape="round"
                        className="mr-3"
                        onClick={async () => {
                          form.new
                            ? await addCycleForm(form, this.props.id)
                            : await updateCycleForm(form, this.props.id);
                          this.handleSetCycle();
                        }}
                      >
                        {form.new ? 'Add to cycle' : 'Update'}
                      </Button>
                    )}
                    {!form.new && (
                      <Button
                        type="danger"
                        shape="round"
                        onClick={async () => {
                          if (isUpdating) {
                            await deleteCycleForm(form.code, this.props.id);
                            this.handleSetCycle();
                          } else {
                            this.setState({
                              listOfApplicationForms: this.state.listOfApplicationForms.filter(
                                (form, formId) => index !== formId
                              ),
                            });
                          }
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  if (isUpdating) {
                    this.setState({
                      listOfApplicationForms: this.state.listOfApplicationForms.concat(
                        {
                          name: '',
                          new: true,
                        }
                      ),
                    });
                  } else {
                    this.setState({
                      listOfApplicationForms: this.state.listOfApplicationForms.concat(
                        {
                          name: '',
                        }
                      ),
                    });
                  }
                }}
              >
                Add form
              </Button>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col span={12} className="pr-15rem">
              <p>Stages</p>
              {this.state.listOfStages.map((stage, index) => (
                <div key={index}>
                  <TextArea
                    type="text"
                    className=" mb-4"
                    name="name"
                    value={stage.name}
                    onChange={this.handleInput('listOfStages', index)}
                  />
                  <div className="mb-5">
                    {isUpdating && (
                      <Button
                        type="primary"
                        shape="round"
                        className="mr-3"
                        onClick={async () => {
                          stage.new
                            ? await addCycleStage(stage, this.props.id)
                            : await updateCycleStage(stage, this.props.id);
                          this.handleSetCycle();
                        }}
                      >
                        {stage.new ? 'Add to cycle' : 'Update'}
                      </Button>
                    )}
                    {!stage.new && (
                      <Button
                        type="danger"
                        shape="round"
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
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="primary"
                shape="round"
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
                      listOfStages: this.state.listOfStages.concat({
                        name: '',
                      }),
                    });
                  }
                }}
              >
                Add stage
              </Button>
            </Col>
            <Col span={12} className="pr-15rem">
              <div>
                <p>Essay questions</p>
                {this.state.listOfEssays.map((essay, index) => (
                  <div className="flex-column" key={index}>
                    <TextArea
                      type="text"
                      className="mb-4"
                      name="question"
                      placeholder="question"
                      value={essay.question}
                      onChange={this.handleInput('listOfEssays', index)}
                    />
                    <input
                      type="number"
                      className="cycle__word-count mb-5"
                      name="wordCount"
                      placeholder="word count"
                      value={essay.wordCount}
                      onChange={this.handleInput('listOfEssays', index)}
                    />
                    <div className="">
                      <label htmlFor="" className="mb-5">
                        <input
                          type="checkbox"
                          name="showInApplicationForm"
                          className="mr-2"
                          id=""
                          checked={essay.showInApplicationForm}
                          onChange={this.handleInput('listOfEssays', index)}
                        />
                        Show in application form
                      </label>
                      <label htmlFor="" className="ml-5">
                        <input
                          type="checkbox"
                          name="compulsoryQuestion"
                          className="mr-2"
                          id=""
                          checked={essay.compulsoryQuestion}
                          onChange={this.handleInput('listOfEssays', index)}
                        />
                        Compulsory question
                      </label>
                    </div>
                    <div className="mb-5">
                      {isUpdating && (
                        <Button
                          type="primary"
                          className="mr-3"
                          shape="round"
                          onClick={async () => {
                            essay.new
                              ? await addCycleEssayQuestion(
                                  essay,
                                  this.props.id
                                )
                              : await updateCycleEssayQuestion(
                                  essay,
                                  this.props.id
                                );
                            this.handleSetCycle();
                          }}
                        >
                          {essay.new ? 'Add to cycle' : 'Update'}
                        </Button>
                      )}
                      {!essay.new && (
                        <Button
                          type="danger"
                          shape="round"
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
                        </Button>
                      )}
                    </div>

                    {/* //Todo: Handle both local and server-side deletion */}
                  </div>
                ))}
                <Button
                  type="primary"
                  shape="round"
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
                </Button>
              </div>
            </Col>
          </Row>

          <div className="mt-5rem"></div>

          {/* <div>Application forms</div> */}
          {!isUpdating && (
            <Button type="primary" shape="round" onClick={this.handleSubmit}>
              Submit
            </Button>
          )}
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
