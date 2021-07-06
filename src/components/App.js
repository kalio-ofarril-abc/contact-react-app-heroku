import React, {useState, useEffect} from "react"; 
import {BrowserRouter as Router, Switch, Route}  from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import api from "../api/contact";

import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import ContactDelete from "./ContactDelete";
import EditContact from "./EditContact";
import StoryViewer from "./StoryViewer";

import "./css/App.css";
import "./css/ContactList.css";
import "./css/StoryViewer.css";

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrieve Contacts
  const retrieveContacts = async () =>{
    const response = await api.get("/contacts")
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    //setContacts([...contacts, {id: uuidv4(), ...contact}]);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) =>{
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };

  const removeContacthandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else{
      setSearchResults(contacts);
    }
  };

  useEffect( () =>{
    // const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrievedContacts){setContacts(retrievedContacts);}
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts){
        setContacts(allContacts);
      }
    };

    getAllContacts();
  }, []);

  useEffect( () => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui mainBackground">
      <Router>

        <Header/>

        <Switch>

          <Route 
            path="/add" 
            render = { (props) => (
              <AddContact {...props} addContactHandler={addContactHandler}/>
            )}
          />

          <Route
            path="/edit"
            render = { (props) =>(
              <EditContact {...props} updateContactHandler={updateContactHandler}/>
            )}
          />

          <Route 
            path="/" 
            exact 
            render = { (props) => (
              <div className="main">
              <ContactList 
                {...props} 
                contacts={searchTerm.length < 1 ? contacts : searchResults} 
                term={searchTerm}
                searchKeyword={searchHandler}
              />

              <StoryViewer/>
              </div>
            )}
          />

          <Route
            path="/contact/:id"
            component={ContactDetails}
          />

          <Route
            path="/delete/:id"
            render = { (props) => (
              <ContactDelete
                {...props}
                getContactId={removeContacthandler}/>
            )}
          />

        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
