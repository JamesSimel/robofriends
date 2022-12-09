import React, { Component } from "react";
import CardList from "../components/CardList";
// import { robots } from "./robot";
import SearchBox from "../components/SearchBox";
import './App.css';
import Scroll from "../components/Scroll";



export default class App extends Component{
    constructor(){
        super();

        this.state = {
            robots: [],
            searchField: ""
        }
    
    }
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json() )
            .then(users => this.setState({ robots: users })
        )
        
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }
    
    render(){
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ? 
        <h1>Loading...</h1> :
        (
            <main className="tc">
                <h1 className="robo">RoboFriends <a href="https://simel.me/" target="_blank" rel="noopener noreferrer"><span>by simel</span></a></h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robot={ filteredRobots }/>
                </Scroll>
            </main>
        )
    }
}
