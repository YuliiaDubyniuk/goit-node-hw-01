const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

//Reads and returns all data from file
async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  } catch (err) {
    console.log("Ooops! Something went wrong!", err.message);
  }
}

listContacts();

//Searches and returns contact by ID or returns null if such contact isn't on the file.
async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const searchedContact = allContacts.find(
      (contact) => contact.id === contactId
    );
    return searchedContact || null;
  } catch (err) {
    console.log("Ooops! Something went wrong!", err.message);
  }
}

//Removes contact from list by its' ID. Returns contact object or null if it doesn't find such contact.
async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [deletedContact] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return deletedContact;
  } catch (err) {
    console.log("Ooops! Something went wrong!", err.message);
  }
}

//Returns new contact object.
async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
      };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
  } catch (err) {
    console.log("Ooops! Something went wrong!", err.message);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}