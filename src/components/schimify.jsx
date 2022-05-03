import React from 'react'
import './schimify.css'

export default function schimify() {
    return (
        <div>
            <div className="allwrap">
                <h1 className="schimify">Schimify</h1>
                <div className="wrapper">
                    <form className="left" action="/.netlify/functions/parser"> <input type="url" className='URL' name="url" id="url" placeholder='Paste the URL' />
                        <input type="text" name="slug" id="slug" className='slug' placeholder='Paste the slug' />
                        <input type="text" name="keyword" id="keyword" className='keyword' placeholder='Paste the keyword' />
                        <button id="submit" className='sumbit'> Create the Schema </button>
                    </form>
                    <div className="right">
                        <div id="output" className="output"> 
                            Here is your schema codes
                        

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
