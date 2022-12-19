import React from 'react'
import './Section2.css'
import cards from './Section2-card'

const Section2 = () => {
    return (
        <>
            <div className="section-2">
                <div className="title">
                    <p>One Platform<br />Many <span className='solution'>Solutions</span></p>
                </div>
                <div className="card-container">

                    {
                        cards.map((elem) => {
                            return (

                                <div className="single-card" key={elem.id}>
                                    <div className="section2-logo">
                                        {elem.svg}
                                    </div>
                                    <div className="section2-des">
                                        <p className='job-profile'>{elem.jobProfile}</p>
                                        <p className='vacancy'>{elem.vacancy}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Section2