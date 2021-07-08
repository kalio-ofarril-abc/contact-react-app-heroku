import React, {useRef} from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";
import {BsFillPlusCircleFill} from "react-icons/bs";
 
const ContactList = (props) => {

    const inputElement = useRef("");

    const clickHandler = (id) => {
        props.displayStory(id);
    }

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard 
                clickHandler = {clickHandler}
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
                <h2>Contact List</h2>
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

            <div>
                <Link to="/add">
                    <BsFillPlusCircleFill size='45px'/>
                </Link>
            </div>
        </div>
    );
}

export default ContactList