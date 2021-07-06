import React, {useRef} from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {

    const inputElement = useRef("");

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard 
                contact={contact} 
                key={contact.id} 
            >
            </ContactCard>
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputElement.current.value);
    }

    return (
        <div className="cont mainContactList">
            <div className="storyList"> 
                <h2>Contact List
                    {/* <Link to="/add">
                        <button className="ui button blue right">Add Contact</button>
                    </Link> */}
                </h2>
                <span className="ui center search">
                    <span className="ui icon input">
                        <input 
                            ref = {inputElement}
                            type="text" 
                            placeholder="Search Contact..." 
                            className="prompt" 
                            value={props.term} 
                            onChange={getSearchTerm}
                        />
                        <i className="search icon"></i>
                    </span>
                </span>
            </div>
            
            <div className="ui celled list contacts">
                {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}
            </div>
        </div>
    );
}

export default ContactList