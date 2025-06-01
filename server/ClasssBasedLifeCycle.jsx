// & Class based component lifecycle 

// ^ Mounting method  : this means the component is being created and added to the DOM
                                //^ The following are the methods in the mounting stage 

        //* constructor() :                   First method: good for setting up initial state and binding methods

        //* static getDerivedStateFromProps() :	Rarely used: sync state with props (before render) ይሄ ሚያረገው ኮፒ ወይንም አዲሱን ስቴት ካልኩሌት ነው ሚያረገው በመጣለት ፕሮፕስ አማካኝነት ሜትዱም (static getDetDerivedStateFromProps(nextProps, PrevState) {}))

        //* render()	:                        Required: returns the JSX (UI)

        //* componentDidMount()	:                Called after the component is rendered — good for API calls, timers, subscriptions         


        // ! why does the componentDidMount() run after render()
                //* 1️⃣ Prepare and Render	React builds the virtual DOM using render() — but this is just a plan, not real changes yet
                //* 2️⃣ Commit and Mount	React updates the real DOM in the browser and then says, "Component is fully mounted now!" — so it calls componentDidMount()

                //* ይሄ የሚሆንበት ምክንያት በዋነኝነት RealDOM build መደረግ አለበት mount lemederege ከዛ በሁዋላ ነው እንደ API call or DOM operation መካሄድ ሚችለው። 
//^ Updating (component's props or state change)

        //* static getDerivedStateFromProps():	Again runs if props change
        //* shouldComponentUpdate():	Decide whether to re-render (return true/false)
        //* render():	Re-renders the JSX
        //* getSnapshotBeforeUpdate():	Capture information (like scroll position) before updating the DOM
        //* componentDidUpdate():	Called after the DOM is updated — perfect for side-effects like network requests based on new data
// ^ Unmounting (component is being removed)

        //* omponentWillUnmount()	Cleanup (like removing timers, subscriptions, clearing credentials)

// & EXAMPLE OF LIFE CYCLE IN CLASS 

                import React, { Component } from 'react';

                class Clock extends Component {
                constructor(props) {
                    super(props);
                    this.state = { time: new Date() };
                    console.log('Constructor: setting initial state');
                }

                componentDidMount() {
                    console.log('ComponentDidMount: start timer');
                    this.timer = setInterval(() => {
                    this.setState({ time: new Date() });
                    }, 1000);
                }

                componentDidUpdate() {
                    console.log('ComponentDidUpdate: component updated');
                }

                componentWillUnmount() {
                    console.log('ComponentWillUnmount: clearing timer');
                    clearInterval(this.timer);
                }

                render() {
                    console.log('Render: rendering UI');
                    return (
                    <div>
                        <h1>Current Time:</h1>
                        <h2>{this.state.time.toLocaleTimeString()}</h2>
                    </div>
                    );
                }
                }

                export default Clock;











