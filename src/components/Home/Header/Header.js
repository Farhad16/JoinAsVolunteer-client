import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

const Header = () => {
    return (
        <div className="bg">
            <section className="headerMain pb-5">
                <div className="max-width pb-5">
                    <div className="header-content py-5">
                        <div className="text-1">Hello, want to work</div>
                        <div className="text-2">For society</div>
                        <div className="text-3">
                            <span>
                                <Typed
                                    strings={[
                                        'Join as a Volunteer',
                                        'Help poor people',
                                    ]}
                                    typeSpeed={50}
                                    backSpeed={60}
                                    loop >
                                </Typed>
                            </span>
                        </div>
                        <a href="#programs">Register Now </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;