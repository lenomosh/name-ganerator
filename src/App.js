import React, { Component } from 'react'
import './App.scss';
export class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateIsInvalid: false,
            genderIsInvalid: false,
            akanName: null,
            proceed:false

        }
    }
    names = {
        Sunday: {
            male: 'Kwasi',
            female: 'Akosua'
        },
        Monday: {
            male: 'Kwadwo',
            female: 'Adwoa'
        },
        Tuesday: {
            male: 'Kwabena',
            female: 'Abenaa'
        },
        Wednesday: {
            male: 'Kwaku',
            female: 'Akua'
        },
        Thursday: {
            male: 'Yaw',
            female: 'Yaa'
        },
        Friday: {
            male: 'Kofi',
            female: 'Afua'
        },
        Saturday: {
            male: 'Kwame',
            female: 'Ama'
        },
    }

    dateValidation = date => {
        const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (!date.match(dateFormat)|| date === null|| date==='' ||date===undefined) {
            this.setState({ dateIsInvalid: true })
        }

    }
    genderValidation = gender => ((!gender.match(/male|female/gi) ||gender===null || gender===undefined )&& this.setState({ genderIsInvalid: true }))
    handleForm = event => {
        event.preventDefault()
        const {dateIsInvalid,genderIsInvalid}=this.state;
        console.log('dateIsInvalid', dateIsInvalid,'genderIsInvalid',genderIsInvalid);
        const form = new FormData(event.target)
        const date = form.get('date')
        const gender = form.get('gender')
        this.dateValidation(date)
        this.genderValidation(gender)
        if (dateIsInvalid ===false && date!==undefined && date.length >9&&gender.length>=4 && genderIsInvalid ===false) {
            this.setState({proceed:true})

        }
        if (this.state.proceed) {
            console.log('function called');
            console.log('dateIsInvalid', dateIsInvalid,'genderIsInvalid',genderIsInvalid);

            const newDate = new Date(date)
            const dayBorn = newDate.getDay()
            const daysOfTheWeek = Object.keys(this.names)
            console.log(daysOfTheWeek);
            console.log(dayBorn)
            const akanName = this.names[daysOfTheWeek[dayBorn]][gender]
            this.setState({akanName})
        } else {
            alert('Ooop! We ran into a problem.')

        }
        console.log('dateIsInvalid', dateIsInvalid,'genderIsInvalid',genderIsInvalid);
    }
    handleDateChange = date => this.setState({ date })
    handleGenderChange = gender => this.setState({ gender })
    render() {
        return (
            <div className="main-wrapper">
                <div className="form-wrapper">
                    {this.state.akanName?
                    <div>{this.state.akanName}</div>
                    :
                    <form onSubmit={event => this.handleForm(event)}>
                        <div className="input-wrapper">
                            <input className="input-item" name="date" onChange={(event) => this.handleDateChange(event.target.value)} type='date' />
                            {this.state.dateIsInvalid && <p className="input-error">The date is either blank or invalid</p>}
                        </div>
                        <div className="input-wrapper">
                            <select onChange={event => this.handleGenderChange(event.target.value)} className="input-item" name="gender">
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                            {this.state.genderIsInvalid && <p className="input-error">The gender is either blank or invalid</p>}
                        </div>
                        <div className="input-wrapper">
                            <input className="submit" type='submit' value="Get Akan Name" />
                        </div>
                    </form>

                    }
                </div>
            </div>
        )
    }
}
export default App
