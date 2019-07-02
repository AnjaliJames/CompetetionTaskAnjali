import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import ShowJobs from './ShowJobs.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import moment from 'moment';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");

        this.state = {
            loadJobs: [],
            loaderData: loader,           

            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({
            loaderData
        });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
            this.setState({ loaderData })
        )

    }

    componentDidMount() {
        this.init();

    }

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: {

                activePage: this.state.activePage,

                sortbyDate: this.state.sortBy.date,

                showActive: this.state.filter.showActive,

                showClosed: this.state.filter.showClosed,

                showDraft: this.state.filter.showDraft,

                showExpired: this.state.filter.showExpired,

                showUnexpired: this.state.filter.showUnexpired

            },
            success: function (data) {
                if (data.myJobs) {
                    this.state.loadJobs = data.myJobs
                }
                /*this.setState({
                    loadJobs: data
                })*/
                console.log("result jobs", this.state.loadJobs);
                callback();
            }.bind(this)
            
        });
        
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }
    
    render() {

        let list = this.state.loadJobs;
        let tableData = null;
        if (list != "") {
            console.log("success");
            tableData = list.map(job =>

                <div class="ui card" key={job.Id}>
                    <div class="content">
                        <a class="ui black right ribbon label">
                            <i class="user icon"></i>0</a>

                        <div class="header">{job.title}</div>
                        <div class="meta">{job.location.city}, {job.location.country}</div>
                        <div class="description" style={{ minHeight: 150 }} >{job.summary}</div>
                    </div>
                    <div class="extra content">
                        <div class="ui three buttons">
                            <button class="ui blue basic button"><i class="close icon"></i>Close</button>
                            <button class="ui blue basic button"><i class="edit icon"></i>Edit</button>
                            <button class="ui blue basic button"><i class="copy icon"></i>Copy</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if(list == "") {
            <span><strong>No</strong> Jobs found</span>
        }
        
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                

                <div className="ui container">
                    <h1>List of Jobs</h1>

                    <div class="ui dropdown">
                        <i class="filter icon"></i>
                        <span class="text">Filter: </span>
                        <span class="text"><strong>Choose filter</strong></span>
                        <i class="dropdown icon"></i>
                        <div class="menu">
                            <div class="item">Google Docs</div>
                            <div class="item">Google Drive</div>
                        </div>
                    </div>
                    <div class="ui dropdown">
                        <i class="calendar icon"></i>
                        <span class="text">Sort by date: </span>
                        <span class="text"><strong>Newest first</strong></span>
                        <i class="dropdown icon"></i>
                        <div class="menu">
                            <div class="item">Google Docs</div>
                            <div class="item">Google Drive</div>
                        </div>
                    </div>
                    <div className="ui container"> 
                        <div class="ui three cards" >
                            {tableData}
                        </div>
                    </div>
                </div>

                

            </BodyWrapper>
        )
    }
}