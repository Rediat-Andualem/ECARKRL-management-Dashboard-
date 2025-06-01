//&& functional component example

import { useEffect, useState } from 'react';

        function BirthdayParty() {
        const [cakeEaten, setCakeEaten] = useState(false);

        // Mounting (when the component first shows)
        useEffect(() => {
            console.log('Friends have arrived at the party! 🎉');

            // Unmounting (when the component disappears)
            return () => {
            console.log('Friends have left the party! 👋');
            };
        }, []);  // empty dependency array = runs once

        // Updating (when something changes, like cakeEaten)
        useEffect(() => {
            if (cakeEaten) {
            console.log('Friends are eating cake! 🎂');
            }
        }, [cakeEaten]);  // runs when cakeEaten changes

        return (
            <div>
            <h1>Birthday Party 🎈</h1>
            <button onClick={() => setCakeEaten(true)}>Serve Cake</button>
            </div>
        );
        }
// * But key points 
        // ! ✅ Yes — inside the useEffect cleanup function, you can clean up things like old data, credentials, timers, event listeners, etc. But this is not always true "unmounting" — it depends when and why the cleanup runs.

        //* Real unmounting 
                useEffect(() => {
                    console.log('Component mounted');
                
                    return () => {
                    console.log('Component is unmounting');  //! happens when component is removed
                    };
                }, []);
        //* Cleanup before re-running 
        useEffect(() => {
            console.log('Subscribed to notifications');
          
            return () => {
              console.log('Unsubscribed from previous notifications');  //! happens before re-running
            };
          }, [userId]);
        //& In other word 
            //* "Cleaning up credentials after user logout" ✅ → If the component is unmounted (e.g., the user logs out and the page changes), YES, that’s true unmounting.

            //* "Cleaning up old credentials when user switches account" ✅ → If the component stays, but userId changes, it's just effect cleanup, not unmounting.

            // !Unmount = disappear.
            // !Cleanup = either before update OR before unmount.
        // & At which stage error handling happens 

        //* ✅  At Mounting Phase (Component is loading)
                    //^ During initial render (e.g., accessing undefined props)

                    //^ During useEffect (e.g., failed API request)

                    // ^ How to handle 
                            useEffect(() => {
                                try {
                                // e.g. fetch data
                                } catch (err) {
                                console.error('Mounting error:', err);
                                }
                            }, []);
        // * ✅ At Updating phase
                    //^ In event handlers

                    //^ When re-rendering due to changed state/props

                    //^ How to handle 
                                function handleClick() {
                                    try {
                                    // risky logic
                                    } catch (err) {
                                    console.error('Update error:', err);
                                    }
                                }
        //* ✅ At unmounting phase 
                    // ^ Inside the cleanup function if it tries to access something that’s already gone

                    // ^ How to handle 
                    useEffect(() => {
                        return () => {
                          try {
                            // e.g., remove listener, cancel API
                          } catch (err) {
                            console.error('Unmounting cleanup error:', err);
                          }
                        };
                      }, []);
                      