import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub,faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-violet-950 border border-t-2 border-t-black bottom-0">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="sm:-m-6 flex flex-wrap sm:justify-between justify-center items-center">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm font-thin text-pink-200">
                                    &copy; Copyright 2024. All Rights Reserved by TARUN NAGPAL.
                                </p>
                            </div>
                            <div>
                                <Link to='https://github.com/Tarunnagpal7'  target='_blank' className='m-2'>
                                <FontAwesomeIcon icon={faGithub} className='' />
                                </Link>
                                <Link to='https://www.linkedin.com/in/tarun-nagpal-b0b792254/'  target='_blank' className='m-2'>
                                <FontAwesomeIcon icon={faLinkedin} className='' />
                                </Link>
                            </div>
                        </div>
                    </div>

        </section>
  )
}

export default Footer