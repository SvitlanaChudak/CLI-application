const fs = require('fs').promises;
const path = require('path');
const { 
  v4: uuidv4,
} = require('uuid');

const contactsPath = path.resolve(__dirname, './db/contacts.json');

const listContacts = async () => {
     try {
    const data = await fs.readFile(contactsPath, "utf8");
         return JSON.parse(data);
         } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
    try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
        return contact;
        } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex((item) => item.id === contactId);
        const deletedContact = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log('Contact successfully deleted')
        return deletedContact;
        } catch (error) {
    console.log(error);
  }
}

const addContact = async (name, email, phone) => {
      try {
          const contacts = await listContacts();
          const newContact = { id: uuidv4(), name, email, phone };
          contacts.push(newContact);
          await fs.writeFile(contactsPath, JSON.stringify(contacts));
          console.log('Contact successfully added')
          return newContact;
          } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };