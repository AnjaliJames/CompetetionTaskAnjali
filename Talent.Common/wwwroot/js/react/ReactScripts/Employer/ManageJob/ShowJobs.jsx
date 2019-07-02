import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Image, Label, Segment } from 'semantic-ui-react'

export default class ShowJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: {
                id: "",
                employerID: "",
                title: "",
                description: "",
                summary: "",
                applicantDetails: {
                    yearsOfExperience: { years: 1, months: 1 },
                    qualifications: [],
                    visaStatus: []
                },
                jobDetails: {
                    categories: { category: "", subCategory: "" },
                    jobType: [],
                    salary: { from: 0, to: 0 },
                    location: { country: "", city: "" }
                }
            },
        }
        //this.loadData = this.loadData.bind(this); 
        this.renderDisplay = this.renderDisplay.bind(this)

    };   

    componentDidMount() {
        //this.loadData();
    };

    

    render() {
        return (
            this.renderDisplay()
        )
    }

    renderDisplay() {
        return (
            <React.Fragment>
                <div class="ui cards">
                    <div class="ui card">
                        <div class="content">
                            <a class="ui black right ribbon label">
                                <i class="user icon"></i>0</a>
                            
                            <div class="header">Steve Sanders</div>
                            <div class="meta">Friends of Elliot</div>
                            <div class="description">
                                Steve wants to add you to the group
                                <strong>best friends</strong>
                            </div>
                        </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <button class="ui green basic button">Approve</button>
                                <button class="ui red basic button">Decline</button>
                            </div>
                        </div>
                    </div>
                <div>
                    </div>
                </div>
            </React.Fragment>

            )
    }
}

